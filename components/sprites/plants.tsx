// Original "Skill Plant" sprites for Bug Defense.
// Each is a 100×100 SVG standing on y≈96 and facing right (toward incoming bugs).
import { cn } from "@/lib/utils"

export type PlantKind = "swift" | "thorn" | "pod" | "coffee"

export const PLANT_INFO: Record<PlantKind, { name: string; skill: string; role: string }> = {
  swift: { name: "Swift Spitter", skill: "Swift / iOS", role: "Fires seeds down its lane" },
  thorn: { name: "Type Thorn", skill: "TypeScript", role: "Rapid twin needles" },
  pod: { name: "Docker Pod", skill: "Docker", role: "Tough wall that holds the line" },
  coffee: { name: "Coffee Bush", skill: "Caffeine", role: "Brews extra coffee beans" },
}

const INK = "#2b1a0e"

type Props = {
  kind: PlantKind
  className?: string
  /** play the idle sway */
  idle?: boolean
  /** change this number to replay the fire/recoil animation */
  fireTick?: number
  title?: string
}

export function Plant({ kind, className, idle = true, fireTick, title }: Props) {
  const Body = BODIES[kind]
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* ground shadow */}
      <ellipse cx="50" cy="95" rx="26" ry="5" fill="rgb(0 0 0 / 0.18)" />
      <g className={idle ? "anim-sway" : undefined}>
        <g key={fireTick} className={fireTick ? "anim-recoil" : undefined}>
          <Body />
        </g>
      </g>
    </svg>
  )
}

function Eye({ x, y, r = 5, look = 1.5 }: { x: number; y: number; r?: number; look?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.15} fill="#fff" stroke={INK} strokeWidth="2" />
      <g className="anim-blink">
        <circle cx={x + look} cy={y + 0.5} r={r * 0.5} fill={INK} />
        <circle cx={x + look + 1} cy={y - 1} r={r * 0.17} fill="#fff" />
      </g>
    </g>
  )
}

function Stem({ h = 40 }: { h?: number }) {
  return (
    <>
      <path d={`M50 96 C48 ${96 - h / 2}, 53 ${96 - h * 0.7}, 50 ${96 - h}`} stroke={INK} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d={`M50 96 C48 ${96 - h / 2}, 53 ${96 - h * 0.7}, 50 ${96 - h}`} stroke="#4a8f2c" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M49 86 C34 80, 26 86, 22 94 C33 96, 43 93, 49 86Z" fill="#7cc04a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M51 82 C64 74, 74 78, 80 88 C68 92, 58 90, 51 82Z" fill="#5fa83a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  )
}

/** Swift Spitter — a bird-of-paradise flower whose crest launches seeds. */
function SwiftBody() {
  return (
    <g strokeLinejoin="round">
      <Stem h={44} />
      {/* back crest petals */}
      <path d="M38 50 L20 22 L44 40Z" fill="#ffb02e" stroke={INK} strokeWidth="2.5" />
      <path d="M44 46 L34 14 L52 38Z" fill="#ff7a1a" stroke={INK} strokeWidth="2.5" />
      <path d="M50 44 L52 12 L60 40Z" fill="#ffcd3c" stroke={INK} strokeWidth="2.5" />
      {/* head bract (beak) pointing right */}
      <path d="M30 56 C32 42, 52 36, 70 42 L94 50 L70 58 C54 66, 34 66, 30 56Z" fill="#e8622c" stroke={INK} strokeWidth="3" />
      <path d="M70 42 L94 50 L70 50Z" fill="#ff9a3d" />
      <path d="M34 58 C46 62, 60 60, 70 55" stroke="#b8441a" strokeWidth="2" fill="none" />
      <Eye x={52} y={47} r={5.5} />
      {/* cheek */}
      <ellipse cx="42" cy="54" rx="4" ry="2.5" fill="#ff9aa2" opacity="0.8" />
    </g>
  )
}

/** Type Thorn — an agave rosette with twin needle thorns. */
function ThornBody() {
  return (
    <g strokeLinejoin="round">
      <path d="M50 94 L16 60 L40 82Z" fill="#2f7f86" stroke={INK} strokeWidth="2.5" />
      <path d="M50 94 L86 64 L62 84Z" fill="#2f7f86" stroke={INK} strokeWidth="2.5" />
      <path d="M50 94 L24 40 L46 76Z" fill="#3fa1a8" stroke={INK} strokeWidth="2.5" />
      <path d="M50 94 L78 38 L58 76Z" fill="#3fa1a8" stroke={INK} strokeWidth="2.5" />
      {/* body */}
      <path d="M28 86 C24 62, 36 46, 50 46 C64 46, 76 62, 72 86 C62 94, 38 94, 28 86Z" fill="#5cc3c4" stroke={INK} strokeWidth="3" />
      <path d="M36 84 C34 68, 42 58, 50 56" stroke="#9ae3df" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* twin thorns pointing right */}
      <path d="M68 60 L92 56 L70 66Z" fill="#fff7e3" stroke={INK} strokeWidth="2.5" />
      <path d="M70 72 L94 72 L70 78Z" fill="#fff7e3" stroke={INK} strokeWidth="2.5" />
      <Eye x={46} y={66} r={4.5} />
      <Eye x={58} y={66} r={4.5} />
      <path d="M47 77 Q52 80 57 77" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  )
}

