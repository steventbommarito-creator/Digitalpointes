'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServiceCardProps {
  number: string
  icon: string
  name: string
  description: string
  href: string
  index: number
}

export default function ServiceCard({ number, icon, name, description, href, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const fromLeft = index % 2 === 0

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { x: fromLeft ? -60 : 60, opacity: 0, rotateZ: fromLeft ? -1.5 : 1.5 },
      {
        x: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === card) st.kill()
      })
    }
  }, [fromLeft])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <Link href={href} className="group block h-full">
        <div
          className="h-full p-7 rounded-lg border transition-all duration-300 group-hover:shadow-lg"
          style={{
            background: '#ECEAE4',
            borderColor: 'rgba(26,25,23,0.08)',
            borderLeftWidth: 3,
            borderLeftColor: '#FF9E1B',
          }}
        >
          <div className="flex items-start justify-between mb-5">
            <span
              className="text-xs font-semibold tracking-[0.2em]"
              style={{ color: '#FF9E1B' }}
            >
              {number}
            </span>
            <span className="text-2xl select-none">{icon}</span>
          </div>

          <h3
            className="text-xl font-bold mb-3 leading-tight"
            style={{ color: '#1A1917' }}
          >
            {name}
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B6860' }}>
            {description}
          </p>

          <div
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
            style={{ color: '#FF9E1B' }}
          >
            <span>Explore</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
