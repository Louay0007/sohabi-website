"use client"

import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

const footerGroups = [
  {
    title: "App",
    links: ["How it works", "Plans", "Cafe mode", "Friend map", "Coffee invites"],
  },
  {
    title: "Stories",
    links: ["About SOHABI", "Safety promise", "Ambassadors", "Cafes", "Contact"],
  },
  {
    title: "Help",
    links: ["Terms", "Privacy", "Guides", "Stories", "Support"],
  },
]

export function FooterSection() {
  return (
    <footer className="w-full px-0 pb-0">
      <div className="relative overflow-hidden border-y border-border bg-card shadow-[0_24px_80px_hsl(var(--foreground)/0.08)]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-background blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-accent/70 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[0.9fr_1.4fr] lg:px-16 lg:py-16">
          <div className="flex flex-col items-start gap-7 rounded-[1.5rem] border border-border/70 bg-secondary/75 p-6 md:rounded-[2rem] md:p-8 lg:min-h-[420px]">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-border bg-card shadow-[0_18px_45px_hsl(var(--foreground)/0.10)] md:h-40 md:w-40">
              <Image
                src="/sohabi-icon.png"
                alt="SOHABI icon"
                width={220}
                height={220}
                className="h-32 w-32 rounded-[28px] object-contain md:h-40 md:w-40"
                priority={false}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">SOHABI</p>
              <h2 className="max-w-[440px] text-4xl font-medium leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
                Friends, coffee, nearby moments.
              </h2>
              <p className="max-w-[360px] text-sm leading-6 text-foreground/75 md:text-base">
                A warmer way to turn nearby hellos into safe plans, familiar cafes, and friendships that keep meeting.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 py-1">
            <div className="max-w-[760px] space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Meet gently</p>
              <p className="text-3xl font-normal leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
                Built for people who want real company without pressure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16 lg:gap-24">
              {footerGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-4">
                  <h3 className="text-sm font-medium text-muted-foreground">{group.title}</h3>
                  <div className="flex flex-col gap-3">
                    {group.links.map((link) => (
                      <a key={link} href="#" className="text-sm font-normal leading-5 text-foreground/85 transition-colors hover:text-foreground hover:underline">
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-border/70">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-5 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
            <p>© 2026 SOHABI. Made for small plans and real friends.</p>
            <p>Start with coffee. Stay for community.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
