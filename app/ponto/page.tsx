"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, Settings } from "lucide-react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MobileLayout } from "@/components/ui/mobile-layout"
import { MobileCard } from "@/components/ui/mobile-card"
import { RelogioDigital } from "@/components/ponto/relogio-digital"
import { PontoButton } from "@/components/ponto/ponto-button"
import { HistoricoPonto } from "@/components/ponto/historico-ponto"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth"
import { mockFuncionarios } from "@/lib/mock-data"

// Mock data para histórico
const mockHistoricoPonto = [
  {
    id: "1",
    data: "06/01/2024",
    hora: "08:00:00",
    tipo: "Entrada" as const,
    status: "Válida" as const,
    dispositivo: "REP001",
    metodo: "biometria" as const,
  },
  {
    id: "2",
    data: "06/01/2024",
    hora: "12:00:00",
    tipo: "Intervalo" as const,
    status: "Válida" as const,
    dispositivo: "REP001",
    metodo: "biometria" as const,
  },
  {
    id: "3",
    data: "05/01/2024",
    hora: "08:15:00",
    tipo: "Entrada" as const,
    status: "Atrasado" as const,
    dispositivo: "REP002",
    metodo: "facial" as const,
  },
  {
    id: "4",
    data: "05/01/2024",
    hora: "17:00:00",
    tipo: "Saída" as const,
    status: "Válida" as const,
    dispositivo: "REP002",
    metodo: "facial" as const,
  },
]

export default function PontoPage() {
  const [isMobile, setIsMobile] = useState(false)
  const { user } = useAuthStore()

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Buscar funcionário logado
  const funcionarioLogado = mockFuncionarios.find((f) => f.matricula === user?.matricula)

  // Última marcação
  const ultimaMarcacao = {
    tipo: "Entrada" as const,
    horario: "08:00:00",
    status: "Válida" as const,
  }

  const handleMarcarPonto = (tipo: string) => {
    console.log(`Marcando ponto: ${tipo}`)
    // Aqui seria feita a chamada para a API
  }

  const handleExportarHistorico = () => {
    console.log("Exportando histórico...")
    // Implementar exportação
  }

  // Layout Mobile
  if (isMobile) {
    return (
      <DashboardLayout>
        <MobileLayout padding="sm">
          <div className="space-y-4">
            {/* Header Mobile */}
            <MobileCard compact>
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Controle de Ponto</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {funcionarioLogado?.carteira_identidade?.nome_completo}
                </p>
              </div>
            </MobileCard>

            {/* Relógio Mobile */}
            <MobileCard>
              <RelogioDigital showSeconds={true} showDate={true} />
            </MobileCard>

            {/* Botões de Marcação Mobile */}
            <MobileCard title="Marcar Ponto">
              <PontoButton ultimaMarcacao={ultimaMarcacao} onMarcarPonto={handleMarcarPonto} />
            </MobileCard>

            {/* Resumo do Dia Mobile */}
            <MobileCard title="Hoje" compact>
              <div className="grid grid-cols-2 gap-2">
                {["Entrada", "Intervalo", "Retorno", "Saída"].map((tipo, index) => {
                  const colors = [
                    "bg-green-50 text-green-600",
                    "bg-yellow-50 text-yellow-600",
                    "bg-blue-50 text-blue-600",
                    "bg-red-50 text-red-600",
                  ]

                  return (
                    <div key={tipo} className={`text-center p-3 rounded-lg ${colors[index]}`}>
                      <div className="text-lg font-bold">{index === 0 ? "08:00" : "--:--"}</div>
                      <div className="text-xs font-medium">{tipo}</div>
                    </div>
                  )
                })}
              </div>
            </MobileCard>

            {/* Ações Rápidas Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-12 bg-transparent">
                <BarChart3 className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
              <Button variant="outline" className="h-12 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </MobileLayout>
      </DashboardLayout>
    )
  }

  // Layout Desktop
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Controle de Ponto</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas marcações de ponto - {funcionarioLogado?.carteira_identidade?.nome_completo}
          </p>
        </div>

        {/* Relógio e Marcação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-6">
                <RelogioDigital showSeconds={true} showDate={true} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Marcar Ponto</CardTitle>
                <CardDescription>Registre sua entrada, saída ou intervalo</CardDescription>
              </CardHeader>
              <CardContent>
                <PontoButton ultimaMarcacao={ultimaMarcacao} onMarcarPonto={handleMarcarPonto} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Resumo do Dia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Hoje</CardTitle>
              <CardDescription>Suas marcações do dia atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Entrada", "Intervalo", "Retorno", "Saída"].map((tipo, index) => {
                  const colors = [
                    "bg-green-50 dark:bg-green-900/20 text-green-600",
                    "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600",
                    "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
                    "bg-red-50 dark:bg-red-900/20 text-red-600",
                  ]

                  return (
                    <div key={tipo} className={`text-center p-4 rounded-lg ${colors[index]}`}>
                      <div className="text-2xl font-bold">{index === 0 ? "08:00" : "--:--"}</div>
                      <div className="text-sm font-medium">{tipo}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Histórico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <HistoricoPonto marcacoes={mockHistoricoPonto} onExportar={handleExportarHistorico} />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
