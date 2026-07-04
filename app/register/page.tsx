"use client"

import { useState } from "react"
import Link from "next/link"
import { MobileOnlyShell } from "@/components/mobile-only-shell"
import { AuthField } from "@/components/auth/auth-field"
import { PasswordField } from "@/components/auth/password-field"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { Button } from "@/components/ui/button"
import { LoadingAuthButton } from "@/components/auth/loading-auth-button"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [mode, setMode] = useState<"email" | "phone">("email")

  return (
    <MobileOnlyShell
      eyebrow="Create account"
      title="Start with one warm hello."
      subtitle="Set up your SOHABI profile for coffee invites, safe meetups, and nearby circles."
    >
      <form className="space-y-5">
        <AuthTabs value={mode} onChange={setMode} />
        {mode === "email" ? (
          <AuthField id="register-email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        ) : (
          <AuthField id="register-phone" label="Phone" type="tel" placeholder="+21612345678" helper="Use Tunisian format: +216 followed by 8 digits." autoComplete="tel" />
        )}
        <PasswordField
          id="register-password"
          placeholder="Password123"
          helper="Use 8+ characters with uppercase, lowercase, and a number."
        />
        <AuthField id="birthdate" label="Birthdate" type="date" helper="You must be at least 16 years old to join SOHABI." />
        <label className="flex gap-3 rounded-[1.35rem] border border-border/80 bg-background/90 p-4 text-sm leading-5 text-foreground/78 active:scale-[0.99] transition-transform duration-150">
          <Checkbox className="mt-0.5" />
          <span>I accept the terms and agree to meet people respectfully and safely.</span>
        </label>
        <LoadingAuthButton>Create account</LoadingAuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline active:opacity-70">
          Login
        </Link>
      </p>
    </MobileOnlyShell>
  )
}
