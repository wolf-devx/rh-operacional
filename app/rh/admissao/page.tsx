"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, UserPlus, FileCheck, Clock, CheckCircle, Eye, Edit, Send, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data específico para RH
const processosAdmissao = [
  {
    id: "ADM001",
    candidato: "Ana Silva Santos",
    cargo: "Analista de Marketing",
    departamento: "Marketing",
    dataInicio: "2024-01-08",
    status: "Em Andamento",
    progresso: 65,
    responsavel: "Maria Costa",
    etapaAtual: "Documentação",
    proximaEtapa: "Exames Médicos",
    prioridade: "Alta",
    documentos: {
      rg: true,
      cpf: true,
      ctps: false,
      comprovante: true,
      foto: false,
    },
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
    etapaAtual: "Coleta de Documentos",
    proximaEtapa: "Análise Documental",
    prioridade: "Média",
    documentos: {
      rg: true,
      cpf: true,
      ctps: false,
      comprovante: false,
      foto: false,
    },
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
    etapaAtual: "Concluído",
    proximaEtapa: "Integração",
    prioridade: "Baixa",
    documentos: {
      rg: true,
      cpf: true,
      ctps: true,
      comprovante: true,
      foto: true,
    },
  },
]

const checklistPadrao = [
  { item: "Entrevista com RH", obrigatorio: true, concluido: true },
  { item: "Entrevista Técnica", obrigatorio: true, concluido: true },
  { item: "Verificação de Referências", obrigatorio: true, concluido: false },
  { item: "Exames Médicos", obrigatorio: true, concluido: false },
  { item: "Documentação Completa", obrigatorio: true, concluido: false },
  { item: "Contrato Assinado", obrigatorio: true, concluido: false },
  { item: "Cadastro no Sistema", obrigatorio: true, concluido: false },
  { item: "Integração Agendada", obrigatorio: false, concluido: false },
]

export default function RHAdmissaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPrioridade, setSelectedPrioridade] = useState("all")

  const filteredProcessos = processosAdmissao.filter((processo) => {
    const matchesSearch =
      processo.candidato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.cargo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || processo.status === selectedStatus
    const matchesPrioridade = selectedPrioridade === "all" || processo.prioridade === selectedPrioridade

    return matchesSearch && matchesStatus && matchesPrioridade
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Em Andamento":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Documentação Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Rejeitado":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Média":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Baixa":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Gestão de Admissões</h1>
            <p className="text-gray-600 dark:text-gray-400">Controle completo dos processos de admissão e integração</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Processo
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Processos Ativos", value: "8", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Aguardando Docs", value: "5", icon: FileCheck, color: "text-yellow-600", bg: "bg-yellow-50" },
            { title: "Concluídos", value: "12", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
            { title: "Tempo Médio", value: "7 dias", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat, index) => {
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
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Tabs defaultValue="processos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="processos">Processos Ativos</TabsTrigger>
            <TabsTrigger value="checklist">Checklist Padrão</TabsTrigger>
            <TabsTrigger value="documentos">Documentação</TabsTrigger>
          </TabsList>

          <TabsContent value="processos" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Filtre os processos de admissão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar candidato, ID ou cargo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Documentação Pendente">Documentação Pendente</SelectItem>
                      <SelectItem value="Aprovado">Aprovado</SelectItem>
                      <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPrioridade} onValueChange={setSelectedPrioridade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Prioridades</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Média">Média</SelectItem>
                      <SelectItem value="Baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-500 flex items-center">
                    {filteredProcessos.length} processo(s) encontrado(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processos Table */}
            <Card>
              <CardHeader>
                <CardTitle>Processos de Admissão</CardTitle>
                <CardDescription>Acompanhe o progresso de cada candidato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidato</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Etapa Atual</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead>Prioridade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Responsável</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProcessos.map((processo) => (
                        <TableRow key={processo.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{processo.candidato}</div>
                              <div className="text-sm text-gray-500">{processo.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{processo.cargo}</div>
                              <div className="text-sm text-gray-500">{processo.departamento}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{processo.etapaAtual}</div>
                              <div className="text-sm text-gray-500">Próxima: {processo.proximaEtapa}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={processo.progresso} className="w-16" />
                              <span className="text-sm text-gray-600">{processo.progresso}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPrioridadeColor(processo.prioridade)}>{processo.prioridade}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(processo.status)}>{processo.status}</Badge>
                          </TableCell>
                          <TableCell>{processo.responsavel}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Checklist Padrão de Admissão</CardTitle>
                <CardDescription>Template padrão para todos os processos de admissão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklistPadrao.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            item.concluido ? "bg-green-500 border-green-500" : "border-gray-300"
                          }`}
                        >
                          {item.concluido && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`${item.concluido ? "line-through text-gray-500" : ""}`}>{item.item}</span>
                        {item.obrigatorio && (
                          <Badge variant="outline" className="text-xs">
                            Obrigatório
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status da Documentação</CardTitle>
                <CardDescription>Acompanhe a coleta de documentos por candidato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processosAdmissao.map((processo) => (
                    <div key={processo.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{processo.candidato}</h4>
                          <p className="text-sm text-gray-500">{processo.cargo}</p>
                        </div>
                        <Badge className={getStatusColor(processo.status)}>{processo.status}</Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(processo.documentos).map(([doc, status]) => (
                          <div
                            key={doc}
                            className={`p-2 rounded text-center text-xs ${
                              status
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {doc.toUpperCase()}
                            {status ? " ✓" : " ✗"}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
