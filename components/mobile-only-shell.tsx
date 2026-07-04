import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

export function MobileOnlyShell({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: ReactNode
  eyebrow?: string
  title: string
  subtitle: string
}) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <section className="relative flex min-h-dvh flex-col overflow-hidden md:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_4%,hsl(var(--card))_0%,transparent_34%),radial-gradient(circle_at_90%_92%,hsl(var(--accent))_0%,transparent_36%)]" />
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-[-90px] h-80 w-80 rounded-full bg-accent/60 blur-3xl" />

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
          <div className="mb-5 flex h-5 items-center justify-center">
            <div className="h-1.5 w-16 rounded-full bg-foreground/10" />
          </div>
          <Link href="/" aria-label="Back to SOHABI home" className="mb-7 flex w-fit items-center gap-3 active:scale-[0.98] transition-transform duration-150">
            <Image
              src="/sohabi-icon.png"
              alt="SOHABI"
              width={72}
              height={72}
              priority
              className="h-12 w-12 rounded-[1.15rem] object-contain"
            />
            <span className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">SOHABI</span>
          </Link>

          <div className="mb-6 space-y-3">
            {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>}
            <h1 className="max-w-[330px] text-[2.55rem] font-medium leading-[0.92] tracking-[-0.055em] text-foreground">
              {title}
            </h1>
            <p className="max-w-[330px] text-base leading-6 text-foreground/72">{subtitle}</p>
          </div>

          <div className="rounded-[2.15rem] border border-border/80 bg-card/78 p-5 shadow-[0_30px_90px_hsl(var(--foreground)/0.10)] backdrop-blur-2xl ring-1 ring-white/5">
            {children}
          </div>
        </div>
      </section>

      <section className="hidden min-h-dvh items-center justify-center px-6 md:flex">
        <div className="max-w-md rounded-[2.25rem] border border-border bg-card/85 p-8 text-center shadow-[0_30px_90px_hsl(var(--foreground)/0.10)] backdrop-blur-2xl">
          <Image
            src="/sohabi-icon.png"
            alt="SOHABI"
            width={96}
            height={96}
            className="mx-auto mb-6 h-20 w-20 rounded-3xl object-contain"
          />
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Mobile only</p>
          <h2 className="mb-3 text-3xl font-medium tracking-[-0.04em] text-foreground">Open SOHABI on your phone.</h2>
          <p className="text-base leading-6 text-foreground/70">
            These app pages are designed for mobile users. The landing page is still available on desktop.
          </p>
          <Link href="/" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground active:scale-[0.98] transition-transform duration-150">
            Back to landing page
          </Link>
        </div>
      </section>
    </main>
  )
}
