'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Visitor Identity',      href: '/visitor-identity' },
  { label: 'Audience Data',         href: '/audience-data' },
  { label: 'Geotargeting',          href: '/geotargeting' },
  { label: 'Audience Activation',   href: '/marketing' },
  { label: 'Custom AI Systems',     href: '/ai-systems' },
  { label: 'Optimization Systems',  href: '/optimizers' },
  { label: 'Growth-Ready Websites', href: '/websites' },
]

const BOTTOM_LINKS = [
  { label: 'About',    href: '/#about' },
  { label: 'Contact',  href: '/#contact' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function HamburgerMenu({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    const links = linksRef.current?.querySelectorAll('li')
    if (!panel || !overlay || !links) return

    if (open) {
      gsap.set(panel, { x: '100%' })
      gsap.set(links, { x: 30, opacity: 0 })
      gsap.to(overlay, { opacity: 1, duration: 0.3 })
      gsap.to(panel, { x: '0%', duration: 0.55, ease: 'power3.out' })
      gsap.to(links, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.2,
      })
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.25 })
      gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.in' })
    }
  }, [open])

  if (!open && typeof window !== 'undefined') {
    const panel = panelRef.current
    if (panel) {
      const transform = window.getComputedStyle(panel).transform
      if (transform === 'none') return null
    }
  }

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'rgba(15,14,12,0.75)', opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 h-full w-full max-w-sm flex flex-col"
        style={{ background: '#0F0E0C', transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Image
            src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735064/dplogo_gk6n9o.png"
            alt="Digital Pointes"
            width={110}
            height={32}
            unoptimized
            className="opacity-90"
          />
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded"
            style={{ color: 'rgba(232,228,220,0.7)' }}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-8 py-10 overflow-y-auto">
          <p
            className="text-xs tracking-[0.2em] mb-6 font-medium uppercase"
            style={{ color: '#FF9E1B' }}
          >
            Services
          </p>
          <ul ref={linksRef} className="space-y-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="pixel-hover block py-3 text-xl font-semibold border-b"
                  style={{
                    color: '#E8E4DC',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-6">
            {BOTTOM_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="pixel-hover text-sm"
                style={{ color: 'rgba(232,228,220,0.55)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="px-8 py-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Link
            href="/#contact"
            onClick={onClose}
            className="block w-full text-center py-3.5 px-6 rounded font-semibold text-sm transition-colors"
            style={{ background: '#FF9E1B', color: '#0F0E0C' }}
          >
            Schedule a Strategy Call
          </Link>
        </div>
      </div>
    </div>
  )
}
