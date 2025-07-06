"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, UserPlus, FileCheck, Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data para demonstração
const mockAdmissoes = [
  {
    id: "ADM001",
    candidato: "Ana Silva Santos",
    cargo: "Analista de Marketing",
    departamento: "Marketing",
    dataInicio: "2024-01-08",
    status: "Em Andamento",
    progresso: 65,
    responsavel: "Maria Costa",
  },
  {
    id: "ADM002",
    candidato: "Carlos Eduardo Lima",
    cargo: "Desenvolvedor Júnior",
    departamento: "Tecnologia",
    dataInicio: "2024-01-10",
    status: "Documentação Pendente",
    progresso: 30,
    responsavel: "João Silva",
  },
  {
    id: "ADM003",
    candidato: "Fernanda Oliveira",
    cargo: "Assistente Administrativo",
    departamento: "Administrativo",
    dataInicio: "2024-01-05",
    status: "Aprovado",
    progresso: 100,
    responsavel: "Pedro Santos",
  },
]

const statsCards = [
  {
    title: "Processos Ativos",
    value: "12",
    change: "+3",
    icon: UserPlus,
    color: "text-blue-600",
  },
  {
    title: "Aguardando Documentos",
    value: "5",
    change: "-2",
    icon: FileCheck,
    color: "text-yellow-600",
  },
  {
    title: "Concluídos no Mês",
    value: "8",
    change: "+4",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Tempo Médio",
    value: "7 dias",
    change: "-1 dia",
    icon: Clock,
    color: "text-purple-600",
  },
]

export default function AdmissaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAdmissoes = mockAdmissoes.filter((admissao) => {
    const matchesSearch =
      admissao.candidato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admissao.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || admissao.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800"
      case "Em Andamento":
        return "bg-blue-100 text-blue-800"
      case "Documentação Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Rejeitado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admissão</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie processos de admissão de novos funcionários</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Processo
          </Button>
        </div>

        {/* Stats Cards */}
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
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Use os filtros abaixo para encontrar processos específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por candidato ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={selectedStatus === "Em Andamento" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Em Andamento")}
                >
                  Em Andamento
                </Button>
                <Button
                  variant={selectedStatus === "Documentação Pendente" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Documentação Pendente")}
                >
                  Pendentes
                </Button>
                <Button
                  variant={selectedStatus === "Aprovado" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Aprovado")}
                >
                  Aprovados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Processos de Admissão</CardTitle>
              <CardDescription>{filteredAdmissoes.length} processo(s) encontrado(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Candidato</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Data Início</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responsável</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmissoes.map((admissao) => (
                      <TableRow key={admissao.id}>
                        <TableCell className="font-mono text-sm">{admissao.id}</TableCell>
                        <TableCell className="font-medium">{admissao.candidato}</TableCell>
                        <TableCell>{admissao.cargo}</TableCell>
                        <TableCell>{admissao.departamento}</TableCell>
                        <TableCell>{new Date(admissao.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={admissao.progresso} className="w-16" />
                            <span className="text-sm text-gray-600">{admissao.progresso}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(admissao.status)}>{admissao.status}</Badge>
                        </TableCell>
                        <TableCell>{admissao.responsavel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
