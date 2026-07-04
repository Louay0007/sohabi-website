"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export function AuthTabs({ value, onChange }: { value: "email" | "phone"; onChange: (value: "email" | "phone") => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<"email" | "phone", HTMLButtonElement | null>>({ email: null, phone: null })
  const hasAnimatedRef = useRef(false)

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    const indicator = indicatorRef.current
    const activeButton = buttonRefs.current[value]

    if (!container || !indicator || !activeButton) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    const target = {
      x: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    }

    if (!hasAnimatedRef.current) {
      gsap.set(indicator, target)
      hasAnimatedRef.current = true
      return
    }

    gsap.to(indicator, {
      ...target,
      duration: 0.32,
      ease: "power3.out",
    })
  }, [value])

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-2 overflow-hidden rounded-[1.35rem] border border-border/80 bg-background/90 p-1 shadow-inner shadow-foreground/[0.03]"
    >
      <div
        ref={indicatorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1 h-11 rounded-[1rem] bg-primary shadow-sm will-change-transform"
      />
      {(["email", "phone"] as const).map((item) => (
        <button
          key={item}
          ref={(node) => {
            buttonRefs.current[item] = node
          }}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "relative z-10 h-11 rounded-[1rem] text-sm font-medium capitalize transition-[color,transform] duration-150 active:scale-[0.98]",
            value === item ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
