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

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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

  const inputClass =
    'w-full px-4 py-3 rounded text-sm transition-all outline-none border focus:border-orange-500'

  const inputStyle = {
    background: '#F5F3EF',
    borderColor: 'rgba(26,25,23,0.15)',
    color: '#1A1917',
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#6B6860' }}>
            Name *
          </label>
          <input
            required
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#6B6860' }}>
            Company
          </label>
          <input
            type="text"
            value={form.company}
            onChange={update('company')}
            placeholder="Your company"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#6B6860' }}>
            Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@company.com"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#6B6860' }}>
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="###-###-####"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: '#6B6860' }}>
          Tell us about your goals
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={update('message')}
          placeholder="What are you trying to achieve? What's getting in the way?"
          className={inputClass + ' resize-none'}
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#EF4444' }}>
          Something went wrong. Email us directly at{' '}
          <a href="mailto:sales@digitalpointes.com" style={{ color: '#FF9E1B' }}>
            sales@digitalpointes.com
          </a>
        </p>
      )}

      {status === 'success' ? (
        <div
          className="py-5 text-center rounded font-semibold"
          style={{ background: 'rgba(255,158,27,0.1)', color: '#FF9E1B' }}
        >
          Message received. We'll be in touch shortly.
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 rounded font-semibold text-sm transition-all"
          style={{
            background: status === 'submitting' ? '#E8890A' : '#FF9E1B',
            color: '#0F0E0C',
            opacity: status === 'submitting' ? 0.8 : 1,
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Schedule a Strategy Call'}
        </button>
      )}
    </form>
  )
}
