"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface MarcacaoPonto {
  id: string
  data: string
  hora: string
  tipo: "Entrada" | "Intervalo" | "Retorno" | "Saída"
  status: "Válida" | "Atrasado" | "Duplicada"
  dispositivo: string
  metodo: "biometria" | "senha" | "facial" | "cartão"
}

interface HistoricoPontoProps {
  marcacoes: MarcacaoPonto[]
  onExportar?: () => void
}

export function HistoricoPonto({ marcacoes, onExportar }: HistoricoPontoProps) {
  const [filtroTipo, setFiltroTipo] = useState("all")
  const [filtroStatus, setFiltroStatus] = useState("all")
  const [filtroData, setFiltroData] = useState("")

  const marcacoesFiltradas = marcacoes.filter((marcacao) => {
    const matchesTipo = filtroTipo === "all" || marcacao.tipo === filtroTipo
    const matchesStatus = filtroStatus === "all" || marcacao.status === filtroStatus
    const matchesData = !filtroData || marcacao.data.includes(filtroData)

    return matchesTipo && matchesStatus && matchesData
  })

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

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Entrada":
        return "🟢"
      case "Intervalo":
        return "🟡"
      case "Retorno":
        return "🔵"
      case "Saída":
        return "🔴"
      default:
        return "⚪"
    }
  }

  const getMetodoIcon = (metodo: string) => {
    switch (metodo) {
      case "biometria":
        return "👆"
      case "facial":
        return "👤"
      case "cartão":
        return "💳"
      case "senha":
        return "🔢"
      default:
        return "❓"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Histórico de Marcações</span>
            </CardTitle>
            <CardDescription>Suas marcações de ponto dos últimos 30 dias</CardDescription>
          </div>
          {onExportar && (
            <Button variant="outline" onClick={onExportar} className="w-full sm:w-auto bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Entrada">Entrada</SelectItem>
              <SelectItem value="Intervalo">Intervalo</SelectItem>
              <SelectItem value="Retorno">Retorno</SelectItem>
              <SelectItem value="Saída">Saída</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Válida">Válida</SelectItem>
              <SelectItem value="Atrasado">Atrasado</SelectItem>
              <SelectItem value="Duplicada">Duplicada</SelectItem>
            </SelectContent>
          </Select>

          <Input type="date" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} className="w-full" />

          <div className="text-sm text-gray-500 flex items-center">{marcacoesFiltradas.length} marcação(ões)</div>
        </div>

        {/* Timeline de Marcações */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {marcacoesFiltradas.map((marcacao, index) => (
            <motion.div
              key={marcacao.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Ícone do Tipo */}
              <div className="text-2xl">{getTipoIcon(marcacao.tipo)}</div>

              {/* Informações Principais */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{marcacao.tipo}</span>
                  <Badge className={getStatusColor(marcacao.status)}>{marcacao.status}</Badge>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center space-x-4">
                    <span>📅 {marcacao.data}</span>
                    <span>⏰ {marcacao.hora}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>📱 {marcacao.dispositivo}</span>
                    <span>
                      {getMetodoIcon(marcacao.metodo)} {marcacao.metodo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Visual */}
              <div className="text-right">
                <div
                  className={`w-3 h-3 rounded-full ${
                    marcacao.status === "Válida"
                      ? "bg-green-500"
                      : marcacao.status === "Atrasado"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}

          {marcacoesFiltradas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma marcação encontrada</p>
              <p className="text-sm">Ajuste os filtros ou marque seu primeiro ponto</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
