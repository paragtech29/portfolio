"use client"

export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
