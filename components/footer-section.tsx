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
    <footer className="mx-auto w-full max-w-[1320px] px-5 pb-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background-white shadow-[0_24px_80px_rgba(47,49,42,0.08)] md:rounded-[3rem]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#F5F1E4] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-[#E0DBCE]/70 blur-3xl" />

        <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1.05fr_1.3fr] lg:p-14">
          <div className="flex flex-col items-start gap-7 rounded-[1.5rem] border border-border/70 bg-[#FBF5E8]/75 p-6 md:rounded-[2rem] md:p-8">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] border border-border bg-background-white shadow-[0_18px_45px_rgba(47,49,42,0.10)] md:h-48 md:w-48">
              <Image
                src="/sohabi-icon.png"
                alt="SOHABI icon"
                width={220}
                height={220}
                className="h-36 w-36 rounded-[30px] object-contain md:h-44 md:w-44"
                priority={false}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">SOHABI</p>
              <h2 className="max-w-[420px] text-3xl font-medium leading-tight tracking-[-0.04em] text-foreground md:text-5xl">
                Friends, coffee, nearby moments.
              </h2>
              <p className="max-w-[360px] text-sm leading-6 text-foreground/75 md:text-base">
                A warmer way to turn nearby hellos into safe plans, familiar cafes, and friendships that keep meeting.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-white text-muted transition-colors hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-white text-muted transition-colors hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-white text-muted transition-colors hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 py-1">
            <div className="max-w-[560px] space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Meet gently</p>
              <p className="text-2xl font-normal leading-snug tracking-[-0.03em] text-foreground md:text-4xl">
                Built for people who want real company without pressure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
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

        <div className="relative flex flex-col gap-3 border-t border-border/70 px-6 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p>© 2026 SOHABI. Made for small plans and real friends.</p>
          <p>Start with coffee. Stay for community.</p>
        </div>
      </div>
    </footer>
  )
}
