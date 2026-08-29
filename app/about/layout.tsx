import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "Why Kashung Enterprise helps businesses, founders, and skilled professionals across Northeast India take their ideas online.",
  path: "/about",
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
