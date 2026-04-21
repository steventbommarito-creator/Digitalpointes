import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { label: 'Visitor Identity',      href: '/visitor-identity' },
  { label: 'Audience Data',         href: '/audience-data' },
  { label: 'Geotargeting',          href: '/geotargeting' },
  { label: 'Audience Activation',   href: '/marketing' },
  { label: 'Custom AI Systems',     href: '/ai-systems' },
  { label: 'Optimization Systems',  href: '/optimizers' },
  { label: 'Growth-Ready Websites', href: '/websites' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0F0E0C', color: '#E8E4DC' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="https://res.cloudinary.com/dank2mflu/image/upload/v1776735064/dplogo_gk6n9o.png"
              alt="Digital Pointes"
              width={120}
              height={34}
              unoptimized
              className="mb-5 opacity-90"
            />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(232,228,220,0.55)' }}>
              Precision audience targeting, intelligent data, AI-powered systems,
              and coordinated marketing — built for meaningful, measurable growth.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs tracking-[0.2em] font-semibold uppercase mb-5" style={{ color: '#FF9E1B' }}>
              Services
            </p>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(232,228,220,0.55)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] font-semibold uppercase mb-5" style={{ color: '#FF9E1B' }}>
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sales@digitalpointes.com"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(232,228,220,0.55)' }}
                >
                  sales@digitalpointes.com
                </a>
              </li>
              <li>
                <a
                  href="tel:###-###-####"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(232,228,220,0.55)' }}
                >
                  ###-###-####
                </a>
              </li>
              <li className="pt-4">
                <Link
                  href="/#contact"
                  className="inline-block px-5 py-2.5 rounded text-sm font-semibold"
                  style={{ background: '#FF9E1B', color: '#0F0E0C' }}
                >
                  Schedule a Strategy Call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(232,228,220,0.35)' }}
        >
          <p>© {new Date().getFullYear()} Digital Pointes. All rights reserved.</p>
          <p>No boilerplate fluff. No trendy distractions. Just marketing that works.</p>
        </div>
      </div>
    </footer>
  )
}
