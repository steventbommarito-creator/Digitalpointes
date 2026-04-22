'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import ServiceCard from '@/components/ServiceCard'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { services } from '@/lib/services'

gsap.registerPlugin(ScrollTrigger)

const DataGrid = dynamic(() => import('@/components/DataGrid'), { ssr: false })

const PULSE_GIF     = 'https://res.cloudinary.com/dank2mflu/image/upload/v1776735067/DP_Pulsing_omaq2i.gif'
const IMG_LAUGHING  = 'https://res.cloudinary.com/dank2mflu/image/upload/v1776735065/Laughing_woman_muup6e.png'
const IMG_LAPTOP    = 'https://res.cloudinary.com/dank2mflu/image/upload/v1776735212/Girl_with_Laptop_a1aabn.png'

const INDUSTRIES = [
  'Home Services', 'Restoration & Emergency', 'Roofing', 'Solar',
  'Legal Services', 'Financial Services', 'Automotive', 'Elective Healthcare',
  'Premium Local Services', 'Multi-Location Businesses',
]

const APPROACH = [
  { num: '01', title: 'Start with the business',   body: 'How you win, where you lose, who your best customers really are — before we touch a channel.' },
  { num: '02', title: 'Build the audience first',  body: 'First-party signals, enrichment, location intelligence. Targeting starts with knowing who, not guessing who.' },
  { num: '03', title: 'Activate across the stack', body: 'Digital, direct mail, CTV, AI receptionists, automated workflows — coordinated, not fragmented.' },
  { num: '04', title: 'Measure outcomes, not noise', body: 'Pipeline, revenue, qualified opportunity. Clicks and impressions are a means, not the scoreboard.' },
]

const STATS = [
  { value: '6',    label: 'Integrated capabilities' },
  { value: '100%', label: 'Performance-oriented' },
  { value: '24/7', label: 'Responsive AI systems' },
  { value: '0',    label: 'Generic playbooks' },
]

// Compact SVG glyphs per service — consistent visual language
const GLYPHS: Record<string, React.ReactNode> = {
  'visitor-identity': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/></svg>
  ),
  'audience-data': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16V7M8 16V4M12 16v-6M16 16V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  'geotargeting': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 19s6-6 6-11a6 6 0 10-12 0c0 5 6 11 6 11z" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="8" r="2" fill="currentColor"/></svg>
  ),
  'marketing': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2" fill="currentColor"/><circle cx="10" cy="10" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5"/></svg>
  ),
  'ai-systems': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 10h2M11 10h2M10 7v2M10 11v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/></svg>
  ),
  'optimizers': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 14l5-5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 5h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  'websites': (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7.5h16" stroke="currentColor" strokeWidth="1.4"/><circle cx="4.5" cy="5.7" r="0.6" fill="currentColor"/><circle cx="6.5" cy="5.7" r="0.6" fill="currentColor"/></svg>
  ),
}

const displayedServices = services.slice(0, 6)

