"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const navItems = [
    { name: "How it works", href: "#features-section" },
    { name: "Plans", href: "#pricing-section" },
    { name: "Stories", href: "#testimonials-section" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#' from href
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full px-4 py-3 md:px-6 md:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/70 bg-background-white/70 px-4 py-2 shadow-sm backdrop-blur-md md:px-5">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" aria-label="SOHABI home" className="flex items-center">
            <Image
              src="/sohabi-icon.png"
              alt="SOHABI"
              width={112}
              height={112}
              priority
              className="h-12 w-12 rounded-2xl object-contain md:h-14 md:w-14"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-warm hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block">
            <Button className="rounded-full border border-border bg-background-white px-6 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-background-warm">
              Login
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background-white border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-medium text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-muted hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/login" className="w-full mt-4">
                  <Button className="w-full rounded-full border border-border bg-background-white px-6 py-2 font-medium text-foreground shadow-sm hover:bg-background-warm">
                    Login
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
