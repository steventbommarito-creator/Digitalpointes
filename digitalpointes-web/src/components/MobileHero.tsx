'use client'

import Image from 'next/image'

const BITS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 3 + Math.floor(Math.random() * 4),
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 4,
  isOrange: Math.random() < 0.15,
}))

export default function MobileHero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden"
      style={{ background: '#0F0E0C' }}
    >
      {/* CSS data bits */}
      {BITS.map(bit => (
        <div
          key={bit.id}
          className="absolute rounded-sm"
          style={{
            width: bit.size,
            height: bit.size,
            left: `${bit.x}%`,
            top: `${bit.y}%`,
            background: bit.isOrange ? '#FF9E1B' : 'rgba(232,228,220,0.55)',
            animation: `floatBit ${bit.duration}s ${bit.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Pulsing logo */}
      <div className="relative z-10 mb-8">
        <Image
          src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735067/DP_Pulsing_omaq2i.gif"
          alt="Digital Pointes"
          width={120}
          height={120}
          unoptimized
          className="opacity-90"
        />
      </div>

      {/* Hero text on mobile */}
      <div className="relative z-10 text-center px-8">
        <h1
          className="text-3xl font-bold leading-tight mb-3"
          style={{ color: '#F5F3EF' }}
        >
          You can't close a click.
        </h1>
        <p
          className="text-base tracking-wide"
          style={{ color: 'rgba(232,228,220,0.65)' }}
        >
          Meaningful, measurable marketing.
        </p>
      </div>
    </div>
  )
}
