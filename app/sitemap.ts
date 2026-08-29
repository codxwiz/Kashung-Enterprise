import type { MetadataRoute } from "next";

const siteUrl = "https://kashung-enterprise.newdiscoveryyt.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-24T00:00:00+05:30");
  return [
    { url: siteUrl, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/portfolio`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteUrl}/terms`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/refund-policy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
