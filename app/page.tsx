"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth"

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirecionamento baseado no rank
      const rank = Number.parseInt(user.rank)
      if (rank >= 4) {
        router.push("/dashboard")
      } else if (rank >= 2) {
        router.push("/funcionarios")
      } else {
        router.push("/ponto")
      }
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  )
}
