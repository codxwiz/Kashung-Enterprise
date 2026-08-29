import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="error-page">
      <p className="eyebrow"><i /> 404 · Page not found</p>
      <h1>This idea hasn’t<br /><em>become real yet.</em></h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      {/* Native navigation avoids a vinext production client-router failure. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="button button--primary" href="/">Return home <ArrowUpRight aria-hidden="true" /></a>
    </main>
  );
}
