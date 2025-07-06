"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data para demonstração
const mockTickets = [
  {
    id: "AT001",
    funcionario: "João Silva",
    matricula: "F001",
    tipo: "Dúvida",
    assunto: "Cálculo de férias",
    descricao: "Gostaria de entender como é feito o cálculo das minhas férias...",
    status: "Aberto",
    prioridade: "Média",
    dataAbertura: "2024-01-06T10:30:00",
    atendente: null,
  },
  {
    id: "AT002",
    funcionario: "Maria Santos",
    matricula: "F002",
    tipo: "Solicitação",
    assunto: "Alteração de dados bancários",
    descricao: "Preciso alterar minha conta bancária para recebimento do salário...",
    status: "Em Andamento",
    prioridade: "Alta",
    dataAbertura: "2024-01-05T14:15:00",
    atendente: "Ana Costa",
  },
  {
    id: "AT003",
    funcionario: "Pedro Lima",
    matricula: "F003",
    tipo: "Reclamação",
    assunto: "Problema no sistema de ponto",
    descricao: "O sistema não está registrando minhas marcações corretamente...",
    status: "Resolvido",
    prioridade: "Urgente",
    dataAbertura: "2024-01-04T09:00:00",
    atendente: "Carlos Silva",
  },
]

const statsCards = [
  {
    title: "Tickets Abertos",
    value: "15",
    change: "+3",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    title: "Em Andamento",
    value: "8",
    change: "+2",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Resolvidos Hoje",
    value: "12",
    change: "+5",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Urgentes",
    value: "2",
    change: "-1",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

export default function AtendimentoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showNewTicket, setShowNewTicket] = useState(false)

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assunto.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto":
        return "bg-blue-100 text-blue-800"
      case "Em Andamento":
        return "bg-yellow-100 text-yellow-800"
      case "Aguardando Resposta":
        return "bg-purple-100 text-purple-800"
      case "Resolvido":
        return "bg-green-100 text-green-800"
      case "Fechado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Baixa":
        return "bg-gray-100 text-gray-800"
      case "Média":
        return "bg-blue-100 text-blue-800"
      case "Alta":
        return "bg-yellow-100 text-yellow-800"
      case "Urgente":
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Atendimento</h1>
            <p className="text-gray-600 dark:text-gray-400">Portal de atendimento interno e gestão de tickets</p>
          </div>
          <Button className="w-full sm:w-auto" onClick={() => setShowNewTicket(!showNewTicket)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Ticket
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

        {/* Novo Ticket Form */}
        {showNewTicket && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Novo Ticket de Atendimento</CardTitle>
                <CardDescription>Preencha os dados abaixo para abrir um novo ticket</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="duvida">Dúvida</SelectItem>
                        <SelectItem value="solicitacao">Solicitação</SelectItem>
                        <SelectItem value="reclamacao">Reclamação</SelectItem>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prioridade</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <Input placeholder="Digite o assunto do ticket" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea placeholder="Descreva detalhadamente sua solicitação..." rows={4} />
                </div>
                <div className="flex gap-2">
                  <Button>Criar Ticket</Button>
                  <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Use os filtros abaixo para encontrar tickets específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por funcionário ou assunto..."
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
                  variant={selectedStatus === "Aberto" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Aberto")}
                >
                  Abertos
                </Button>
                <Button
                  variant={selectedStatus === "Em Andamento" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Em Andamento")}
                >
                  Em Andamento
                </Button>
                <Button
                  variant={selectedStatus === "Resolvido" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("Resolvido")}
                >
                  Resolvidos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Lista de Tickets</CardTitle>
              <CardDescription>{filteredTickets.length} ticket(s) encontrado(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Funcionário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Data Abertura</TableHead>
                      <TableHead>Atendente</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.funcionario}</div>
                            <div className="text-sm text-gray-500">{ticket.matricula}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.tipo}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium truncate">{ticket.assunto}</div>
                            <div className="text-sm text-gray-500 truncate">{ticket.descricao}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPrioridadeColor(ticket.prioridade)}>{ticket.prioridade}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(ticket.dataAbertura).toLocaleDateString("pt-BR")}
                          <div className="text-sm text-gray-500">
                            {new Date(ticket.dataAbertura).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {ticket.atendente ? (
                            <span className="text-sm">{ticket.atendente}</span>
                          ) : (
                            <span className="text-sm text-gray-400">Não atribuído</span>
                          )}
                        </TableCell>
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
