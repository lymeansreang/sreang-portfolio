"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import Input from "./ui/input"
import Textarea from "./ui/textarea"
import Button from "./ui/button"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="mb-32 scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-background/0 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white lg:sr-only">Contact</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Get in touch</h3>
          <p className="text-muted-foreground">
            Have a project in mind or just want to say hi? Feel free to send me a message and I'll get back to you as
            soon as possible.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 border border-primary/20 bg-primary/5 rounded-xl text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
            <p className="text-muted-foreground mb-6">Thanks for reaching out. I'll get back to you shortly.</p>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Name
                </label>
                <Input id="name" placeholder="Alex Rivera" required className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  required
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Subject
              </label>
              <Input id="subject" placeholder="Project Inquiry" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                required
                className="min-h-[150px] bg-white/5 border-white/10"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto px-8 py-6 h-auto text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
