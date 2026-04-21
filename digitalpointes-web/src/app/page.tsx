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

const ParticleVortex = dynamic(() => import('@/components/ParticleVortex'), { ssr: false })
const MobileHero = dynamic(() => import('@/components/MobileHero'), { ssr: false })

const displayedServices = services.slice(0, 6)

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const icpRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out', delay: 0.4 }
      )
    }

    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 8, duration: 1.2, ease: 'power1.inOut', repeat: -1, yoyo: true
      })
    }

    if (processRef.current) {
      gsap.fromTo(
        processRef.current.querySelectorAll('.process-item'),
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' }
        }
      )
    }

    if (icpRef.current) {
      gsap.fromTo(
        icpRef.current.querySelectorAll('.icp-item'),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: icpRef.current, start: 'top 80%' }
        }
      )
    }

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  const industries = [
    'Home Services', 'Restoration & Emergency', 'Roofing', 'Solar',
    'Legal Services', 'Financial Services', 'Automotive', 'Elective Healthcare',
    'Premium Local Services', 'Multi-Location Businesses',
  ]

  const philosophyLines = [
    { stat: 'We don\u2019t let campaigns drift.', detail: 'If something isn\u2019t working, we don\u2019t defend it. We improve it.' },
    { stat: 'We fail fast, learn fast, keep momentum.', detail: 'The feedback loop is always on.' },
    { stat: 'We start with the business, not the channel.', detail: 'Outcomes over activity. Every time.' },
    { stat: 'We don\u2019t believe in set-it-and-forget-it.', detail: 'We test, learn, refine, and keep moving.' },
  ]

  return (
    <main className="min-h-screen" style={{ background: '#F5F3EF' }}>
      <Nav />

      {/* HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: '100svh', minHeight: 600, background: '#0F0E0C' }}
      >
        <div className="hidden md:block absolute inset-0">
          <ParticleVortex />
        </div>
        <div className="md:hidden absolute inset-0">
          <MobileHero />
        </div>

        <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center text-center pointer-events-none">
          <div ref={heroTextRef}>
            <p
              className="text-xs tracking-[0.3em] font-semibold uppercase mb-6"
              style={{ color: '#FF9E1B', opacity: 0 }}
            >
              Digital Pointes
            </p>
            <h1
              className="text-5xl lg:text-7xl font-bold leading-tight mb-5"
              style={{ color: '#F5F3EF', opacity: 0 }}
            >
              You can't close a click.
            </h1>
            <p
              className="text-lg lg:text-xl tracking-wide"
              style={{ color: 'rgba(232,228,220,0.65)', opacity: 0 }}
            >
              Meaningful, measurable marketing.
            </p>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,228,220,0.35)' }}>
            Scroll
          </p>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(232,228,220,0.25)" strokeWidth="1.5" />
            <rect x="6.5" y="5" width="3" height="6" rx="1.5" fill="rgba(255,158,27,0.6)" />
          </svg>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="px-6 md:px-10 py-24 border-b" style={{ borderColor: 'rgba(26,25,23,0.08)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: '#1A1917' }}>
                Most marketing creates activity.{' '}
                <span style={{ color: '#FF9E1B' }}>We focus on outcomes.</span>
              </h2>
            </div>
            <div className="space-y-5">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#6B6860' }}>
                Businesses see clicks, impressions, traffic, and reports — but still struggle to
                answer the only questions that matter: Is this bringing in qualified opportunities?
                Is this actually driving growth?
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#6B6860' }}>
                Digital Pointes starts with the business itself — how it wins, where it loses, who
                its best customers are — then builds and activates audiences in a way that&apos;s
                connected, measurable, and grounded in business reality.
              </p>
              <div
                className="mt-4 pl-5 border-l-2 text-base font-semibold leading-snug"
                style={{ borderColor: '#FF9E1B', color: '#1A1917' }}
              >
                No buzzwords. No boilerplate. No wasted spend.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.25em] font-semibold uppercase mb-3" style={{ color: '#FF9E1B' }}>
                The Growth System
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1A1917' }}>
                Six integrated capabilities.<br className="hidden md:block" />
                One connected engine.
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: '#6B6860' }}>
              These aren&apos;t isolated services. They&apos;re parts of a single system built to
              identify, reach, and convert your best customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedServices.map((svc, i) => (
              <ServiceCard
                key={svc.slug}
                number={`0${i + 1}`}
                icon={svc.icon}
                name={svc.name}
                description={svc.description}
                href={`/${svc.slug}`}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} className="px-6 md:px-10 py-24" style={{ background: '#0F0E0C' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.25em] font-semibold uppercase mb-8" style={{ color: '#FF9E1B' }}>
            How we work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-16" style={{ color: '#F5F3EF' }}>
            We move fast, measure everything,<br className="hidden md:block" /> and improve continuously.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {philosophyLines.map((item, i) => (
              <div
                key={i}
                className="process-item p-8"
                style={{ background: '#0F0E0C', opacity: 0 }}
              >
                <p className="text-base font-bold mb-2" style={{ color: '#E8E4DC' }}>
                  {item.stat}
                </p>
                <p className="text-sm" style={{ color: 'rgba(232,228,220,0.55)' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="text-xl md:text-2xl font-semibold" style={{ color: 'rgba(232,228,220,0.75)' }}>
              Most campaigns run until the budget runs out.{' '}
              <span style={{ color: '#FF9E1B' }}>Ours evolve until they perform.</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section
        id="about"
        ref={icpRef}
        className="px-6 md:px-10 py-24 border-b"
        style={{ borderColor: 'rgba(26,25,23,0.08)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.25em] font-semibold uppercase mb-4" style={{ color: '#FF9E1B' }}>
                Who we work with
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: '#1A1917' }}>
                Not for everyone. Built for businesses that take growth seriously.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#6B6860' }}>
                The best-fit client is a business where targeting matters, lead quality matters,
                and wasteful marketing is especially expensive. High-margin services. Competitive
                markets. Considered purchases. That&apos;s where precision pays off.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: '#FF9E1B' }}
              >
                <span>See if we&apos;re the right fit</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] font-semibold uppercase mb-5" style={{ color: '#6B6860' }}>
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="icp-item px-3 py-1.5 rounded text-xs font-medium border"
                    style={{
                      borderColor: 'rgba(26,25,23,0.12)',
                      color: '#1A1917',
                      background: '#ECEAE4',
                      opacity: 0,
                    }}
                  >
                    {ind}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden aspect-square">
                  <Image
                    src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735065/Laughing_woman_muup6e.png"
                    alt="Growth-focused business owner"
                    width={280}
                    height={280}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden aspect-square">
                  <Image
                    src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735212/Girl_with_Laptop_a1aabn.png"
                    alt="Digital marketing strategy"
                    width={280}
                    height={280}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#FF9E1B' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#0F0E0C' }}>
            If you&apos;re looking for better outcomes, let&apos;s talk.
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: 'rgba(15,14,12,0.7)' }}>
            This isn&apos;t a generic sales call. It&apos;s a working session to evaluate
            what&apos;s working, what&apos;s not, and where the biggest opportunities are.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded font-bold text-base transition-all hover:opacity-90"
            style={{ background: '#0F0E0C', color: '#F5F3EF' }}
          >
            Schedule a Strategy Call
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-10 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.25em] font-semibold uppercase mb-4" style={{ color: '#FF9E1B' }}>
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: '#1A1917' }}>
              Uncover what&apos;s holding your growth back.
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#6B6860' }}>
              We evaluate your current marketing, audience strategy, and conversion paths to
              identify where performance can be improved and scaled.
            </p>
            <div className="space-y-4">
              <a href="mailto:sales@digitalpointes.com" className="flex items-center gap-3 text-sm group" style={{ color: '#1A1917' }}>
                <span className="w-8 h-8 flex items-center justify-center rounded" style={{ background: 'rgba(255,158,27,0.12)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 3h12v8H1V3zm0 0l6 5 6-5" stroke="#FF9E1B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="group-hover:underline">sales@digitalpointes.com</span>
              </a>
              <a href="tel:###-###-####" className="flex items-center gap-3 text-sm" style={{ color: '#1A1917' }}>
                <span className="w-8 h-8 flex items-center justify-center rounded" style={{ background: 'rgba(255,158,27,0.12)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 1h3l1.5 3.5-2 1.2a7 7 0 003.8 3.8l1.2-2L13 11v3A12 12 0 012 1z" stroke="#FF9E1B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                ###-###-####
              </a>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
