"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { AuthUser } from "./types"

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
  hasPermission: (requiredRank: number) => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        console.log("Login realizado:", user)
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        console.log("Logout realizado")
        set({ user: null, isAuthenticated: false })
        // Limpar cookie de autenticação
        if (typeof window !== "undefined") {
          document.cookie = "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        }
      },
      hasPermission: (requiredRank: number) => {
        const { user } = get()
        if (!user) return false
        const userRank = Number.parseInt(user.rank)
        return userRank >= requiredRank
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Sincronizar com cookie quando o estado for hidratado
        if (typeof window !== "undefined" && state?.isAuthenticated) {
          document.cookie = `auth-storage=${JSON.stringify({ state })}; path=/; max-age=${60 * 60 * 24 * 7}`
        }
      },
    },
  ),
)
