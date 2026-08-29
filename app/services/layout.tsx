import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description: "Websites, online stores, booking systems, business software, mobile apps, web apps, and custom digital platforms from Kashung Enterprise.",
  path: "/services",
});

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
