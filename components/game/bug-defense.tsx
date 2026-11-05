"use client"

// Bug Defense — a small lane-defense mini-game.
// Plant skills on the lawn to stop bugs from reaching the PROD server.
// Pure React + SVG sprites; one requestAnimationFrame loop drives a mutable
// game-state ref and bumps a counter to re-render.

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw, ChevronsDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Plant, PLANT_INFO, type PlantKind } from "@/components/sprites/plants"
import { Bug, BUG_INFO, type BugKind } from "@/components/sprites/bugs"
import { Bean, SeedShot, Server } from "@/components/sprites/props"

const ROWS = 4
const COLS = 7
const MAX_LIVES = 3
const START_BEANS = 150

type CardSpec = { kind: PlantKind; cost: number; recharge: number; hp: number; fireEvery?: number }
const CARDS: CardSpec[] = [
  { kind: "coffee", cost: 50, recharge: 4, hp: 6 },
  { kind: "swift", cost: 100, recharge: 4, hp: 6, fireEvery: 1.4 },
  { kind: "pod", cost: 50, recharge: 12, hp: 36 },
  { kind: "thorn", cost: 150, recharge: 8, hp: 6, fireEvery: 0.7 },
]
const CARD = Object.fromEntries(CARDS.map((c) => [c.kind, c])) as Record<PlantKind, CardSpec>

// [time in seconds, bug kind]
const SCRIPT: [number, BugKind][] = [
  [12, "null"], [20, "null"], [27, "null"], [33, "crash"], [38, "null"],
  [43, "null"], [47, "crash"], [51, "leak"], [55, "null"], [58, "crash"],
  [60, "null"], [62, "null"], [64, "crash"], [66, "leak"], [68, "null"],
]

type PlantE = { id: number; kind: PlantKind; r: number; c: number; hp: number; cd: number; fireTick: number; alt: boolean }
type BugE = { id: number; kind: BugKind; r: number; x: number; hp: number; eating: boolean; hitTick: number }
type ShotE = { id: number; kind: "seed" | "needle"; r: number; x: number; y: number }
type Floater = { id: number; r: number; c: number; text: string; born: number }
type Status = "ready" | "playing" | "paused" | "won" | "lost"

type State = {
  t: number
  beans: number
  lives: number
  plants: Map<string, PlantE>
  bugs: BugE[]
  shots: ShotE[]
  floaters: Floater[]
  spawned: number
  squashed: number
  nextPassive: number
  recharge: Record<PlantKind, number>
  shake: number
}

let uid = 1
const newState = (): State => ({
  t: 0,
  beans: START_BEANS,
  lives: MAX_LIVES,
  plants: new Map(),
  bugs: [],
  shots: [],
  floaters: [],
  spawned: 0,
  squashed: 0,
  nextPassive: 5,
  recharge: { coffee: 0, swift: 0, pod: 0, thorn: 0 },
  shake: 0,
})

