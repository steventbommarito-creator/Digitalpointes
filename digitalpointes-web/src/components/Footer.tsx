import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/services'

const LOGO_URL = 'https://res.cloudinary.com/dank2mflu/image/upload/v1776735064/dplogo_gk6n9o.png'

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ background: 'var(--ink)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="container-x max-w-[1400px] mx-auto pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image src={LOGO_URL} alt="Digital Pointes" width={40} height={40} unoptimized className="h-10 w-auto" />
              <span className="font-bold text-[18px]" style={{ color: 'var(--white-warm)' }}>Digital Pointes</span>
            </div>
            <p className="text-[15px] leading-relaxed max-w-md" style={{ color: 'rgba(251,250,247,0.6)' }}>
              Audience intelligence, activation systems, and growth engines built for businesses that take outcomes seriously.
            </p>
            <div className="mt-8 space-y-2.5">
              <a href="mailto:sales@digitalpointes.com" className="flex items-center gap-2.5 text-[14px] link-underline" style={{ color: 'var(--white-warm)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                sales@digitalpointes.com
              </a>
              <a href="tel:###-###-####" className="flex items-center gap-2.5 text-[14px]" style={{ color: 'rgba(251,250,247,0.7)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                ###-###-####
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: 'rgba(251,250,247,0.45)' }}>
              Capabilities
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-[14px] link-underline" style={{ color: 'var(--white-warm)' }}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick nav */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5" style={{ color: 'rgba(251,250,247,0.45)' }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Approach',     href: '/#approach' },
                { label: 'Who we serve', href: '/#clients' },
                { label: 'Contact',      href: '/#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[14px] link-underline" style={{ color: 'var(--white-warm)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[12px]" style={{ color: 'rgba(251,250,247,0.45)' }}>
            © {new Date().getFullYear()} Digital Pointes. All rights reserved.
          </p>
          <p className="text-[12px] num-mono tracking-wider" style={{ color: 'rgba(251,250,247,0.3)' }}>
            MEANINGFUL · MEASURABLE · MARKETING
          </p>
        </div>
      </div>
    </footer>
  )
}
