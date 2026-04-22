'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false })

const LOGO_URL = 'https://res.cloudinary.com/dank2mflu/image/upload/v1776735064/dplogo_gk6n9o.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,243,239,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <div className="container-x max-w-[1400px] mx-auto h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={LOGO_URL} alt="Digital Pointes" width={36} height={36} unoptimized priority className="h-9 w-auto" />
            <span className="font-bold tracking-tight text-[17px] hidden sm:inline" style={{ color: 'var(--ink)' }}>
              Digital Pointes
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-[14px] font-medium link-underline">Services</Link>
            <Link href="/#approach" className="text-[14px] font-medium link-underline">Approach</Link>
            <Link href="/#clients" className="text-[14px] font-medium link-underline">Who we serve</Link>
            <Link href="/#contact" className="text-[14px] font-medium link-underline">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#contact" className="hidden md:inline-flex btn-orange text-[13px]" style={{ padding: '10px 18px' }}>
              Schedule a Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--line)', background: 'var(--white-warm)' }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M1 1h16M1 7h16M1 13h16" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
