"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MobileOnlyShell } from "@/components/mobile-only-shell"
import { AuthField } from "@/components/auth/auth-field"
import { PasswordField } from "@/components/auth/password-field"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { Button } from "@/components/ui/button"
import { LoadingAuthButton } from "@/components/auth/loading-auth-button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [mode, setMode] = useState<"email" | "phone">("email")

  return (
    <MobileOnlyShell
      eyebrow="Welcome back"
      title="Meet your people again."
      subtitle="Sign in to continue your coffee plans, circles, and nearby friend moments."
    >
      <form className="space-y-5">
        <AuthTabs value={mode} onChange={setMode} />
        {mode === "email" ? (
          <AuthField id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        ) : (
          <AuthField id="phone" label="Phone" type="tel" placeholder="+21612345678" helper="Use Tunisian format: +216 followed by 8 digits." autoComplete="tel" />
        )}
        <PasswordField id="password" placeholder="Password123" />
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-medium text-foreground/70 underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>
        <LoadingAuthButton>Login</LoadingAuthButton>
      </form>

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid gap-3">
        <Button type="button" variant="outline" className="h-[52px] rounded-[1.25rem] bg-background/90 transition-transform duration-150 active:scale-[0.985]">
          <Image src="/logos/auth/google.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
          Continue with Google
        </Button>
        <Button type="button" variant="outline" className="h-[52px] rounded-[1.25rem] bg-background/90 transition-transform duration-150 active:scale-[0.985]">
          <Image src="/logos/auth/apple.svg" alt="Apple" width={20} height={20} className="h-5 w-5 dark:invert" />
          Continue with Apple
        </Button>
        <Button type="button" variant="outline" className="h-[52px] rounded-[1.25rem] bg-background/90 transition-transform duration-150 active:scale-[0.985]">
          <Image src="/logos/auth/facebook.svg" alt="Facebook" width={20} height={20} className="h-5 w-5" />
          Continue with Facebook
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to SOHABI?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline active:opacity-70">
          Create account
        </Link>
      </p>
    </MobileOnlyShell>
  )
}
