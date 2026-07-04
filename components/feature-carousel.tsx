
"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarClock,
  Coffee,
  HeartHandshake,
  MapPinned,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    id: "coffee-time",
    label: "Coffee Time",
    icon: Coffee,
    image: "/images/dashboard-preview.png",
    description: "Send a warm invite for coffee, tea, or a calm study table nearby.",
    meta: "Cafe Atlas - 17:30",
  },
  {
    id: "nearby-friends",
    label: "Nearby Friends",
    icon: UsersRound,
    image: "/images/product-ui.jpeg",
    description: "Meet people around you by vibe, interests, and simple social energy.",
    meta: "1.2 km around you",
  },
  {
    id: "safe-meetup",
    label: "Safe Meetup",
    icon: ShieldCheck,
    image: "/images/new-product-ui.jpeg",
    description: "Public-place plans, soft reminders, blocking, reporting, and check-ins.",
    meta: "Public cafe default",
  },
  {
    id: "friend-map",
    label: "Friend Map",
    icon: MapPinned,
    image: "/images/mcp-connectivity.png",
    description: "Share live location only with trusted friends, only when you choose.",
    meta: "Temporary sharing",
  },
  {
    id: "plan-route",
    label: "Soft Route",
    icon: Route,
    image: "/images/realtime-coding-previews.png",
    description: "See the place, time, route, and friend details before you say yes.",
    meta: "Arrive with confidence",
  },
  {
    id: "circles",
    label: "Friend Circles",
    icon: HeartHandshake,
    image: "/images/parallel-coding-agents.png",
    description: "Create study crews, walking groups, language tables, and weekend rituals.",
    meta: "Small groups, big warmth",
  },
  {
    id: "chat",
    label: "Kind Chat",
    icon: MessageCircle,
    image: "/images/ai-code-reviews.png",
    description: "Start with simple prompts that make the first hello feel less awkward.",
    meta: "Coffee invite prompts",
  },
  {
    id: "moments",
    label: "Cafe Moments",
    icon: CalendarClock,
    image: "/images/deployment-easy.png",
    description: "Turn matches into real plans with dates, cafe choices, and reminders.",
    meta: "Today, tomorrow, weekend",
  },
  {
    id: "magic",
    label: "Soft Magic",
    icon: Sparkles,
    image: "/images/one-click-integrations.png",
    description: "SOHABI keeps the flow gentle: match, chat, invite, meet, remember.",
    meta: "No pressure, just people",
  },
]

const AUTO_PLAY_INTERVAL = 3200
const ITEM_HEIGHT = 66

const wrap = (min: number, max: number, value: number) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export function FeatureCarousel() {
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length
    if (diff > 0) setStep((prev) => prev + diff)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused, nextStep])

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex
    const len = FEATURES.length
    let normalizedDiff = diff

    if (diff > len / 2) normalizedDiff -= len
    if (diff < -len / 2) normalizedDiff += len

    if (normalizedDiff === 0) return "active"
    if (normalizedDiff === -1) return "prev"
    if (normalizedDiff === 1) return "next"
    return "hidden"
  }

  return (
    <div className="w-full max-w-7xl mx-auto z-10 px-0 md:px-4">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[660px] lg:aspect-video border border-border bg-card shadow-[0_24px_80px_hsl(var(--foreground)/0.10)]">
        <div className="relative z-30 w-full lg:w-[40%] min-h-[350px] md:min-h-[430px] lg:h-full flex flex-col items-start justify-center overflow-hidden px-7 md:px-12 lg:px-14 bg-secondary text-foreground">
          <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_15%,hsl(var(--card))_0%,transparent_30%),radial-gradient(circle_at_80%_85%,hsl(var(--accent))_0%,transparent_34%)]" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background-warm via-background-warm/90 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background-warm via-background-warm/90 to-transparent z-40" />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex
              const distance = index - currentIndex
              const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, distance)
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: Math.max(0.14, 1 - Math.abs(wrappedDistance) * 0.22),
                  }}
                  transition={{ type: "spring", stiffness: 92, damping: 23, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-5 md:px-8 py-3.5 md:py-4 rounded-full transition-all duration-500 text-left border backdrop-blur-sm",
                      isActive
                        ? "bg-foreground text-background border-foreground shadow-[0_12px_40px_hsl(var(--foreground)/0.18)]"
                        : "bg-card/65 text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-background" : "text-muted-foreground")} />
                    <span className="font-medium text-xs md:text-[15px] tracking-[0.08em] whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[560px] md:min-h-[660px] lg:h-full relative bg-[linear-gradient(135deg,hsl(var(--background-warm))_0%,hsl(var(--background))_45%,hsl(var(--accent))_100%)] flex flex-col items-center justify-center gap-8 py-12 md:py-16 lg:py-14 px-6 md:px-12 overflow-hidden border-t lg:border-t-0 lg:border-l border-border">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--card))_0%,transparent_24%),radial-gradient(circle_at_78%_74%,hsl(var(--primary-light))_0%,transparent_32%)]" />
          <div className="relative z-30 rounded-full border border-border bg-card/80 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground shadow-sm backdrop-blur-md">
            SOHABI features
          </div>

          <div className="relative z-20 w-full max-w-[420px] md:max-w-[440px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index)
              const isActive = status === "active"
              const isPrev = status === "prev"
              const isNext = status === "next"
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -88 : isNext ? 88 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.84 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.8 }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.75rem] overflow-hidden border-[10px] border-card bg-card origin-center shadow-[0_18px_70px_hsl(var(--foreground)/0.18)]"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "grayscale-0 blur-0 opacity-100" : "grayscale blur-[2px] opacity-65"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground-deep/95 via-foreground-deep/42 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 pt-32 flex flex-col justify-end pointer-events-none">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.28 }}
                        >
                          <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-background/35 bg-background px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground shadow-lg">
                            <Icon className="h-3.5 w-3.5" />
                            {index + 1} - {feature.label}
                          </div>
                          <p className="text-background font-medium text-xl md:text-2xl leading-tight tracking-tight drop-shadow-md">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className={cn("absolute top-7 left-7 flex items-center gap-3 transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}>
                    <div className="h-2.5 w-2.5 rounded-full bg-background shadow-[0_0_12px_hsl(var(--background)/0.9)]" />
                    <span className="text-background/85 text-[10px] font-medium uppercase tracking-[0.28em]">
                      {feature.meta}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCarousel
