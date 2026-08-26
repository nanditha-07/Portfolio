import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    if (name.length < 1 || name.length > 120 || email.length < 3 || email.length > 320 || message.length < 1 || message.length > 5000 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'nandithannair2007@gmail.com'
    if (!url || !key) return NextResponse.json({ error: 'Contact storage is not configured yet.' }, { status: 503 })
    if (!resendKey) return NextResponse.json({ error: 'Contact notifications are not configured yet.' }, { status: 503 })

    const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
    const { error } = await supabase.from('contact_messages').insert({ name, email, message })
    if (error) return NextResponse.json({ error: 'Unable to save your message right now.' }, { status: 500 })

    const timestamp = new Date().toISOString()
    const resend = new Resend(resendKey)
    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `New contact form submission

Name: ${name}
Email: ${email}
Timestamp: ${timestamp}

Message:
${message}`,
    })
    if (emailError) return NextResponse.json({ error: 'Your message was saved, but we could not send the notification.' }, { status: 502 })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
