'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { services } from '@/lib/services'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-50 md:hidden"
      style={{
        pointerEvents: open ? 'auto' : 'none',
        background: 'var(--bg)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      <div className="h-[72px] flex items-center justify-between container-x">
        <span className="font-bold tracking-tight text-[17px]" style={{ color: 'var(--ink)' }}>
          Digital Pointes
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 flex items-center justify-center rounded-full border"
          style={{ borderColor: 'var(--line)', background: 'var(--white-warm)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="container-x pt-8 pb-10">
        <p className="eyebrow mb-5">Menu</p>
        <nav className="flex flex-col">
          {[
            { label: 'Home',          href: '/' },
            { label: 'Services',      href: '/#services' },
            { label: 'Approach',      href: '/#approach' },
            { label: 'Who we serve',  href: '/#clients' },
            { label: 'Contact',       href: '/#contact' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="py-4 text-[28px] font-bold leading-none tracking-tight border-b"
              style={{ color: 'var(--ink)', borderColor: 'var(--line)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="eyebrow mt-10 mb-4">Capabilities</p>
        <ul className="space-y-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                onClick={onClose}
                className="flex items-center justify-between py-2 text-[15px]"
                style={{ color: 'var(--muted)' }}
              >
                <span>{s.name}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/#contact" onClick={onClose} className="btn-orange mt-10 w-full justify-center">
          Schedule a Strategy Call
        </Link>
      </div>
    </div>
  )
}
