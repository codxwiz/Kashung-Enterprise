/** Cloudflare Worker entry point for Kashung Enterprise. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
  META_DATASET_ID?: string;
  META_ACCESS_TOKEN?: string;
  META_GRAPH_API_VERSION?: string;
  META_TEST_EVENT_CODE?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/meta/events" && request.method === "POST") {
      if (!env.META_DATASET_ID || !env.META_ACCESS_TOKEN || !env.META_GRAPH_API_VERSION) {
        return Response.json({ error: "Meta Conversions API is not configured." }, { status: 503 });
      }

      const input = await request.json().catch(() => null) as Record<string, unknown> | null;
      if (!input || input.event_name !== "PageView" || typeof input.event_id !== "string" || typeof input.event_source_url !== "string") {
        return Response.json({ error: "Invalid event payload." }, { status: 400 });
      }

      let sourceUrl: URL;
      try {
        sourceUrl = new URL(input.event_source_url);
      } catch {
        return Response.json({ error: "Invalid event source." }, { status: 400 });
      }
      if (sourceUrl.origin !== url.origin) {
        return Response.json({ error: "Invalid event source." }, { status: 400 });
      }

      const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      const clientIp = request.headers.get("cf-connecting-ip") ?? forwardedFor;
      const userData: Record<string, string> = {};
      const userAgent = request.headers.get("user-agent");
      if (clientIp) userData.client_ip_address = clientIp;
      if (userAgent) userData.client_user_agent = userAgent;
      if (typeof input.fbp === "string" && input.fbp) userData.fbp = input.fbp;
      if (typeof input.fbc === "string" && input.fbc) userData.fbc = input.fbc;

      const payload: Record<string, unknown> = {
        data: [{
          event_name: "PageView",
          event_time: Math.floor(Date.now() / 1000),
          event_id: input.event_id,
          event_source_url: sourceUrl.href,
          action_source: "website",
          user_data: userData,
        }],
      };
      if (env.META_TEST_EVENT_CODE) payload.test_event_code = env.META_TEST_EVENT_CODE;

      const metaResponse = await fetch(
        `https://graph.facebook.com/${env.META_GRAPH_API_VERSION}/${env.META_DATASET_ID}/events?access_token=${encodeURIComponent(env.META_ACCESS_TOKEN)}`,
        { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) },
      );

      if (!metaResponse.ok) {
        console.error("Meta Conversions API request failed", metaResponse.status, await metaResponse.text());
        return Response.json({ error: "Event delivery failed." }, { status: 502 });
      }

      return Response.json({ received: true });
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
