import type { InputHTMLAttributes } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function AuthField({
  id,
  label,
  helper,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  helper?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[13px] font-medium text-foreground/82">
        {label}
      </label>
      <Input
        id={id}
        className={cn("h-14 rounded-[1.25rem] border-border/80 bg-background/90 px-4 text-[16px] shadow-inner shadow-foreground/[0.02] transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/65 focus-visible:ring-4 focus-visible:ring-ring/15 focus-visible:ring-offset-0", className)}
        {...props}
      />
      {helper && <p className="text-xs leading-5 text-muted-foreground">{helper}</p>}
    </div>
  )
}