export default function Home() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero headline reveal
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('[data-hero-stagger]'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.1 },
      )
    }

    // Approach items
    if (approachRef.current) {
      gsap.fromTo(
        approachRef.current.querySelectorAll('.approach-item'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: approachRef.current, start: 'top 78%' },
        },
      )
    }

    // Stats counter
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-card'),
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
        },
      )
    }

    // Service cards
    gsap.utils.toArray<HTMLElement>('.service-reveal').forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 34, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 86%' },
        },
      )
    })

    // Generic reveal
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } },
      )
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative grain overflow-hidden"
        style={{ paddingTop: 120, paddingBottom: 0, minHeight: '100svh' }}
      >
        {/* Data-grid canvas (absolute fill, behind content) */}
        <div className="absolute inset-0 z-0">
          <DataGrid />
        </div>

        <div className="relative z-10 container-x max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center" style={{ minHeight: 'calc(100svh - 120px)' }}>
            {/* Headline column */}
            <div className="lg:col-span-7 xl:col-span-7">
              <p data-hero-stagger className="eyebrow mb-6">Digital Pointes · Est. Growth System</p>
              <h1
                data-hero-stagger
                className="display text-[52px] sm:text-[68px] md:text-[88px] lg:text-[104px] xl:text-[120px] mb-7"
                style={{ color: 'var(--ink)' }}
              >
                You can&apos;t<br />
                close a <span className="text-gradient-orange">click.</span>
              </h1>
              <p
                data-hero-stagger
                className="text-[17px] md:text-[20px] leading-[1.5] max-w-xl mb-10"
                style={{ color: 'var(--muted)' }}
              >
                We build audience intelligence, activation systems, and growth engines that deliver
                measurable outcomes — not just activity.
              </p>
              <div data-hero-stagger className="flex flex-wrap items-center gap-3">
                <Link href="#contact" className="btn-orange">
                  Schedule a Strategy Call
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link href="#approach" className="btn-ghost">See how we work</Link>
              </div>

              {/* Trust strip */}
              <div data-hero-stagger className="mt-12 flex flex-wrap items-center gap-6">
                {['Audience intelligence', 'Multi-channel activation', 'AI-native systems'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--orange)' }} />
                    <span className="text-[13px] font-medium tracking-wide" style={{ color: 'var(--muted)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pulse visual column */}
            <div className="lg:col-span-5 xl:col-span-5 relative hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[520px]">
                {/* Concentric rings (decorative) */}
                {[0.55, 0.72, 0.9].map((scale, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full border"
                    style={{
                      width:  `${scale * 100}%`,
                      height: `${scale * 100}%`,
                      transform: 'translate(-50%,-50%)',
                      borderColor: 'rgba(255,158,27,0.18)',
                      animation: `pulseDot ${3 + i * 0.6}s ease-in-out infinite`,
                    }}
                  />
                ))}
                <div
                  className="absolute top-1/2 left-1/2 w-[58%] h-[58%] rounded-full"
                  style={{
                    transform: 'translate(-50%,-50%)',
                    background: 'radial-gradient(circle at center, rgba(255,158,27,0.18), transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
                <Image
                  src={PULSE_GIF}
                  alt="Digital Pointes pulse"
                  width={520}
                  height={520}
                  unoptimized
                  priority
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* Floating chips */}
              <div className="absolute top-[6%] right-[2%] px-3 py-2 rounded-full flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase num-mono shadow-sm"
                style={{ background: 'var(--white-warm)', color: 'var(--ink)', border: '1px solid var(--line)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                signal → identified
              </div>
              <div className="absolute bottom-[10%] left-[2%] px-3 py-2 rounded-full flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase num-mono shadow-sm"
                style={{ background: 'var(--ink)', color: 'var(--white-warm)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                activating · CTV · DM · Digital
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(15,14,12,0.45)' }}>Scroll</span>
          <span className="w-px h-6 block" style={{ background: 'linear-gradient(to bottom, rgba(15,14,12,0.5), transparent)' }} />
        </div>
      </section>

      {/* ============ MARQUEE TICKER ============ */}
      <section className="relative overflow-hidden border-y" style={{ borderColor: 'var(--line)', background: 'var(--white-warm)' }}>
        <div className="py-5 marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 px-6 shrink-0">
              {[
                'Visitor Identity',
                'Intent-Based Audience Data',
                'Location Intelligence',
                'Audience Activation',
                'Custom AI Systems',
                'Optimization Systems',
                'Growth-Ready Websites',
              ].map((label, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-5 shrink-0">
                  <span className="data-bit" />
                  <span className="text-[13px] md:text-[15px] font-medium tracking-wide" style={{ color: 'var(--ink)' }}>
                    {label}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ POSITIONING / MANIFESTO ============ */}
      <section className="section-pad container-x max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 reveal">The position</p>
            <h2 className="display text-[40px] md:text-[56px] lg:text-[64px] reveal" style={{ color: 'var(--ink)' }}>
              Most marketing creates activity.{' '}
              <span style={{ color: 'var(--orange)' }}>We focus on outcomes.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="reveal text-[17px] md:text-[19px] leading-[1.6]" style={{ color: 'var(--ink-soft)' }}>
              Businesses see clicks, impressions, traffic, and reports — but still struggle to answer
              the only questions that matter: Is this bringing in qualified opportunities? Is this
              actually driving growth?
            </p>
            <p className="reveal text-[17px] md:text-[19px] leading-[1.6]" style={{ color: 'var(--ink-soft)' }}>
              Digital Pointes starts with the business itself — how it wins, where it loses, who
              its best customers are — then builds and activates audiences in a way that&apos;s
              connected, measurable, and grounded in business reality.
            </p>
            <div className="reveal pl-5 border-l-2 text-[17px] md:text-[19px] font-semibold leading-snug mt-8"
              style={{ borderColor: 'var(--orange)', color: 'var(--ink)' }}
            >
              No buzzwords. No boilerplate. No wasted spend.
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section ref={statsRef} className="container-x max-w-[1400px] mx-auto pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: 'var(--line)' }}>
          {STATS.map((s) => (
            <div key={s.label} className="stat-card p-7 md:p-9" style={{ background: 'var(--white-warm)' }}>
              <div className="display text-[44px] md:text-[56px] num-mono" style={{ color: 'var(--ink)' }}>
                {s.value}
              </div>
              <div className="mt-3 text-[13px] md:text-[14px]" style={{ color: 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section id="services" className="section-pad container-x max-w-[1400px] mx-auto">
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 reveal">The growth system</p>
            <h2 className="headline text-[36px] md:text-[52px] lg:text-[60px] reveal" style={{ color: 'var(--ink)' }}>
              Six integrated capabilities.{' '}<br className="hidden md:block" />
              One connected engine.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8 reveal">
            <p className="text-[15px] md:text-[17px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
              These aren&apos;t isolated services. They&apos;re parts of a single system built to
              identify, reach, and convert your best customers — with the full stack working in sync.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedServices.map((svc, i) => (
            <div key={svc.slug} className="service-reveal">
              <ServiceCard
                number={`0${i + 1}`}
                name={svc.name}
                description={svc.description}
                href={`/${svc.slug}`}
                glyph={GLYPHS[svc.slug] ?? null}
              />
            </div>
          ))}
        </div>

        {/* Seventh service - wide card */}
        <div className="service-reveal mt-5">
          <Link href={`/${services[6].slug}`} className="group block">
            <article className="card-surface p-7 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="md:col-span-2 relative">
                <span className="num-mono text-[13px] tracking-widest" style={{ color: 'var(--muted)' }}>/ 07</span>
                <div className="mt-3 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
                  {GLYPHS['websites']}
                </div>
              </div>
              <div className="md:col-span-7 relative">
                <h3 className="text-[22px] md:text-[26px] font-bold mb-2 tracking-tight" style={{ color: 'var(--ink)' }}>
                  {services[6].name}
                </h3>
                <p className="text-[14.5px] md:text-[15.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {services[6].description}
                </p>
              </div>
              <div className="md:col-span-3 relative flex md:justify-end">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold group-hover:gap-3 transition-all" style={{ color: 'var(--ink)' }}>
                  Explore capability
                  <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--ink)', color: 'var(--white-warm)' }}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </span>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* ============ APPROACH / PROCESS (dark) ============ */}
      <section
        id="approach"
        ref={approachRef}
        className="section-pad relative overflow-hidden"
        style={{ background: 'var(--ink)', color: 'var(--white-warm)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,158,27,0.9) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative container-x max-w-[1400px] mx-auto">
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-5">How we work</p>
              <h2 className="headline text-[36px] md:text-[52px] lg:text-[60px]" style={{ color: 'var(--white-warm)' }}>
                Move fast. Measure everything.{' '}<br className="hidden md:block" />
                Improve continuously.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-10 flex items-end">
              <p className="text-[15px] md:text-[17px] leading-[1.65]" style={{ color: 'rgba(251,250,247,0.65)' }}>
                Outcomes over activity. We don&apos;t defend campaigns — we improve them. The feedback loop is always on.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {APPROACH.map((a) => (
              <div key={a.num} className="approach-item p-8 md:p-10" style={{ background: 'var(--ink)' }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="num-mono text-[12px] tracking-widest" style={{ color: 'rgba(255,158,27,0.8)' }}>
                    / {a.num}
                  </span>
                  <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--orange)' }} />
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold mb-3 tracking-tight" style={{ color: 'var(--white-warm)' }}>
                  {a.title}
                </h3>
                <p className="text-[14.5px] md:text-[15.5px] leading-relaxed" style={{ color: 'rgba(251,250,247,0.6)' }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-[20px] md:text-[28px] font-semibold tracking-tight max-w-3xl" style={{ color: 'rgba(251,250,247,0.85)' }}>
            Most campaigns run until the budget runs out.{' '}
            <span style={{ color: 'var(--orange)' }}>Ours evolve until they perform.</span>
          </p>
        </div>
      </section>

      {/* ============ WHO WE WORK WITH ============ */}
      <section id="clients" className="section-pad container-x max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5 reveal">Who we serve</p>
            <h2 className="headline text-[36px] md:text-[48px] lg:text-[56px] mb-6 reveal" style={{ color: 'var(--ink)' }}>
              Not for everyone. Built for businesses that take growth seriously.
            </h2>
            <p className="reveal text-[16px] md:text-[18px] leading-[1.6] mb-8" style={{ color: 'var(--muted)' }}>
              The best-fit client is a business where targeting matters, lead quality matters,
              and wasteful marketing is especially expensive. High-margin services. Competitive
              markets. Considered purchases. That&apos;s where precision pays off.
            </p>

            <div className="reveal">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
                    style={{ borderColor: 'var(--line)', color: 'var(--ink)', background: 'var(--white-warm)' }}
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <Link href="#contact" className="inline-flex items-center gap-2 mt-10 text-[14px] font-semibold link-underline reveal" style={{ color: 'var(--ink)' }}>
              See if we&apos;re the right fit
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="reveal aspect-[4/5] rounded-2xl overflow-hidden relative" style={{ background: 'var(--surface)' }}>
              <Image src={IMG_LAUGHING} alt="Growth-focused business owner" fill unoptimized className="object-cover" />
            </div>
            <div className="reveal aspect-[4/5] rounded-2xl overflow-hidden relative mt-12" style={{ background: 'var(--surface)' }}>
              <Image src={IMG_LAPTOP} alt="Digital marketing strategy" fill unoptimized className="object-cover" />
            </div>

            {/* Floating caption card */}
            <div
              className="reveal absolute bottom-0 md:bottom-6 right-0 md:-right-4 w-[78%] md:w-[62%] p-5 rounded-xl shadow-lg"
              style={{ background: 'var(--white-warm)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--orange)' }} />
                <p className="num-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  Signal · Identified
                </p>
              </div>
              <p className="text-[14px] font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
                &ldquo;We replaced two agencies with one connected system — and the pipeline got stronger, not louder.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BIG CTA ============ */}
      <section className="section-pad-sm container-x max-w-[1400px] mx-auto">
        <div
          className="rounded-3xl overflow-hidden relative p-10 md:p-16 lg:p-20 grain"
          style={{ background: 'var(--orange)' }}
        >
          <div className="absolute top-6 right-6 flex items-center gap-2 num-mono text-[11px] tracking-widest uppercase" style={{ color: 'rgba(15,14,12,0.55)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--ink)' }} />
            Ready when you are
          </div>

          <div className="relative max-w-3xl">
            <h2 className="display text-[40px] md:text-[64px] lg:text-[80px] mb-5" style={{ color: 'var(--ink)' }}>
              Let&apos;s build the system that brings the pipeline.
            </h2>
            <p className="text-[17px] md:text-[20px] leading-[1.5] mb-8" style={{ color: 'rgba(15,14,12,0.72)' }}>
              This isn&apos;t a generic sales call. It&apos;s a working session to evaluate what&apos;s working,
              what&apos;s not, and where the biggest opportunities are.
            </p>
            <Link href="#contact" className="btn-primary">
              Schedule a Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="section-pad container-x max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 reveal">Get in touch</p>
            <h2 className="display text-[36px] md:text-[48px] lg:text-[56px] mb-6 reveal" style={{ color: 'var(--ink)' }}>
              Uncover what&apos;s holding your growth back.
            </h2>
            <p className="reveal text-[16px] md:text-[18px] leading-[1.6] mb-10" style={{ color: 'var(--muted)' }}>
              We evaluate your current marketing, audience strategy, and conversion paths to identify
              where performance can be improved and scaled.
            </p>

            <ul className="space-y-4 reveal">
              <li>
                <a href="mailto:sales@digitalpointes.com" className="flex items-center gap-3 link-underline" style={{ color: 'var(--ink)' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,158,27,0.14)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12v8H1V3zm0 0l6 5 6-5" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-[15px] font-medium">sales@digitalpointes.com</span>
                </a>
              </li>
              <li>
                <a href="tel:###-###-####" className="flex items-center gap-3" style={{ color: 'var(--ink)' }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,158,27,0.14)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 1h3l1.5 3.5-2 1.2a7 7 0 003.8 3.8l1.2-2L13 11v3A12 12 0 012 1z" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="text-[15px] font-medium">###-###-####</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 reveal">
            <div className="p-6 md:p-10 rounded-2xl" style={{ background: 'var(--white-warm)', border: '1px solid var(--line)' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
