import Link from "next/link"
import { MobileOnlyShell } from "@/components/mobile-only-shell"
import { PasswordField } from "@/components/auth/password-field"
import { LoadingAuthButton } from "@/components/auth/loading-auth-button"

export default function ResetPasswordPage() {
  return (
    <MobileOnlyShell
      eyebrow="New password"
      title="Choose a fresh password."
      subtitle="Use something strong so your chats, circles, and plans stay protected."
    >
      <form className="space-y-5">
        <PasswordField id="new-password" label="New password" placeholder="NewPassword123" helper="Use 8+ characters with uppercase, lowercase, and a number." />
        <PasswordField id="confirm-password" label="Confirm password" placeholder="NewPassword123" />
        <LoadingAuthButton>Reset password</LoadingAuthButton>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Done already?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline active:opacity-70">
          Back to login
        </Link>
      </p>
    </MobileOnlyShell>
  )
}
