"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"

type CountUpProps = {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  inView?: boolean
}

/**
 * Slot-machine style rolling digit counter.
 * Each digit rolls independently with a staggered delay.
 */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  inView = true,
}: CountUpProps) {
  const [started, setStarted] = useState(!inView)
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  const digits = useMemo(() => String(to).split(""), [to])

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex", alignItems: "baseline" }}>
      {prefix && <span>{prefix}</span>}
      {digits.map((digit, i) => (
        <RollingDigit
          key={`${i}-${digit}`}
          target={digit}
          started={started}
          delay={i * 120}
          duration={duration}
          reduce={reduce ?? false}
        />
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

function RollingDigit({
  target,
  started,
  delay,
  duration,
  reduce,
}: {
  target: string
  started: boolean
  delay: number
  duration: number
  reduce: boolean
}) {
  const isNumber = /\d/.test(target)
  const targetNum = isNumber ? parseInt(target) : 0

  if (!isNumber || reduce) {
    return (
      <span style={{ display: "inline-block" }}>
        {started ? target : "0"}
      </span>
    )
  }

  // Build the sequence: 0 → 9 repeated twice, then land on target
  const sequence = started
    ? [...Array(20 + targetNum + 1)].map((_, i) => i % 10)
    : [0]

  return (
    <span
      style={{
        display: "inline-block",
        height: "1.1em",
        overflow: "hidden",
        position: "relative",
        width: "0.62em",
        textAlign: "center",
      }}
    >
      <AnimatePresence mode="popLayout">
        {started ? (
          <motion.span
            key="rolling"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: 0,
              right: 0,
            }}
            initial={{ y: 0 }}
            animate={{ y: `${-(sequence.length - 1) * 1.1}em` }}
            transition={{
              duration: duration / 1000,
              delay: delay / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {sequence.map((num, i) => (
              <span
                key={i}
                style={{
                  height: "1.1em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {num}
              </span>
            ))}
          </motion.span>
        ) : (
          <span
            style={{
              height: "1.1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            0
          </span>
        )}
      </AnimatePresence>
    </span>
  )
}
