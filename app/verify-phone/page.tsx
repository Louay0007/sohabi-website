import Link from "next/link"
import { MobileOnlyShell } from "@/components/mobile-only-shell"
import { AuthField } from "@/components/auth/auth-field"
import { OtpInputRow } from "@/components/auth/otp-input-row"
import { Button } from "@/components/ui/button"
import { LoadingAuthButton } from "@/components/auth/loading-auth-button"

export default function VerifyPhonePage() {
  return (
    <MobileOnlyShell
      eyebrow="Phone check"
      title="Enter your six-digit code."
      subtitle="We use phone verification to keep nearby meetups safer and more trusted."
    >
      <form className="space-y-5">
        <AuthField id="verify-phone" label="Phone" type="tel" placeholder="+21612345678" helper="Use the same phone number you used to register." />
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Verification code</label>
          <OtpInputRow />
          <p className="text-xs leading-5 text-muted-foreground">Enter the 6-digit SMS code.</p>
        </div>
        <LoadingAuthButton>Verify phone</LoadingAuthButton>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm">
        <button type="button" className="font-medium text-foreground/75 underline-offset-4 hover:underline active:opacity-70">
          Resend code
        </button>
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline active:opacity-70">
          Back to login
        </Link>
      </div>
    </MobileOnlyShell>
  )
}
