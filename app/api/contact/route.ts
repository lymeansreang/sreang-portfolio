import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter using Gmail
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD

  if (!emailUser || !emailPassword) {
    throw new Error('EMAIL_USER and EMAIL_PASSWORD environment variables are required')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Create transporter and verify credentials
    const transporter = createTransporter()

    try {
      // Verify transporter connectivity/credentials before sending
      await new Promise<void>((resolve, reject) => {
        transporter.verify((err) => {
          if (err) return reject(err)
          resolve()
        })
      })
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError)
      const msg = verifyError instanceof Error ? verifyError.message : 'Transporter verification failed'
      return NextResponse.json({ error: `Email transporter error: ${msg}` }, { status: 500 })
    }

    // Send email
    try {
      await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'lmsreang3@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    })
    } catch (sendError) {
      console.error('Failed to send email (sendMail error):', sendError)
      const msg = sendError instanceof Error ? sendError.message : 'sendMail failed'
      return NextResponse.json({ error: `Failed to send email: ${msg}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
