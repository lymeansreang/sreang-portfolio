// Original "Bug" enemy sprites. 100×100, facing left (toward Production).
import { cn } from "@/lib/utils"

export type BugKind = "null" | "crash" | "leak"

export const BUG_INFO: Record<BugKind, { name: string; hp: number; speed: number; color: string }> = {
  // speed in lawn columns per second
  null: { name: "Null Bug", hp: 5, speed: 0.32, color: "#8a9a5b" },
  crash: { name: "Crash Beetle", hp: 11, speed: 0.26, color: "#d9452b" },
  leak: { name: "Memory Leak", hp: 18, speed: 0.17, color: "#6d4aa8" },
}

const INK = "#2b1a0e"

type Props = {
  kind: BugKind
  className?: string
  eating?: boolean
  hitTick?: number
  walking?: boolean
}

export function Bug({ kind, className, eating, hitTick, walking = true }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={cn("overflow-visible", className)} aria-hidden>
      <ellipse cx="52" cy="95" rx="30" ry="5" fill="rgb(0 0 0 / 0.2)" />
      <g key={hitTick} className={hitTick ? "anim-hit" : undefined}>
        <g className={eating ? "anim-chomp" : walking ? "anim-bob" : undefined}>
          {kind === "leak" ? <Leak /> : <Beetle kind={kind} walking={walking && !eating} />}
        </g>
      </g>
    </svg>
  )
}

function Beetle({ kind, walking }: { kind: "null" | "crash"; walking: boolean }) {
  const shell = kind === "crash" ? "#d9452b" : "#8a9a5b"
  const shellDark = kind === "crash" ? "#9c2a16" : "#5f6b3a"
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* legs */}
      {[34, 52, 70].map((x, i) => (
        <g key={x}>
          <path className={i % 2 ? "anim-legs" : "anim-legs-alt"} style={walking ? undefined : { animation: "none" }} d={`M${x} 80 L${x - 6} 94`} stroke={INK} strokeWidth="4" />
        </g>
      ))}
      {/* shell */}
      <path d="M28 82 C22 54, 44 38, 64 40 C84 42, 92 62, 86 82Z" fill={shell} stroke={INK} strokeWidth="3.5" />
      <path d="M58 41 L56 82" stroke={shellDark} strokeWidth="3" />
      <path d="M40 54 C46 48, 54 46, 60 47" stroke="rgb(255 255 255 / 0.45)" strokeWidth="3" fill="none" />
      {kind === "null" ? (
        // ∅ mark
        <g stroke={INK} strokeWidth="3" fill="none">
          <circle cx="72" cy="62" r="7" />
          <path d="M65 71 L79 53" />
        </g>
      ) : (
        <>
          {/* crack + armor rivets */}
          <path d="M70 46 L66 56 L74 60 L68 72" stroke={INK} strokeWidth="2.5" fill="none" />
          <circle cx="44" cy="70" r="2.5" fill="#ffcd3c" stroke={INK} strokeWidth="1.5" />
          <circle cx="78" cy="74" r="2.5" fill="#ffcd3c" stroke={INK} strokeWidth="1.5" />
        </>
      )}
      {/* head */}
      <circle cx="24" cy="66" r="15" fill="#3a2a40" stroke={INK} strokeWidth="3" />
      {/* antennae */}
      <path d="M22 52 C18 40, 10 36, 6 38" stroke={INK} strokeWidth="3" fill="none" />
      <path d="M28 52 C30 40, 26 32, 20 30" stroke={INK} strokeWidth="3" fill="none" />
      <circle cx="6" cy="38" r="3" fill="#ffcd3c" stroke={INK} strokeWidth="1.5" />
      <circle cx="20" cy="30" r="3" fill="#ffcd3c" stroke={INK} strokeWidth="1.5" />
      {/* angry eyes */}
      <circle cx="18" cy="64" r="4.5" fill="#fff" />
      <circle cx="29" cy="64" r="4.5" fill="#fff" />
      <circle cx="17" cy="65" r="2.2" fill={INK} />
      <circle cx="28" cy="65" r="2.2" fill={INK} />
      <path d="M13 58 L22 61 M34 58 L25 61" stroke={INK} strokeWidth="2.5" />
      {/* mandibles */}
      <path d="M12 74 L6 78 L12 80" stroke={INK} strokeWidth="2.5" fill="#fff7e3" />
    </g>
  )
}

function Leak() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M20 90 C10 90, 12 76, 20 70 C18 46, 40 30, 58 32 C80 34, 92 54, 88 76 C94 80, 92 92, 84 92Z"
        fill="#6d4aa8"
        stroke={INK}
        strokeWidth="3.5"
      />
      <path d="M36 46 C42 40, 52 38, 58 39" stroke="rgb(255 255 255 / 0.4)" strokeWidth="4" fill="none" />
      {/* drips */}
      <path d="M48 92 C48 98, 54 98, 54 92" fill="#6d4aa8" stroke={INK} strokeWidth="2.5" />
      <path d="M70 92 C70 99, 76 99, 76 92" fill="#6d4aa8" stroke={INK} strokeWidth="2.5" />
      {/* bytes floating inside */}
      <text x="56" y="70" fontSize="11" fontWeight="900" fill="#c9b6ee" fontFamily="monospace">01</text>
      <text x="66" y="58" fontSize="9" fontWeight="900" fill="#c9b6ee" fontFamily="monospace">10</text>
      <circle cx="30" cy="58" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="44" cy="56" r="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="29" cy="59" r="2.8" fill={INK} />
      <circle cx="43" cy="57" r="2.8" fill={INK} />
      <path d="M26 74 Q34 68 44 74" stroke={INK} strokeWidth="2.5" fill="none" />
    </g>
  )
}
