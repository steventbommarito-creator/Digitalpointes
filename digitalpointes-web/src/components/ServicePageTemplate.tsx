import Link from 'next/link'
import Nav from './Nav'
import Footer from './Footer'
import type { Service } from '@/lib/services'

interface Props {
  service: Service
}

export default function ServicePageTemplate({ service }: Props) {
  return (
    <div className="min-h-screen" style={{ background: '#F5F3EF' }}>
      <Nav />

      {/* Hero */}
      <section
        className="relative flex items-end pt-32 pb-16 px-6 md:px-10 overflow-hidden"
        style={{ background: '#0F0E0C', minHeight: '52vh' }}
      >
        {/* Background texture - subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #FF9E1B 0, #FF9E1B 1px, transparent 1px, transparent 60px),
                              repeating-linear-gradient(90deg, #FF9E1B 0, #FF9E1B 1px, transparent 1px, transparent 60px)`,
          }}
        />

        <div className="relative max-w-4xl">
          <p
            className="text-xs tracking-[0.25em] font-semibold uppercase mb-4"
            style={{ color: '#FF9E1B' }}
          >
            {service.shortName}
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#F5F3EF' }}
          >
            {service.heroStatement}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl" style={{ color: 'rgba(232,228,220,0.70)' }}>
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Core message */}
      <section className="px-6 md:px-10 py-20 border-b" style={{ borderColor: 'rgba(26,25,23,0.08)' }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-2xl md:text-3xl font-bold leading-snug mb-8"
            style={{ color: '#1A1917' }}
          >
            {service.coreMessage}
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: '#6B6860' }}>
            {service.expandedCopy}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p
              className="text-xs tracking-[0.2em] font-semibold uppercase mb-8"
              style={{ color: '#FF9E1B' }}
            >
              What you get
            </p>
            <ul className="space-y-5">
              {service.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#FF9E1B' }}
                  />
                  <span className="text-base leading-relaxed" style={{ color: '#1A1917' }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-lg p-8 flex flex-col justify-between"
            style={{ background: '#0F0E0C' }}
          >
            <div>
              <p
                className="text-xs tracking-[0.2em] font-semibold uppercase mb-5"
                style={{ color: '#FF9E1B' }}
              >
                Why it's different
              </p>
              <p className="text-xl font-semibold leading-snug" style={{ color: '#E8E4DC' }}>
                {service.differentiator}
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/#contact"
                className="inline-block px-6 py-3.5 rounded font-semibold text-sm transition-colors"
                style={{ background: '#FF9E1B', color: '#0F0E0C' }}
              >
                Schedule a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section
        className="px-6 md:px-10 py-12 border-t"
        style={{ borderColor: 'rgba(26,25,23,0.08)' }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-orange-500"
            style={{ color: '#6B6860' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to all services
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-semibold transition-colors"
            style={{ color: '#FF9E1B' }}
          >
            Ready to talk? Schedule a call →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
