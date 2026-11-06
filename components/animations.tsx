"use client"

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion"

// ─── BlurText ────────────────────────────────────────────
// Each character fades/blurs in with a stagger. (ReactBits: Blur Text)

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function BlurText({ text, className, delay = 0, stagger = 0.04 }: BlurTextProps) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) return <span className={className}>{text}</span>

  let charIdx = 0
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {word.split("").map((char) => {
            const i = charIdx++
            return (
              <motion.span
                key={i}
                aria-hidden
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: delay + i * stagger,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span>{" "}</span>}
        </span>
      ))}
    </span>
  )
}

// ─── Magnet ──────────────────────────────────────────────
// Element subtly follows cursor on hover. (ReactBits: Magnet)

type MagnetProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnet({ children, className, strength = 0.3 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  )
}

// ─── TextShimmer ─────────────────────────────────────────
// Sweeping gradient shimmer on text. (ReactBits: Shiny Text)

type TextShimmerProps = {
  children: string
  className?: string
  duration?: number
}

export function TextShimmer({ children, className, duration = 3 }: TextShimmerProps) {
  const reduce = useReducedMotion()

  if (reduce) return <span className={className}>{children}</span>

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-ink-soft) 0%, var(--color-ink) 40%, var(--color-sunny) 50%, var(--color-ink) 60%, var(--color-ink-soft) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}

// ─── ClickSpark ──────────────────────────────────────────
// Burst of sparkle particles on every click. (ReactBits: Click Spark)

export function ClickSpark({ children, className }: { children: ReactNode; className?: string }) {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([])
  const reduce = useReducedMotion()
  const nextId = useRef(0)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = nextId.current++
      setSparks((s) => [...s, { id, x, y }])
      setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 700)
    },
    [reduce],
  )

  return (
    <div className={className} style={{ position: "relative" }} onClick={handleClick}>
      {children}
      {sparks.map((spark) => (
        <SparkBurst key={spark.id} x={spark.x} y={spark.y} />
      ))}
    </div>
  )
}

function SparkBurst({ x, y }: { x: number; y: number }) {
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return {
      dx: Math.cos(angle) * (30 + Math.random() * 20),
      dy: Math.sin(angle) * (30 + Math.random() * 20),
      size: 3 + Math.random() * 3,
      delay: Math.random() * 0.05,
    }
  })

  return (
    <>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--color-sunny)",
            boxShadow: "0 0 4px var(--color-sunny)",
            pointerEvents: "none",
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 0 }}
          transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </>
  )
}

// ─── TiltCard ────────────────────────────────────────────
// 3D tilt on hover with lighting. (ReactBits: Tilted Card / Spotlight Card)

type TiltCardProps = {
  children: ReactNode
  className?: string
  tiltDeg?: number
}

export function TiltCard({ children, className, tiltDeg = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 })

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltDeg, -tiltDeg]), {
    stiffness: 300,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltDeg, tiltDeg]), {
    stiffness: 300,
    damping: 20,
  })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || reduce) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
    setSpotPos({ x: (px + 0.5) * 100, y: (py + 0.5) * 100 })
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    setSpotPos({ x: 50, y: 50 })
  }

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,205,60,0.15) 0%, transparent 60%)`,
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  )
}

// ─── AnimatedList ────────────────────────────────────────
// Items stagger in one by one. (ReactBits: Animated List)

type AnimatedListProps = {
  children: ReactNode[]
  className?: string
  stagger?: number
  inView?: boolean
}

export function AnimatedList({ children, className, stagger = 0.08, inView = true }: AnimatedListProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(!inView)

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
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) =>
        reduce || !started ? (
          <div key={i}>{child}</div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: i * stagger, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        ),
      )}
    </div>
  )
}

// ─── GradientText ────────────────────────────────────────
// Animated flowing gradient on text. (ReactBits: Gradient Text)

type GradientTextProps = {
  children: string
  className?: string
  colors?: string[]
  duration?: number
}

export function GradientText({
  children,
  className,
  colors = ["#5fa83a", "#ffcd3c", "#9fd8f5", "#b97a3d", "#5fa83a"],
  duration = 4,
}: GradientTextProps) {
  const reduce = useReducedMotion()
  const gradient = colors.join(", ")

  if (reduce) return <span className={className}>{children}</span>

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradient})`,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}

// ─── StarBorder ──────────────────────────────────────────
// Animated border with a rotating highlight. (ReactBits: Star Border)

export function StarBorder({
  children,
  className,
  color = "var(--color-sunny)",
}: {
  children: ReactNode
  className?: string
  color?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", borderRadius: "inherit" }}>
      {!reduce && (
        <motion.div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "inherit",
            background: `conic-gradient(from 0deg, transparent 0%, ${color} 10%, transparent 20%)`,
            zIndex: 0,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "inherit",
          background: "var(--color-paper)",
          margin: 2,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── SplitText ───────────────────────────────────────────
// Words fly in from different directions on scroll. (ReactBits: Split Text)

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
}

export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) return <span className={className}>{text}</span>

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 30, rotateX: -60 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
            type: "spring",
            bounce: 0.35,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ─── DecryptedText ───────────────────────────────────────
// Text scrambles through random characters before resolving. (ReactBits: Decrypted Text)

type DecryptedTextProps = {
  text: string
  className?: string
  speed?: number
  inView?: boolean
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function DecryptedText({ text, className, speed = 40, inView = true }: DecryptedTextProps) {
  const [display, setDisplay] = useState(text.replace(/\S/g, " "))
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
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  useEffect(() => {
    if (!started) return
    if (reduce) {
      setDisplay(text)
      return
    }

    let revealed = 0
    const interval = setInterval(() => {
      revealed++
      if (revealed > text.length) {
        clearInterval(interval)
        setDisplay(text)
        return
      }
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < revealed) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(""),
      )
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed, reduce])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  )
}
