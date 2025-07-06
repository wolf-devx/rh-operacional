"use client"

import type { ReactNode } from "react"
import { useAuthStore } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"

interface PermissionGuardProps {
  children: ReactNode
  requiredRank: number
  fallback?: ReactNode
}

export function PermissionGuard({ children, requiredRank, fallback }: PermissionGuardProps) {
  const { hasPermission, user } = useAuthStore()

  if (!hasPermission(requiredRank)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="flex items-center justify-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Acesso Negado</span>
          </CardTitle>
          <CardDescription>Você não tem permissão para acessar esta funcionalidade</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Seu nível de acesso: <strong>Rank {user?.rank}</strong>
            </p>
            <p>
              Nível necessário: <strong>Rank {requiredRank}</strong>
            </p>
            <p className="mt-4 text-xs">Entre em contato com o administrador do sistema para solicitar acesso.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
