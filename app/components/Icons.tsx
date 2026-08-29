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

export function KashungMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 38" aria-hidden="true">
      <path d="M1.5 8.8 11.7 4v26.2L1.5 35V8.8Z" fill="currentColor" />
      <path d="m11.9 4 10.2-3v26.2l-10.2 3V4Z" fill="var(--acid)" />
      <path d="m22.3 5.6 10.2-3v26.2l-10.2 3V5.6Z" fill="var(--jade)" />
    </svg>
  );
}