/** Docker Pod — a ribbed, container-shaped seed pod that blocks bugs. */
function PodBody() {
  return (
    <g strokeLinejoin="round">
      <path d="M22 94 C18 86, 26 82, 34 86Z" fill="#5fa83a" stroke={INK} strokeWidth="2.5" />
      <path d="M78 94 C82 86, 74 82, 66 86Z" fill="#5fa83a" stroke={INK} strokeWidth="2.5" />
      <rect x="18" y="30" width="64" height="62" rx="16" fill="#3d8fd1" stroke={INK} strokeWidth="3.5" />
      {/* container ribs */}
      {[36, 46, 56, 66].map((x) => (
        <line key={x} x1={x} y1="36" x2={x} y2="86" stroke="#2a6fa8" strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="18" y="30" width="64" height="62" rx="16" fill="none" stroke={INK} strokeWidth="3.5" />
      <path d="M26 38 C30 33, 40 33, 44 34" stroke="#9fd0f5" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* face plate */}
      <rect x="28" y="52" width="44" height="26" rx="10" fill="#e6f6fd" stroke={INK} strokeWidth="2.5" />
      <Eye x={42} y={63} r={4.2} />
      <Eye x={58} y={63} r={4.2} />
      <path d="M44 72 L56 72" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* sprout on top */}
      <path d="M50 30 C50 22, 54 18, 60 18 C60 24, 56 28, 50 30Z" fill="#7cc04a" stroke={INK} strokeWidth="2.5" />
    </g>
  )
}

/** Coffee Bush — a leafy bush with ripe coffee cherries. */
function CoffeeBody() {
  return (
    <g strokeLinejoin="round">
      <path d="M50 96 L50 70" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d="M50 96 L50 70" stroke="#7a4a1f" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M20 66 C12 52, 24 36, 36 40 C38 26, 60 22, 66 36 C80 32, 92 48, 82 62 C88 74, 74 84, 62 78 C54 86, 36 86, 32 78 C18 82, 10 72, 20 66Z"
        fill="#3f8a2a"
        stroke={INK}
        strokeWidth="3"
      />
      <path d="M30 52 C36 46, 44 46, 48 50" stroke="#7cc04a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M58 44 C64 42, 70 44, 72 50" stroke="#7cc04a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        [28, 66],
        [72, 64],
        [62, 72],
        [36, 74],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="5" fill="#c8321f" stroke={INK} strokeWidth="2" />
          <circle cx={cx - 1.5} cy={cy - 1.5} r="1.3" fill="#ffd0c8" />
        </g>
      ))}
      <Eye x={44} y={58} r={4.5} />
      <Eye x={56} y={58} r={4.5} />
      <path d="M45 66 Q50 71 55 66" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  )
}

const BODIES: Record<PlantKind, () => React.JSX.Element> = {
  swift: SwiftBody,
  thorn: ThornBody,
  pod: PodBody,
  coffee: CoffeeBody,
}
