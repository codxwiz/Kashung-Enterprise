import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function InstagramIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.7" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.607M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.591-6.592 6.591m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.066-.315-.099-.445.099-.133.197-.514.646-.63.775-.116.133-.232.149-.43.05-.197-.1-.836-.308-1.59-.984-.59-.525-.983-1.175-1.1-1.373-.115-.198-.013-.305.087-.404.088-.088.197-.232.296-.348.1-.116.133-.198.198-.33.066-.133.033-.249-.017-.348-.05-.099-.445-1.075-.61-1.47-.16-.389-.323-.335-.445-.34-.116-.006-.249-.006-.381-.006a.73.73 0 0 0-.529.248c-.182.198-.691.677-.691 1.654s.708 1.916.81 2.049c.098.132 1.394 2.129 3.383 2.986.473.205.842.327 1.13.419.475.152.907.129 1.248.078.38-.058 1.171-.48 1.337-.943.164-.462.164-.858.116-.943-.05-.084-.182-.132-.38-.231" />
    </svg>
  );
}

export function KashungMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 38" aria-hidden="true">
      <path d="M1.5 8.8 11.7 4v26.2L1.5 35V8.8Z" fill="currentColor" />
      <path d="m11.9 4 10.2-3v26.2l-10.2 3V4Z" fill="var(--acid)" />
      <path d="m22.3 5.6 10.2-3v26.2l-10.2 3V5.6Z" fill="var(--jade)" />
    </svg>
  );
}
