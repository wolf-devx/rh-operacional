"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Square, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface PontoButtonProps {
  ultimaMarcacao?: {
    tipo: "Entrada" | "Intervalo" | "Retorno" | "Saída"
    horario: string
    status: "Válida" | "Atrasado" | "Duplicada"
  }
  onMarcarPonto: (tipo: string) => void
  disabled?: boolean
}

export function PontoButton({ ultimaMarcacao, onMarcarPonto, disabled = false }: PontoButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const tiposMarcacao = [
    {
      tipo: "Entrada",
      icon: Play,
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-white",
    },
    {
      tipo: "Intervalo",
      icon: Pause,
      color: "bg-yellow-500 hover:bg-yellow-600",
      textColor: "text-white",
    },
    {
      tipo: "Retorno",
      icon: Play,
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-white",
    },
    {
      tipo: "Saída",
      icon: Square,
      color: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
    },
  ]

  const handleMarcarPonto = async (tipo: string) => {
    setIsLoading(true)
    try {
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onMarcarPonto(tipo)

      // Verificar se é atraso (após 8:10)
      const agora = new Date()
      const horaAtual = agora.getHours()
      const minutoAtual = agora.getMinutes()
      const isAtraso = tipo === "Entrada" && (horaAtual > 8 || (horaAtual === 8 && minutoAtual > 10))

      if (isAtraso) {
        toast.error("⚠️ Ponto marcado com atraso!", {
          description: `${tipo} registrada às ${agora.toLocaleTimeString("pt-BR")}`,
        })
      } else {
        toast.success("✅ Ponto marcado com sucesso!", {
          description: `${tipo} registrada às ${agora.toLocaleTimeString("pt-BR")}`,
        })
      }
    } catch (error) {
      toast.error("❌ Erro ao marcar ponto", {
        description: "Tente novamente em alguns instantes",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Válida":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Atrasado":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "Duplicada":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Válida":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Atrasado":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Duplicada":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Última Marcação */}
      {ultimaMarcacao && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            {getStatusIcon(ultimaMarcacao.status)}
            <span className="text-sm font-medium">Última marcação</span>
          </div>
          <div className="text-lg font-bold">{ultimaMarcacao.tipo}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{ultimaMarcacao.horario}</div>
          <Badge className={getStatusColor(ultimaMarcacao.status)}>{ultimaMarcacao.status}</Badge>
        </motion.div>
      )}

      {/* Botões de Marcação */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {tiposMarcacao.map((marcacao, index) => {
          const Icon = marcacao.icon
          return (
            <motion.div
              key={marcacao.tipo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleMarcarPonto(marcacao.tipo)}
                disabled={disabled || isLoading}
                className={`
                  w-full h-20 md:h-24 lg:h-28 
                  flex flex-col items-center justify-center space-y-2
                  ${marcacao.color} ${marcacao.textColor}
                  transition-all duration-200 transform hover:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-sm md:text-base font-medium">{marcacao.tipo}</span>
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>

      {/* Informações de Horário */}
      <div className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <p>Horário de trabalho: 08:00 às 17:00</p>
        <p>Tolerância: 10 minutos • Intervalo: 1 hora</p>
      </div>
    </div>
  )
}
