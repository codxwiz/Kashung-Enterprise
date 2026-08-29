import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Start a website, software, or app project with Kashung Enterprise in Northeast India.",
  path: "/contact",
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
