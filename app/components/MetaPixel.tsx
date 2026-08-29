"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "kashung-marketing-consent";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };
    _fbq?: Window["fbq"];
  }
}

function cookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

function eventId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function MetaPixel({ pixelId }: { pixelId?: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") queueMicrotask(() => setConsent(saved));
  }, []);

  useEffect(() => {
    if (!pixelId || consent !== "accepted" || !ready || !window.fbq) return;

    const id = eventId();
    window.fbq("track", "PageView", {}, { eventID: id });

    void fetch("/api/meta/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_name: "PageView",
        event_id: id,
        event_source_url: window.location.href,
        fbp: cookie("_fbp"),
        fbc: cookie("_fbc"),
      }),
    });
  }, [consent, pathname, pixelId, ready]);

  function choose(value: "accepted" | "declined") {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  if (!pixelId) return null;

  return (
    <>
      {consent === "accepted" && (
        <Script id="meta-pixel" strategy="afterInteractive" onReady={() => setReady(true)}>
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});`}
        </Script>
      )}

      {consent === null && (
        <aside className="consent-banner" aria-label="Cookie preferences">
          <p>We use optional Meta marketing cookies to understand visits and improve our advertising. You can accept or decline them.</p>
          <div className="consent-actions">
            <button type="button" onClick={() => choose("declined")}>Decline</button>
            <button type="button" className="consent-accept" onClick={() => choose("accepted")}>Accept</button>
          </div>
        </aside>
      )}
    </>
  );
}
