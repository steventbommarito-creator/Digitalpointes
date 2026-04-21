'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const HamburgerMenu = dynamic(() => import('./HamburgerMenu'), { ssr: false })

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(15,14,12,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735064/dplogo_gk6n9o.png"
              alt="Digital Pointes"
              width={130}
              height={36}
              unoptimized
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded text-sm font-semibold transition-colors"
              style={{ background: '#FF9E1B', color: '#0F0E0C' }}
            >
              Schedule a Call
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[5px] p-2 group"
              aria-label="Open menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block transition-all duration-200"
                  style={{
                    width: i === 1 ? 20 : 26,
                    height: 2,
                    background: '#E8E4DC',
                    borderRadius: 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  )
}
