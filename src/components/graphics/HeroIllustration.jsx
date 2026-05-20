import React from 'react'

export default function HeroIllustration({
  className = '',
  gradientFrom = '#4A8FA8',
  gradientTo = '#042a3f',
  gradientFromOpacity = 0.18,
  gradientToOpacity = 0.06,
  circleColor = '#7AAFC0',
  circleOpacity = 0.12,
  smallCircleColor = '#0b4860',
  smallCircleOpacity = 0.06,
  onLoad,
  ...rest
}) {
  // IDs need to be unique if multiple instances; keep fixed since hero appears once.
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      onLoad={onLoad}
      {...rest}
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor={gradientFrom} stopOpacity={gradientFromOpacity} />
          <stop offset="100%" stopColor={gradientTo} stopOpacity={gradientToOpacity} />
        </linearGradient>
      </defs>
      <g opacity="0.95">
        <path d="M0 420 C150 300, 300 300, 450 380 C600 460, 700 400, 800 360 L800 600 L0 600 Z" fill="url(#g1)" />
        <circle cx="640" cy="140" r="80" fill={circleColor} opacity={circleOpacity} />
        <circle cx="720" cy="200" r="40" fill={smallCircleColor} opacity={smallCircleOpacity} />
      </g>
    </svg>
  )
}
