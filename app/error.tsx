"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="error-page">
      <p className="eyebrow"><i /> Something went wrong</p>
      <h1>The signal was<br /><em>interrupted.</em></h1>
      <p>Please try again. If the problem continues, email kashthot@gmail.com.</p>
      <button className="button button--primary" type="button" onClick={reset}>Try again <span>↗</span></button>
    </main>
  );
}
