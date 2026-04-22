'use client'

import { useState } from 'react'

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

const initial: FormState = { name: '', company: '', email: '', phone: '', message: '' }
type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm(initial)
    } catch {
      setStatus('error')
    }
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
      {children}
    </span>
  )

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <Label>Name *</Label>
          <input required type="text" value={form.name} onChange={update('name')} placeholder="Your name" className="input-clean" />
        </label>
        <label className="block">
          <Label>Company</Label>
          <input type="text" value={form.company} onChange={update('company')} placeholder="Your company" className="input-clean" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <Label>Email *</Label>
          <input required type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" className="input-clean" />
        </label>
        <label className="block">
          <Label>Phone</Label>
          <input type="tel" value={form.phone} onChange={update('phone')} placeholder="###-###-####" className="input-clean" />
        </label>
      </div>

      <label className="block">
        <Label>Tell us about your goals</Label>
        <textarea
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="What are you trying to achieve? What's getting in the way?"
          className="input-clean resize-none"
        />
      </label>

      {status === 'error' && (
        <p className="text-[13px]" style={{ color: '#D94B3A' }}>
          Something went wrong. Email us directly at{' '}
          <a href="mailto:sales@digitalpointes.com" style={{ color: 'var(--orange)' }}>
            sales@digitalpointes.com
          </a>
          .
        </p>
      )}

      {status === 'success' ? (
        <div
          className="py-5 text-center rounded-xl font-semibold"
          style={{ background: 'rgba(255,158,27,0.12)', color: 'var(--orange-2)' }}
        >
          Message received. We&apos;ll be in touch shortly.
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-orange w-full justify-center"
          style={{ opacity: status === 'submitting' ? 0.75 : 1 }}
        >
          {status === 'submitting' ? 'Sending…' : (
            <>
              Schedule a Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </>
          )}
        </button>
      )}
    </form>
  )
}
