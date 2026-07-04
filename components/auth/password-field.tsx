"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { AuthField } from "./auth-field"

export function PasswordField({
  id,
  label = "Password",
  helper,
  placeholder,
}: {
  id: string
  label?: string
  helper?: string
  placeholder?: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <AuthField
        id={id}
        label={label}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        helper={helper}
        autoComplete={id.includes("new") ? "new-password" : "current-password"}
        className="pr-12"
      />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((value) => !value)}
        className="absolute right-2 top-[2.05rem] flex h-10 w-10 items-center justify-center rounded-2xl text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-accent hover:text-foreground active:scale-95"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
