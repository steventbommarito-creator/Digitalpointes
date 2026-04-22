import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digital Pointes: Meaningful, Measurable Marketing',
  description:
    'Digital Pointes helps high-value businesses grow through precision audience targeting, intelligent data, AI-powered systems, and coordinated multi-channel marketing.',
  openGraph: {
    title: 'Digital Pointes: Meaningful, Measurable Marketing',
    description:
      "You can\u2019t close a click. We focus on real leads, real customers, and measurable business impact.",
    url: 'https://digitalpointes.com',
    siteName: 'Digital Pointes',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