export function BugDefense({ onSkip }: { onSkip: () => void }) {
  const g = useRef<State>(newState())
  const [status, setStatus] = useState<Status>("ready")
  const statusRef = useRef<Status>("ready")
  const [, setFrame] = useState(0)
  const [selected, setSelected] = useState<PlantKind | null>("swift")
  const [toast, setToast] = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const setStat = useCallback((s: Status) => {
    statusRef.current = s
    setStatus(s)
  }, [])

  // ---------- game loop ----------
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      if (statusRef.current === "playing") {
        step(g.current, dt)
        const s = g.current
        if (s.lives <= 0) setStat("lost")
        else if (s.spawned >= SCRIPT.length && s.bugs.length === 0) setStat("won")
        setFrame((f) => (f + 1) % 1_000_000)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [setStat])

  // Auto-pause when the board scrolls out of view.
  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && statusRef.current === "playing") setStat("paused")
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [setStat])

  const start = () => {
    g.current = newState()
    setSelected("coffee")
    setStat("playing")
  }

  const flash = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 1400)
  }

  const plantAt = (r: number, c: number) => {
    if (statusRef.current !== "playing") return
    const s = g.current
    if (!selected) return flash("Pick a skill from the tray first")
    if (s.plants.has(`${r}-${c}`)) return flash("That tile is taken")
    const spec = CARD[selected]
    if (s.beans < spec.cost) return flash("Not enough coffee beans")
    if (s.recharge[selected] > 0) return flash(`${PLANT_INFO[selected].name} is recharging`)
    s.beans -= spec.cost
    s.recharge[selected] = spec.recharge
    s.plants.set(`${r}-${c}`, { id: uid++, kind: selected, r, c, hp: spec.hp, cd: 0.6, fireTick: 0, alt: false })
    setFrame((f) => f + 1)
  }

  const s = g.current
  const progress = Math.min(1, s.spawned / SCRIPT.length)
  const finalWave = s.t > 56 && s.spawned < SCRIPT.length

  return (
    <div className="mx-auto w-full max-w-[860px]">
      {/* ---------- Tray + HUD ---------- */}
      <div className="signboard mb-3 grid grid-cols-[auto_1fr] items-stretch gap-2 p-2 pt-5 sm:flex sm:p-3 sm:pt-5">
        <div className="paper flex min-w-[72px] flex-col items-center justify-center px-2 py-1 sm:min-w-[84px]" aria-live="polite">
          <Bean className="h-6 w-6" />
          <span className="font-display text-xl leading-none">{Math.floor(s.beans)}</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">beans</span>
        </div>

        <div role="radiogroup" aria-label="Skill plants" className="col-span-2 row-start-2 grid grid-cols-4 gap-1.5 sm:flex sm:flex-1 sm:gap-2">
          {CARDS.map((card) => {
            const info = PLANT_INFO[card.kind]
            const rech = s.recharge[card.kind]
            const affordable = s.beans >= card.cost
            const isSel = selected === card.kind
            return (
              <button
                key={card.kind}
                role="radio"
                aria-checked={isSel}
                onClick={() => setSelected(card.kind)}
                title={`${info.name} — ${info.role}`}
                className={cn(
                  "relative flex w-full shrink-0 flex-col items-center overflow-hidden rounded-[10px] border-[3px] border-ink bg-paper px-1 pb-1 pt-0.5 transition-transform sm:w-[92px]",
                  isSel ? "-translate-y-1 bg-sunny shadow-[0_4px_0_0_var(--color-ink)]" : "hover:-translate-y-0.5",
                  status === "playing" && (!affordable || rech > 0) && "opacity-70",
                )}
              >
                <Plant kind={card.kind} className="h-11 w-11 sm:h-14 sm:w-14" idle={false} />
                <span className="w-full truncate text-center text-[10px] font-extrabold leading-tight sm:text-[11px]">{info.name}</span>
                <span className="mt-0.5 inline-flex items-center gap-0.5 text-xs font-black">
                  <Bean className="h-3 w-3" />
                  {card.cost}
                </span>
                {status === "playing" && rech > 0 && (
                  <span
                    className="absolute inset-x-0 top-0 bg-ink/45"
                    style={{ height: `${(rech / card.recharge) * 100}%` }}
                    aria-hidden
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-2 sm:ml-auto sm:flex-col sm:justify-center">
          {status === "playing" || status === "paused" ? (
            <button
              className="btn-chunk btn-paper !px-3 !py-1.5 text-sm"
              onClick={() => setStat(status === "playing" ? "paused" : "playing")}
            >
              {status === "playing" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {status === "playing" ? "Pause" : "Resume"}
            </button>
          ) : null}
          <button className="btn-chunk btn-green !px-3 !py-1.5 text-sm" onClick={onSkip}>
            <ChevronsDown className="h-4 w-4" /> Skip
          </button>
        </div>
      </div>

      {/* wave progress */}
      <div className="mb-2 flex items-center justify-end gap-2 text-[11px] font-black">
        <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-2 py-0.5">
          <span>{finalWave ? "Final push!" : "Bug wave"}</span>
          <span className="relative h-2.5 w-20 overflow-hidden rounded-full border-2 border-ink bg-lawn-300 sm:w-28">
            <span className="absolute inset-y-0 left-0 bg-alert" style={{ width: `${progress * 100}%` }} />
          </span>
          <span>{s.squashed} squashed</span>
        </span>
      </div>

      {/* ---------- Board ---------- */}
      <div
        ref={boardRef}
        className={cn(
          "relative overflow-hidden rounded-[18px] border-4 border-ink bg-soil-500 shadow-[0_6px_0_0_var(--color-ink)]",
          s.shake > 0 && "translate-x-[2px]",
        )}
      >
        <div className="flex aspect-[7.9/4] min-h-[220px] w-full">
          {/* Server strip */}
          <div className="relative flex w-[11%] items-center justify-center border-r-4 border-ink bg-[#d7c7a8]">
            <Server lives={s.lives} maxLives={MAX_LIVES} className="h-[86%] w-auto" />
          </div>

          {/* Lawn */}
          <div className="relative flex-1">
            {/* cells */}
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}>
              {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const r = Math.floor(i / COLS)
                const c = i % COLS
                const occupied = s.plants.get(`${r}-${c}`)
                return (
                  <button
                    key={i}
                    onClick={() => plantAt(r, c)}
                    disabled={status !== "playing"}
                    aria-label={`Lane ${r + 1}, tile ${c + 1}, ${occupied ? PLANT_INFO[occupied.kind].name : "empty"}`}
                    className={cn(
                      "transition-colors",
                      (r + c) % 2 ? "bg-lawn-500" : "bg-[#69b142]",
                      status === "playing" && !occupied && "hover:bg-white/25 focus-visible:bg-white/25",
                    )}
                  />
                )
              })}
            </div>

            {/* plants */}
            {[...s.plants.values()].map((p) => (
              <div
                key={p.id}
                className="anim-pop pointer-events-none absolute"
                style={{ left: `${(p.c / COLS) * 100}%`, top: `${(p.r / ROWS) * 100}%`, width: `${100 / COLS}%`, height: `${100 / ROWS}%` }}
              >
                <Plant kind={p.kind} fireTick={p.fireTick} className="h-full w-full p-[6%]" />
                {p.hp < CARD[p.kind].hp && (
                  <span className="absolute bottom-[4%] left-[18%] right-[18%] h-1.5 overflow-hidden rounded-full border border-ink bg-white/70">
                    <span className="block h-full bg-lawn-600" style={{ width: `${(p.hp / CARD[p.kind].hp) * 100}%` }} />
                  </span>
                )}
              </div>
            ))}

            {/* bugs */}
            {s.bugs.map((b) => (
              <div
                key={b.id}
                className="pointer-events-none absolute z-10"
                style={{
                  left: `${(b.x / COLS) * 100}%`,
                  top: `${(b.r / ROWS) * 100}%`,
                  width: `${100 / COLS}%`,
                  height: `${100 / ROWS}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <Bug kind={b.kind} eating={b.eating} hitTick={b.hitTick} className="h-full w-full p-[4%]" />
              </div>
            ))}

            {/* shots */}
            {s.shots.map((sh) => (
              <div
                key={sh.id}
                className="pointer-events-none absolute z-20"
                style={{
                  left: `${(sh.x / COLS) * 100}%`,
                  top: `${((sh.r + sh.y) / ROWS) * 100}%`,
                  width: sh.kind === "seed" ? "3.2%" : "4.4%",
                  height: sh.kind === "seed" ? "6.5%" : "3.5%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <SeedShot kind={sh.kind} />
              </div>
            ))}

            {/* floaters (+25 beans) */}
            {s.floaters.map((f) => (
              <span
                key={f.id}
                className="anim-float pointer-events-none absolute z-20 inline-flex items-center gap-0.5 rounded-full border-2 border-ink bg-paper px-1.5 text-xs font-black"
                style={{ left: `${((f.c + 0.3) / COLS) * 100}%`, top: `${((f.r + 0.15) / ROWS) * 100}%` }}
              >
                <Bean className="h-3 w-3" />
                {f.text}
              </span>
            ))}
          </div>
        </div>

        {/* toast */}
        {toast && (
          <div role="status" className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-extrabold">
            {toast}
          </div>
        )}

        {/* overlays */}
        {status !== "playing" && (
          <Overlay status={status} squashed={s.squashed} onStart={start} onResume={() => setStat("playing")} onSkip={onSkip} />
        )}
      </div>
      <p className="mt-2 text-center text-xs font-bold text-ink-soft">
        Pick a skill in the tray, then tap a lawn tile to plant it. Coffee Bushes brew extra beans.
      </p>
    </div>
  )
}

function Overlay({
  status,
  squashed,
  onStart,
  onResume,
  onSkip,
}: {
  status: Status
  squashed: number
  onStart: () => void
  onResume: () => void
  onSkip: () => void
}) {
  const content = {
    ready: {
      title: "Defend Production!",
      body: "Bugs are crawling toward the PROD server. Plant skills on the lawn to squash them before they ship.",
      primary: { label: "Start defending", icon: <Play className="h-5 w-5" />, on: onStart },
    },
    paused: {
      title: "Paused",
      body: "The bugs are waiting. Take your time.",
      primary: { label: "Resume", icon: <Play className="h-5 w-5" />, on: onResume },
    },
    won: {
      title: "Production is safe!",
      body: `You squashed ${squashed} bugs. That's the job, every day. Want to see the real projects?`,
      primary: { label: "Play again", icon: <RotateCcw className="h-5 w-5" />, on: onStart },
    },
    lost: {
      title: "Bugs reached PROD",
      body: `Hotfix time. You squashed ${squashed} bugs. Try more Coffee Bushes early on.`,
      primary: { label: "Try again", icon: <RotateCcw className="h-5 w-5" />, on: onStart },
    },
    playing: null,
  }[status]
  if (!content) return null
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink/35 p-3 backdrop-blur-[2px]">
      <div className="paper anim-pop max-w-md p-4 text-center sm:p-6" role="dialog" aria-label={content.title}>
        {status === "ready" && (
          <div className="mb-2 flex items-end justify-center gap-1">
            {(["coffee", "swift", "pod", "thorn"] as PlantKind[]).map((k) => (
              <Plant key={k} kind={k} className="h-12 w-12 sm:h-14 sm:w-14" />
            ))}
            <span className="mx-1 font-display text-lg">vs</span>
            <Bug kind="null" className="h-12 w-12 sm:h-14 sm:w-14" />
          </div>
        )}
        <h3 className="font-display text-2xl sm:text-3xl">{content.title}</h3>
        <p className="mt-1 text-sm font-semibold text-ink-soft sm:text-base">{content.body}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="btn-chunk" onClick={content.primary.on} autoFocus>
            {content.primary.icon}
            {content.primary.label}
          </button>
          <button className="btn-chunk btn-green" onClick={onSkip}>
            <ChevronsDown className="h-5 w-5" />
            {status === "won" ? "See projects" : "Skip to portfolio"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- simulation ----------
function step(s: State, dt: number) {
  s.t += dt
  if (s.shake > 0) s.shake -= dt

  // passive bean income
  if (s.t >= s.nextPassive) {
    s.beans += 25
    s.nextPassive += 5
  }
  for (const k of Object.keys(s.recharge) as PlantKind[]) s.recharge[k] = Math.max(0, s.recharge[k] - dt)

  // spawn
  while (s.spawned < SCRIPT.length && SCRIPT[s.spawned][0] <= s.t) {
    const kind = SCRIPT[s.spawned][1]
    s.bugs.push({ id: uid++, kind, r: Math.floor(Math.random() * ROWS), x: COLS + 0.4, hp: BUG_INFO[kind].hp, eating: false, hitTick: 0 })
    s.spawned++
  }

  // plants act
  for (const p of s.plants.values()) {
    p.cd -= dt
    if (p.kind === "coffee") {
      if (p.cd <= 0) {
        if (p.fireTick > 0) {
          s.beans += 25
          s.floaters.push({ id: uid++, r: p.r, c: p.c, text: "+25", born: s.t })
        }
        p.fireTick++
        p.cd = 8
      }
      continue
    }
    const spec = CARD[p.kind]
    if (!spec.fireEvery) continue
    const target = s.bugs.some((b) => b.r === p.r && b.x > p.c + 0.4 && b.x < COLS + 0.2)
    if (target && p.cd <= 0) {
      p.cd = spec.fireEvery
      p.fireTick++
      if (p.kind === "swift") s.shots.push({ id: uid++, kind: "seed", r: p.r, x: p.c + 0.92, y: 0.44 })
      else {
        p.alt = !p.alt
        s.shots.push({ id: uid++, kind: "needle", r: p.r, x: p.c + 0.92, y: p.alt ? 0.58 : 0.72 })
      }
    }
  }

  // shots move + hit
  for (const sh of s.shots) {
    sh.x += (sh.kind === "seed" ? 5 : 7) * dt
    const hit = s.bugs.find((b) => b.r === sh.r && Math.abs(b.x - sh.x) < 0.32 && b.hp > 0)
    if (hit) {
      hit.hp -= 1
      hit.hitTick++
      sh.x = 99
    }
  }
  s.shots = s.shots.filter((sh) => sh.x < COLS + 0.6)

  // bugs move / eat
  for (const b of s.bugs) {
    if (b.hp <= 0) continue
    let eating: PlantE | undefined
    for (const p of s.plants.values()) {
      if (p.r === b.r && b.x <= p.c + 1.05 && b.x >= p.c + 0.3) {
        eating = p
        break
      }
    }
    b.eating = !!eating
    if (eating) {
      eating.hp -= 1.6 * dt
      if (eating.hp <= 0) s.plants.delete(`${eating.r}-${eating.c}`)
    } else {
      b.x -= BUG_INFO[b.kind].speed * dt
    }
    if (b.x < -0.3) {
      b.hp = -999
      s.lives -= 1
      s.shake = 0.3
    }
  }
  s.bugs = s.bugs.filter((b) => {
    if (b.hp <= 0 && b.hp > -999) s.squashed++
    return b.hp > 0
  })

  s.floaters = s.floaters.filter((f) => s.t - f.born < 0.9)
}
