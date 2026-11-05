"use client"

import { useState } from "react"
import { Send, RotateCcw } from "lucide-react"
import { profile } from "@/lib/portfolio"
import { Mailbox } from "@/components/sprites/props"
import { Signpost } from "@/components/sections"

// Formspree form ID, e.g. "xyzabcd" from https://formspree.io/f/xyzabcd
// Set NEXT_PUBLIC_FORMSPREE_ID in .env.local and in Vercel → Settings → Environment Variables.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ""

type State = "idle" | "sending" | "sent" | "error"

export function MailboxSection() {
  const [state, setState] = useState<State>("idle")
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!FORMSPREE_ID) {
      setState("error")
      setError(
        profile.email
          ? `The contact form isn't set up yet. Please email ${profile.email} directly.`
          : "The contact form isn't set up yet. Please reach out on LinkedIn.",
      )
      return
    }

    setState("sending")
    setError("")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.errors?.[0]?.message ?? "Something went wrong. Please try again.")
      }
      form.reset()
      setState("sent")
    } catch (err) {
      setState("error")
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <section id="mailbox" aria-labelledby="mail-h" className="mx-auto max-w-5xl px-4 py-16">
      <Signpost level="Level 4" title="Garden Mailbox" id="mail-h" />
      <div className="paper grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center text-center">
          <Mailbox flagUp={state === "sent"} className="h-44 w-40" />
          <p className="mt-2 text-sm font-bold text-ink-soft">
            {state === "sent" ? "Flag's up — message delivered!" : "Drop a note. The flag goes up when it's delivered."}
          </p>
        </div>

        {state === "sent" ? (
          <div className="text-center md:text-left" role="status">
            <h3 className="font-display text-3xl">Thanks for writing!</h3>
            <p className="mt-2 font-semibold text-ink-soft">I&apos;ll get back to you soon.</p>
            <button className="btn-chunk btn-paper mt-5" onClick={() => setState("idle")}>
              <RotateCcw className="h-4 w-4" /> Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
            <div>
              <h3 className="font-display text-2xl">Get in touch</h3>
              <p className="font-semibold text-ink-soft">Have a project in mind or just want to say hi?</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" autoComplete="name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            </div>
            <Field label="Subject" name="_subject" placeholder="Project inquiry" />
            <div>
              <label htmlFor="message" className="mb-1 block text-xs font-black uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project…"
                className="w-full rounded-xl border-[3px] border-ink bg-white px-3 py-2 font-semibold placeholder:text-ink-soft/70 focus:bg-sky-100"
              />
            </div>
            {/* honeypot against spam bots */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {state === "error" && (
              <p role="alert" className="rounded-xl border-[3px] border-ink bg-[#ffe1d9] px-3 py-2 text-sm font-bold">
                {error}
              </p>
            )}
            <button type="submit" className="btn-chunk" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Send message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-black uppercase tracking-wider">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required
        className="w-full rounded-xl border-[3px] border-ink bg-white px-3 py-2 font-semibold placeholder:text-ink-soft/70 focus:bg-sky-100"
        {...rest}
      />
    </div>
  )
}
