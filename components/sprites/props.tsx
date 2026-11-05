// Scenery and UI sprites: coffee bean, seed shot, PROD server, mailbox, cloud.
import { cn } from "@/lib/utils"

const INK = "#2b1a0e"

export function Bean({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("inline-block", className)} aria-hidden>
      <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(25 12 12)" fill="#6b3e1f" stroke={INK} strokeWidth="2" />
      <path d="M8.5 5.5 C13 9, 11 15, 15.5 18.5" stroke="#e2b36b" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function SeedShot({ kind }: { kind: "seed" | "needle" }) {
  return kind === "seed" ? (
    <svg viewBox="0 0 20 20" className="h-full w-full" aria-hidden>
      <ellipse cx="10" cy="10" rx="7" ry="5.5" fill="#ffcd3c" stroke={INK} strokeWidth="2" />
      <ellipse cx="8" cy="8" rx="2" ry="1.2" fill="#fff" />
    </svg>
  ) : (
    <svg viewBox="0 0 30 10" className="h-full w-full" aria-hidden>
      <path d="M2 5 L26 2 L29 5 L26 8Z" fill="#fff7e3" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

/** The PROD server rack bugs are trying to reach. `lives` lights its LEDs. */
export function Server({ lives, maxLives = 3, className }: { lives: number; maxLives?: number; className?: string }) {
  return (
    <svg viewBox="0 0 60 160" className={cn("overflow-visible", className)} role="img" aria-label={`Production server, ${lives} of ${maxLives} health`}>
      <rect x="6" y="6" width="48" height="148" rx="8" fill="#4b5563" stroke={INK} strokeWidth="3.5" />
      {Array.from({ length: maxLives }).map((_, i) => {
        const y = 18 + i * 44
        const on = i < lives
        return (
          <g key={i}>
            <rect x="12" y={y} width="36" height="34" rx="4" fill="#1f2937" stroke={INK} strokeWidth="2" />
            {[0, 1, 2].map((r) => (
              <line key={r} x1="17" x2="34" y1={y + 9 + r * 8} y2={y + 9 + r * 8} stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <circle cx="41" cy={y + 10} r="3.5" fill={on ? "#7cc04a" : "#d9452b"} className={on ? "anim-led" : undefined} />
            <circle cx="41" cy={y + 22} r="3.5" fill={on ? "#ffcd3c" : "#4b5563"} />
          </g>
        )
      })}
      <rect x="14" y="146" width="32" height="10" rx="3" fill="#fff7e3" stroke={INK} strokeWidth="2" />
      <text x="30" y="154" textAnchor="middle" fontSize="8" fontWeight="900" fill={INK} fontFamily="system-ui">PROD</text>
    </svg>
  )
}

export function Mailbox({ flagUp, className }: { flagUp?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={cn("overflow-visible", className)} aria-hidden>
      <rect x="54" y="70" width="12" height="66" fill="#7a4a1f" stroke={INK} strokeWidth="3" />
      <path d="M14 70 L14 44 C14 22, 30 14, 46 14 L88 14 C104 14, 110 26, 110 44 L110 70Z" fill="#3d8fd1" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M46 14 C30 14, 14 22, 14 44 L14 70 L46 70Z" fill="#2a6fa8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="30" cy="44" rx="10" ry="16" fill="#1d4f7a" />
      <text x="78" y="50" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff7e3" fontFamily="system-ui">MAIL</text>
      {/* flag */}
      <g
        style={{
          transformOrigin: "100px 60px",
          transform: flagUp ? "rotate(0deg)" : "rotate(90deg)",
          transition: "transform 0.5s cubic-bezier(.3,1.6,.5,1)",
        }}
      >
        <rect x="97" y="22" width="6" height="40" fill="#c8321f" stroke={INK} strokeWidth="2.5" />
        <rect x="103" y="22" width="16" height="12" fill="#c8321f" stroke={INK} strokeWidth="2.5" />
      </g>
    </svg>
  )
}

export function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 50" className={className} style={style} aria-hidden>
      <path d="M20 44 C6 44, 6 26, 20 26 C20 12, 40 8, 48 18 C54 4, 80 4, 84 20 C98 14, 114 24, 106 36 C114 44, 104 46, 100 44Z" fill="#fff" stroke="#bfe4f6" strokeWidth="3" />
    </svg>
  )
}

/** Little grass tufts for section edges. */
export function GrassEdge({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 30"
      preserveAspectRatio="none"
      className={cn("block h-6 w-full", className)}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden
    >
      <path
        d="M0 30 L0 18 L10 6 L18 18 L28 4 L36 18 L48 8 L56 18 L66 2 L76 18 L88 8 L96 18 L108 4 L116 18 L128 8 L138 18 L150 2 L160 18 L172 6 L180 18 L192 4 L200 18 L212 8 L220 18 L232 2 L242 18 L254 6 L262 18 L274 4 L282 18 L294 8 L302 18 L314 2 L324 18 L336 6 L344 18 L356 4 L364 18 L376 8 L384 18 L396 4 L400 18 L400 30Z"
        fill="#5fa83a"
      />
    </svg>
  )
}
