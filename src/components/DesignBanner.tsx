'use client'

import Link from 'next/link'

const OPTIONS = [
  { name: 'Agency', href: '/' },
  { name: 'Atom', href: '/atom' },
]

export default function DesignBanner({ current }: { current: string }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-4 py-2 px-4 text-[13px] font-semibold tracking-wide"
      style={{ background: 'var(--ink, #0F0E0C)', color: '#fff' }}
    >
      <span className="uppercase tracking-[0.15em] text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Design Option:
      </span>
      {OPTIONS.map((opt) => {
        const active = opt.name === current
        return (
          <Link
            key={opt.name}
            href={opt.href}
            className="px-3 py-1 rounded-full transition-all text-[12px] font-bold uppercase tracking-wider"
            style={{
              background: active ? 'var(--orange, #FF9E1B)' : 'rgba(255,255,255,0.08)',
              color: active ? '#0F0E0C' : 'rgba(255,255,255,0.6)',
            }}
          >
            {opt.name}
          </Link>
        )
      })}
    </div>
  )
}
