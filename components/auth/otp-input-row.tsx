import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function OtpInputRow() {
  return (
    <InputOTP maxLength={6} className="w-full">
      <InputOTPGroup className="w-full justify-between gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPSlot key={index} index={index} className="h-14 w-11 rounded-[1.15rem] border-border/80 bg-background/90 text-lg shadow-inner shadow-foreground/[0.02] data-[active=true]:ring-4 data-[active=true]:ring-ring/15" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
