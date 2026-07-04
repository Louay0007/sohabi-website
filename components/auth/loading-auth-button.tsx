"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LoadingAuthButton({ children }: { children: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")

  useEffect(() => {
    if (state === "loading") {
      const timer = window.setTimeout(() => setState("done"), 650)
      return () => window.clearTimeout(timer)
    }

    if (state === "done") {
      const timer = window.setTimeout(() => setState("idle"), 900)
      return () => window.clearTimeout(timer)
    }
  }, [state])

  return (
    <Button
      type="button"
      disabled={state === "loading"}
      onClick={() => setState("loading")}
      className={cn(
        "h-14 w-full overflow-hidden rounded-[1.35rem] text-base shadow-sm transition-[transform,opacity,background-color] duration-150 active:scale-[0.985]",
        state === "done" && "bg-primary/90"
      )}
    >
      <span className="relative flex h-5 items-center justify-center">
        <span className={cn("flex items-center gap-2 transition-all duration-200", state === "idle" ? "translate-y-0 opacity-100 blur-0" : "-translate-y-2 opacity-0 blur-sm")}>
          {children}
        </span>
        <span className={cn("absolute flex items-center gap-2 transition-all duration-200", state === "loading" ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm")}>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading
        </span>
        <span className={cn("absolute flex items-center gap-2 transition-all duration-200", state === "done" ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-sm")}>
          <Check className="h-4 w-4" />
          Ready
        </span>
      </span>
    </Button>
  )
}
