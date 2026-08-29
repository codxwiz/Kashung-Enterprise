import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kashung-enterprise.newdiscoveryyt.chatgpt.site/sitemap.xml",
  };
}
