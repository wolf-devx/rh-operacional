"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MobileLayoutProps {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
}

export function MobileLayout({ children, className, padding = "md" }: MobileLayoutProps) {
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full",
        "bg-gray-50 dark:bg-gray-900",
        "overflow-x-hidden",
        paddingClasses[padding],
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  )
}
