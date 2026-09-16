type ArtProps = {
  className?: string
}

export function PixelArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 160 180" aria-hidden="true">
      <ellipse cx="80" cy="168" rx="38" ry="8" fill="rgba(20,32,63,0.18)" />
      <rect x="38" y="46" width="84" height="92" rx="28" fill="#7cffd0" stroke="#14203f" strokeWidth="4" />
      <rect x="50" y="62" width="60" height="42" rx="14" fill="#14203f" />
      <circle cx="68" cy="82" r="6" fill="#7cffd0">
        <animate attributeName="r" values="6;6;1;6" dur="3.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="92" cy="82" r="6" fill="#7cffd0">
        <animate attributeName="r" values="6;6;1;6" dur="3.6s" begin="0.12s" repeatCount="indefinite" />
      </circle>
      <path d="M70 94c6 6 14 6 20 0" stroke="#7cffd0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="32" r="10" fill="#ffc43d" stroke="#14203f" strokeWidth="4" />
      <rect x="77" y="14" width="6" height="12" rx="3" fill="#14203f" />
      <circle cx="80" cy="12" r="5" fill="#ff6b7d" stroke="#14203f" strokeWidth="3" />
      <rect x="24" y="78" width="18" height="12" rx="6" fill="#6ea8ff" stroke="#14203f" strokeWidth="3" />
      <rect x="118" y="78" width="18" height="12" rx="6" fill="#6ea8ff" stroke="#14203f" strokeWidth="3" />
      <rect x="56" y="136" width="16" height="22" rx="8" fill="#4cc9f0" stroke="#14203f" strokeWidth="3" />
      <rect x="88" y="136" width="16" height="22" rx="8" fill="#4cc9f0" stroke="#14203f" strokeWidth="3" />
    </svg>
  )
}

export function UfoArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 140 90" aria-hidden="true">
      <ellipse cx="70" cy="70" rx="22" ry="6" fill="rgba(124,255,208,0.35)" />
      <path d="M40 42c8-22 52-22 60 0" fill="#b388ff" stroke="#14203f" strokeWidth="4" />
      <ellipse cx="70" cy="48" rx="52" ry="16" fill="#e9fff6" stroke="#14203f" strokeWidth="4" />
      <circle cx="48" cy="48" r="4" fill="#ff6b7d" />
      <circle cx="70" cy="50" r="4" fill="#ffc43d" />
      <circle cx="92" cy="48" r="4" fill="#3ddc97" />
      <path d="M58 26l4-10M82 26l-4-10" stroke="#ffc43d" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function CometArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 160 70" aria-hidden="true">
      <path d="M12 40c28-8 70-18 110-22" stroke="#ff8a4c" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <path d="M20 48c30-6 72-14 104-14" stroke="#ffc43d" strokeWidth="6" strokeLinecap="round" />
      <circle cx="132" cy="28" r="14" fill="#fff7ea" stroke="#14203f" strokeWidth="4" />
    </svg>
  )
}

export function CrystalArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6l18 22-18 30L14 28z" fill="#7cffd0" stroke="#14203f" strokeWidth="4" />
      <path d="M32 6l8 22H14z" fill="#e9fff6" stroke="#14203f" strokeWidth="3" />
    </svg>
  )
}

export function CloudArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 180 90" aria-hidden="true">
      <ellipse cx="70" cy="52" rx="40" ry="24" fill="#fff" stroke="#14203f" strokeWidth="4" />
      <ellipse cx="108" cy="48" rx="34" ry="22" fill="#fff" stroke="#14203f" strokeWidth="4" />
      <ellipse cx="90" cy="38" rx="28" ry="18" fill="#fff" />
    </svg>
  )
}

export function PortalArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="16" ry="20" fill="#b388ff" stroke="#14203f" strokeWidth="3" />
      <ellipse cx="24" cy="24" rx="8" ry="12" fill="#14203f" />
    </svg>
  )
}
