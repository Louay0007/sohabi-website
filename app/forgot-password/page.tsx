import Link from "next/link"
import { MobileOnlyShell } from "@/components/mobile-only-shell"
import { AuthField } from "@/components/auth/auth-field"
import { LoadingAuthButton } from "@/components/auth/loading-auth-button"

export default function ForgotPasswordPage() {
  return (
    <MobileOnlyShell
      eyebrow="Reset access"
      title="Get back to your plans."
      subtitle="Enter your email and we will send reset instructions if an account exists."
    >
      <form className="space-y-5">
        <AuthField id="reset-email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <LoadingAuthButton>Send reset link</LoadingAuthButton>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline active:opacity-70">
          Back to login
        </Link>
      </p>
    </MobileOnlyShell>
  )
}
