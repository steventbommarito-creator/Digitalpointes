import Link from 'next/link'
import Nav from './Nav'
import Footer from './Footer'
import { services, type Service } from '@/lib/services'

interface Props {
  service: Service
}

export default function ServicePageTemplate({ service }: Props) {
  const idx    = services.findIndex(s => s.slug === service.slug)
  const number = String(idx + 1).padStart(2, '0')
  const related = services.filter(s => s.slug !== service.slug).slice(0, 3)

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section className="relative section-pad pt-[140px] container-x max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-[13px] font-medium mb-8 link-underline"
              style={{ color: 'var(--muted)' }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M6 12L1 7l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              All capabilities
            </Link>

            <p className="eyebrow mb-6">Capability / {number}</p>
            <h1 className="display text-[48px] md:text-[72px] lg:text-[88px] mb-8" style={{ color: 'var(--ink)' }}>
              {service.name}
            </h1>
            <p className="text-[20px] md:text-[24px] font-medium leading-snug max-w-2xl" style={{ color: 'var(--ink)' }}>
              {service.heroStatement}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div
              className="p-6 rounded-2xl border"
              style={{ background: 'var(--white-warm)', borderColor: 'var(--line)' }}
            >
              <p className="eyebrow mb-3">Core message</p>
              <p className="text-[18px] font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
                {service.coreMessage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded copy */}
      <section className="section-pad-sm container-x max-w-[1100px] mx-auto">
        <p className="text-[18px] md:text-[20px] leading-[1.6]" style={{ color: 'var(--ink-soft)' }}>
          {service.expandedCopy}
        </p>
      </section>

      {/* Benefits */}
      <section className="section-pad-sm container-x max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">What it delivers</p>
            <h2 className="headline text-[32px] md:text-[40px]" style={{ color: 'var(--ink)' }}>
              Outcomes, not activity.
            </h2>
          </div>
          <ul className="lg:col-span-8 space-y-4">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 pb-4 border-b" style={{ borderColor: 'var(--line)' }}>
                <span className="data-bit mt-2.5 flex-shrink-0" />
                <span className="text-[17px] md:text-[18px] font-medium" style={{ color: 'var(--ink)' }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Differentiator */}
      <section className="section-pad-sm container-x max-w-[1400px] mx-auto">
        <div
          className="p-8 md:p-14 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          style={{ background: 'var(--ink)', color: 'var(--white-warm)' }}
        >
          <p className="eyebrow md:col-span-3" style={{ color: 'var(--orange)' }}>Why it&apos;s different</p>
          <p className="md:col-span-9 text-[22px] md:text-[30px] font-semibold leading-[1.25] tracking-tight">
            {service.differentiator}
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="section-pad container-x max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">Continue exploring</p>
            <h2 className="headline text-[28px] md:text-[36px]" style={{ color: 'var(--ink)' }}>
              Related capabilities
            </h2>
          </div>
          <Link href="/#services" className="text-[14px] font-semibold link-underline">
            See all capabilities
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="card-surface p-6 group">
              <p className="num-mono text-[12px] tracking-widest mb-5" style={{ color: 'var(--muted)' }}>
                / {String(services.findIndex(s => s.slug === r.slug) + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[18px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink)' }}>
                {r.shortName}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {r.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-sm container-x max-w-[1400px] mx-auto">
        <div
          className="p-10 md:p-14 rounded-2xl text-center"
          style={{ background: 'var(--orange)' }}
        >
          <h2 className="display text-[32px] md:text-[48px] mb-3" style={{ color: 'var(--ink)' }}>
            Ready to put this to work?
          </h2>
          <p className="text-[16px] md:text-[18px] mb-7 max-w-xl mx-auto" style={{ color: 'rgba(15,14,12,0.72)' }}>
            A working session to evaluate what&apos;s working, what&apos;s not, and where the biggest opportunities are.
          </p>
          <Link href="/#contact" className="btn-primary">
            Schedule a Strategy Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
