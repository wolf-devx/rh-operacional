"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MobileCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  compact?: boolean
}

export function MobileCard({ title, description, children, className, compact = false }: MobileCardProps) {
  return (
    <Card className={cn("w-full shadow-sm", compact && "p-2", className)}>
      {(title || description) && (
        <CardHeader className={cn(compact && "pb-2")}>
          {title && <CardTitle className={cn("text-lg", compact && "text-base")}>{title}</CardTitle>}
          {description && (
            <CardDescription className={cn("text-sm", compact && "text-xs")}>{description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(compact && "pt-0")}>{children}</CardContent>
    </Card>
  )
}
