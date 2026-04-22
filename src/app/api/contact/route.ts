import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, message } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    // Configure via environment variables:
    //   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    // For Gmail: host=smtp.gmail.com, port=587, user=your@gmail.com, pass=app-password
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Digital Pointes Website" <${process.env.SMTP_USER}>`,
      to: 'sales@digitalpointes.com',
      replyTo: email,
      subject: `New strategy call request from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1917">
          <div style="background:#0F0E0C;padding:24px;border-radius:8px 8px 0 0">
            <h2 style="color:#F5F3EF;margin:0;font-size:20px">New Strategy Call Request</h2>
          </div>
          <div style="background:#F5F3EF;padding:32px;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6B6860;font-size:13px;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              ${company ? `<tr><td style="padding:8px 0;color:#6B6860;font-size:13px">Company</td><td style="padding:8px 0;font-weight:600">${company}</td></tr>` : ''}
              <tr><td style="padding:8px 0;color:#6B6860;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#FF9E1B">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6B6860;font-size:13px">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            </table>
            ${message ? `
            <div style="margin-top:24px;padding:16px;background:#ECEAE4;border-left:3px solid #FF9E1B;border-radius:4px">
              <p style="margin:0 0 8px 0;font-size:12px;color:#6B6860;text-transform:uppercase;letter-spacing:0.1em">Message</p>
              <p style="margin:0;white-space:pre-wrap">${message}</p>
            </div>` : ''}
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
