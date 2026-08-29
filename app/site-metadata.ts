import type { Metadata } from "next";

const socialImage = {
  url: "/og.png",
  width: 1731,
  height: 909,
  alt: "Kashung Enterprise — Ideas deserve to become real",
};

export function createPageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const socialTitle = `${title} | Kashung Enterprise`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: "Kashung Enterprise",
      locale: "en_IN",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.png"],
    },
  };
}
