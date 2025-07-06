"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Eye, EyeOff, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth"
import { api } from "@/lib/api"

const loginSchema = z.object({
  matricula: z.string().min(1, "Matrícula é obrigatória"),
  senha: z.string().min(1, "Senha é obrigatória"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, isAuthenticated } = useAuthStore()

  // Se já está autenticado, redirecionar
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      console.log("Tentando fazer login com:", data)
      const user = await api.login(data.matricula, data.senha)
      console.log("Usuário retornado:", user)

      login(user)
      toast.success("Login realizado com sucesso!")

      // Aguardar um pouco para garantir que o estado foi atualizado
      setTimeout(() => {
        // Redirecionamento baseado no rank
        const rank = Number.parseInt(user.rank)
        if (rank >= 4) {
          router.push("/dashboard")
        } else if (rank >= 2) {
          router.push("/funcionarios")
        } else {
          router.push("/ponto")
        }
      }, 100)
    } catch (error) {
      console.error("Erro no login:", error)
      toast.error("Credenciais inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Sistema RH</CardTitle>
            <CardDescription>Faça login para acessar o sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                  {...register("matricula")}
                  className={errors.matricula ? "border-red-500" : ""}
                />
                {errors.matricula && <p className="text-sm text-red-500">{errors.matricula.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    {...register("senha")}
                    className={errors.senha ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.senha && <p className="text-sm text-red-500">{errors.senha.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Credenciais de teste */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Credenciais de Teste:</h4>
              <div className="text-xs space-y-1">
                <div>
                  <strong>Admin:</strong> admin / 123456
                </div>
                <div>
                  <strong>Gerente:</strong> gerente / 123456
                </div>
                <div>
                  <strong>Funcionário:</strong> funcionario / 123456
                </div>
                <div>
                  <strong>Operador:</strong> operador / 123456
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
