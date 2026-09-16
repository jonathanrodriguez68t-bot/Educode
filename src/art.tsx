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

export function SnakeArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 160 120" aria-hidden="true">
      <path
        d="M28 78c8-28 28-46 52-46 18 0 28 12 28 24 0 14-12 22-24 22-10 0-16-6-16-14 0-8 8-12 16-10 18 4 38-4 48-18"
        fill="none"
        stroke="#3ecf6e"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M28 78c8-28 28-46 52-46 18 0 28 12 28 24 0 14-12 22-24 22-10 0-16-6-16-14 0-8 8-12 16-10 18 4 38-4 48-18"
        fill="none"
        stroke="#7dff9a"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="128" cy="34" r="16" fill="#3ecf6e" />
      <circle cx="128" cy="34" r="10" fill="#7dff9a" />
      <circle cx="123" cy="31" r="2.4" fill="#14203f" />
      <circle cx="133" cy="31" r="2.4" fill="#14203f" />
      <path d="M122 40c4 4 10 4 14 0" stroke="#14203f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="142" cy="38" r="3" fill="#ff6b7d" />
    </svg>
  )
}

export function RocketArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 90 120" aria-hidden="true">
      <path d="M45 8c18 22 20 48 20 70H25c0-22 2-48 20-70z" fill="#ff6b7d" />
      <rect x="29" y="58" width="32" height="28" rx="10" fill="#fff" />
      <circle cx="45" cy="72" r="9" fill="#6ea8ff" />
      <path d="M25 78l-14 22 20-8z" fill="#ffc43d" />
      <path d="M65 78l14 22-20-8z" fill="#ffc43d" />
      <path d="M36 96c3 14 15 14 18 0" fill="#ff8a4c" />
    </svg>
  )
}

export function PuzzleArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <path
        d="M10 18h22c0-8 12-8 12 0v10h18c8 0 8 12 0 12v18H52c0 8-12 8-12 0H10V40c8 0 8-12 0-12z"
        fill="#7cffd0"
      />
      <path
        d="M10 18h22c0-8 12-8 12 0v10h18c8 0 8 12 0 12v18H52c0 8-12 8-12 0H10V40c8 0 8-12 0-12z"
        fill="none"
        stroke="#5ad0b0"
        strokeWidth="3"
      />
    </svg>
  )
}

export function PadArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 110 72" aria-hidden="true">
      <path d="M18 20h74c12 0 16 22 8 32-6 8-18 10-28 10H38c-10 0-22-2-28-10-8-10-4-32 8-32z" fill="#6a3bdb" />
      <circle cx="34" cy="38" r="7" fill="#3ddc97" />
      <circle cx="76" cy="32" r="5" fill="#ff6b7d" />
      <circle cx="86" cy="40" r="5" fill="#ffc43d" />
      <rect x="20" y="52" width="18" height="10" rx="5" fill="#4b2aa8" />
      <rect x="72" y="52" width="18" height="10" rx="5" fill="#4b2aa8" />
    </svg>
  )
}

export function TabletArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 72 88" aria-hidden="true">
      <rect x="8" y="4" width="56" height="80" rx="12" fill="#7b6cff" />
      <rect x="14" y="12" width="44" height="56" rx="6" fill="#d8f3ff" />
      <circle cx="24" cy="28" r="6" fill="#ff6b7d" />
      <circle cx="38" cy="28" r="6" fill="#ffc43d" />
      <circle cx="52" cy="28" r="6" fill="#3ddc97" />
      <circle cx="24" cy="44" r="6" fill="#6ea8ff" />
      <circle cx="38" cy="44" r="6" fill="#b388ff" />
      <circle cx="52" cy="44" r="6" fill="#ff8a4c" />
    </svg>
  )
}

export function PlayArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 72 72" aria-hidden="true">
      <rect x="6" y="8" width="60" height="56" rx="16" fill="#4cc9f0" />
      <path d="M30 22l22 14-22 14z" fill="#fff" />
    </svg>
  )
}

export function LaptopArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 96 70" aria-hidden="true">
      <rect x="16" y="8" width="64" height="42" rx="6" fill="#6ea8ff" />
      <rect x="22" y="14" width="52" height="30" rx="4" fill="#e9fff6" />
      <path d="M8 50h80l-8 12H16z" fill="#d0d8ff" />
    </svg>
  )
}

export function GearArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="12" fill="#ffe08a" />
      <circle cx="36" cy="36" r="6" fill="#fff" />
      <g fill="#c7a227">
        <rect x="32" y="6" width="8" height="14" rx="3" />
        <rect x="32" y="52" width="8" height="14" rx="3" />
        <rect x="6" y="32" width="14" height="8" rx="3" />
        <rect x="52" y="32" width="14" height="8" rx="3" />
      </g>
    </svg>
  )
}

export function BrushArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 40 90" aria-hidden="true">
      <rect x="16" y="8" width="8" height="46" rx="4" fill="#ffb703" />
      <path d="M10 54h20c2 16-6 28-10 32-4-4-12-16-10-32z" fill="#3ddc97" />
    </svg>
  )
}
