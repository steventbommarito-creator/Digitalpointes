'use client'

import Link from 'next/link'

interface Props {
  number: string
  name: string
  description: string
  href: string
  glyph: React.ReactNode
}

export default function ServiceCard({ number, name, description, href, glyph }: Props) {
  return (
    <Link href={href} className="group block h-full">
      <article className="card-surface h-full p-7 flex flex-col relative overflow-hidden">
        {/* Data-bit decorative grid (background) */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.11]"
          style={{
            backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        <div className="relative flex items-start justify-between mb-8">
          <span className="num-mono text-[13px] tracking-widest" style={{ color: 'var(--muted)' }}>
            / {number}
          </span>
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-[12deg]"
            style={{ background: 'var(--surface)', color: 'var(--ink)' }}
          >
            {glyph}
          </div>
        </div>

        <h3 className="relative text-[22px] md:text-[24px] font-bold leading-tight mb-3 tracking-tight" style={{ color: 'var(--ink)' }}>
          {name}
        </h3>
        <p className="relative text-[14.5px] leading-relaxed mb-8 flex-1" style={{ color: 'var(--muted)' }}>
          {description}
        </p>

        <div className="relative flex items-center justify-between pt-5 border-t" style={{ borderColor: 'var(--line)' }}>
          <span className="text-[13px] font-semibold" style={{ color: 'var(--ink)' }}>
            Explore capability
          </span>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-1"
            style={{ background: 'var(--ink)', color: 'var(--white-warm)' }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Orange accent line (reveals on hover) */}
        <span
          className="absolute left-0 top-0 h-[2px] bg-[var(--orange)] transition-all duration-500"
          style={{ width: 0 }}
          data-accent
        />
        <style jsx>{`
          article:hover > [data-accent] { width: 100%; }
        `}</style>
      </article>
    </Link>
  )
}
