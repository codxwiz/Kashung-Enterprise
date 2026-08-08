import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work — Kashung Enterprise",
  description: "Explore websites, software platforms, and digital products designed and built by Kashung Enterprise.",
};

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
