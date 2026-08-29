import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Selected Work",
  description: "Explore websites, software platforms, and digital products designed and built by Kashung Enterprise.",
  path: "/portfolio",
});

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
