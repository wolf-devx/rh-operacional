"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuthStore } from "@/lib/auth"

// Mock data para férias
const mockFerias = [
  {
    id: "FER001",
    funcionario: "João Silva",
    matricula: "admin",
    dataInicio: "2024-02-01",
    dataFim: "2024-02-15",
    dias: 15,
    status: "Aprovado",
    aprovadoPor: "Maria Costa",
    dataAprovacao: "2024-01-10",
    observacoes: "Férias de verão aprovadas",
  },
  {
    id: "FER002",
    funcionario: "Ana Santos",
    matricula: "gerente",
    dataInicio: "2024-03-10",
    dataFim: "2024-03-20",
    dias: 10,
    status: "Pendente",
    aprovadoPor: null,
    dataAprovacao: null,
    observacoes: "Aguardando aprovação do gestor",
  },
  {
    id: "FER003",
    funcionario: "Pedro Costa",
    matricula: "funcionario",
    dataInicio: "2024-01-15",
    dataFim: "2024-01-25",
    dias: 10,
    status: "Em Gozo",
    aprovadoPor: "João Silva",
    dataAprovacao: "2024-01-05",
    observacoes: "Férias em andamento",
  },
]

const statsCards = [
  {
    title: "Solicitações Pendentes",
    value: "3",
    change: "+1 esta semana",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Férias Aprovadas",
    value: "12",
    change: "+5 este mês",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Em Gozo",
    value: "8",
    change: "Atualmente",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Vencendo em 30 dias",
    value: "15",
    change: "Requer atenção",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

export default function FeriasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const { user } = useAuthStore()

  const userRank = Number.parseInt(user?.rank || "1")

  const filteredFerias = mockFerias.filter((ferias) => {
    const matchesSearch =
      ferias.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ferias.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || ferias.status === selectedStatus

    // Se não for admin/gerente, mostrar apenas suas próprias férias
    if (userRank < 3) {
      return matchesSearch && matchesStatus && ferias.matricula === user?.matricula
    }

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Em Gozo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Rejeitado":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Concluído":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pendente":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Em Gozo":
        return <Calendar className="w-4 h-4 text-blue-600" />
      case "Rejeitado":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Férias</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {userRank >= 3 ? "Gerencie solicitações de férias" : "Suas solicitações de férias"}
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        {/* Stats Cards - Apenas para gestores */}
        {userRank >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Use os filtros abaixo para encontrar solicitações específicas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por funcionário ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Em Gozo">Em Gozo</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Férias</CardTitle>
              <CardDescription>{filteredFerias.length} solicitação(ões) encontrada(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      {userRank >= 3 && <TableHead>Funcionário</TableHead>}
                      <TableHead>Período</TableHead>
                      <TableHead>Dias</TableHead>
                      <TableHead>Status</TableHead>
                      {userRank >= 3 && <TableHead>Aprovado Por</TableHead>}
                      <TableHead>Observações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFerias.map((ferias) => (
                      <TableRow key={ferias.id}>
                        <TableCell className="font-mono text-sm">{ferias.id}</TableCell>
                        {userRank >= 3 && (
                          <TableCell>
                            <div>
                              <div className="font-medium">{ferias.funcionario}</div>
                              <div className="text-sm text-gray-500">{ferias.matricula}</div>
                            </div>
                          </TableCell>
                        )}
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {new Date(ferias.dataInicio).toLocaleDateString("pt-BR")} até{" "}
                              {new Date(ferias.dataFim).toLocaleDateString("pt-BR")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {Math.ceil(
                                (new Date(ferias.dataFim).getTime() - new Date(ferias.dataInicio).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              dias
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold">{ferias.dias}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(ferias.status)}
                            <Badge className={getStatusColor(ferias.status)}>{ferias.status}</Badge>
                          </div>
                        </TableCell>
                        {userRank >= 3 && (
                          <TableCell>
                            {ferias.aprovadoPor ? (
                              <div>
                                <div className="font-medium">{ferias.aprovadoPor}</div>
                                {ferias.dataAprovacao && (
                                  <div className="text-sm text-gray-500">
                                    {new Date(ferias.dataAprovacao).toLocaleDateString("pt-BR")}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          <div className="max-w-xs truncate" title={ferias.observacoes}>
                            {ferias.observacoes}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredFerias.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma solicitação de férias encontrada</p>
                  <p className="text-sm">Ajuste os filtros ou crie uma nova solicitação</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
