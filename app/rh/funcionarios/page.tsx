"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  UserCheck,
  AlertTriangle,
  Calendar,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { mockFuncionarios, mockDepartamentos } from "@/lib/mock-data"

// Dados adicionais para RH
const alertasFuncionarios = [
  {
    matricula: "funcionario",
    tipo: "documento_vencido",
    descricao: "RG vence em 15 dias",
    urgencia: "alta",
  },
  {
    matricula: "operador",
    tipo: "periodo_probatorio",
    descricao: "Período probatório termina em 5 dias",
    urgencia: "media",
  },
  {
    matricula: "gerente",
    tipo: "avaliacao_pendente",
    descricao: "Avaliação de desempenho pendente",
    urgencia: "baixa",
  },
]

const acoesPendentes = [
  {
    funcionario: "Ana Silva Santos",
    acao: "Renovar CTPS",
    prazo: "2024-01-15",
    responsavel: "RH",
  },
  {
    funcionario: "Carlos Eduardo Lima",
    acao: "Avaliação 90 dias",
    prazo: "2024-01-20",
    responsavel: "Gestor",
  },
  {
    funcionario: "Pedro Costa",
    acao: "Atualizar dados bancários",
    prazo: "2024-01-10",
    responsavel: "Funcionário",
  },
]

export default function RHFuncionariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartamento, setSelectedDepartamento] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTipo, setSelectedTipo] = useState("all")

  const filteredFuncionarios = mockFuncionarios.filter((funcionario) => {
    const matchesSearch =
      funcionario.carteira_identidade?.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo_info?.nome?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartamento =
      selectedDepartamento === "all" || funcionario.departamento_info?.idDepartamento === selectedDepartamento

    const matchesStatus = selectedStatus === "all" || funcionario.contrato?.status === selectedStatus

    const matchesTipo = selectedTipo === "all" || funcionario.contrato?.tipo_contrato === selectedTipo

    return matchesSearch && matchesDepartamento && matchesStatus && matchesTipo
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Suspenso":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Rescindido":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Pendente":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTipoColor = (tipo?: string) => {
    switch (tipo) {
      case "CLT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Pessoa Júridica":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "Estágio":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Temporário":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case "documento_vencido":
        return <FileText className="w-4 h-4 text-red-500" />
      case "periodo_probatorio":
        return <Calendar className="w-4 h-4 text-yellow-500" />
      case "avaliacao_pendente":
        return <UserCheck className="w-4 h-4 text-blue-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Gestão de Funcionários</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Controle completo do quadro de funcionários e informações pessoais
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Funcionários",
              value: mockFuncionarios.length.toString(),
              change: "+2 este mês",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              title: "Ativos",
              value: mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length.toString(),
              change: "Normal",
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              title: "Alertas",
              value: alertasFuncionarios.length.toString(),
              change: "Requer atenção",
              color: "text-red-600",
              bg: "bg-red-50",
            },
            {
              title: "Ações Pendentes",
              value: acoesPendentes.length.toString(),
              change: "Para esta semana",
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="funcionarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
            <TabsTrigger value="acoes">Ações Pendentes</TabsTrigger>
          </TabsList>

          <TabsContent value="funcionarios" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtros Avançados</span>
                </CardTitle>
                <CardDescription>Use os filtros para encontrar funcionários específicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por nome, matrícula..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedDepartamento} onValueChange={setSelectedDepartamento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {mockDepartamentos.map((dept) => (
                        <SelectItem key={dept.idDepartamento} value={dept.idDepartamento}>
                          {dept.sigla}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                      <SelectItem value="Rescindido">Rescindido</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo Contrato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="Pessoa Júridica">PJ</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-500 flex items-center">
                    {filteredFuncionarios.length} encontrado(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funcionários Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Funcionários</CardTitle>
                <CardDescription>Informações completas dos colaboradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Funcionário</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Cargo/Departamento</TableHead>
                        <TableHead>Tipo Contrato</TableHead>
                        <TableHead>Admissão</TableHead>
                        <TableHead>Salário</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Alertas</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFuncionarios.map((funcionario) => {
                        const alertas = alertasFuncionarios.filter((a) => a.matricula === funcionario.matricula)

                        return (
                          <TableRow key={funcionario.matricula} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={funcionario.foto_funcionario || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {funcionario.carteira_identidade?.nome_completo
                                      ?.split(" ")
                                      .map((n) => n[0])
                                      .join("") || funcionario.matricula.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {funcionario.carteira_identidade?.nome_completo || funcionario.matricula}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {funcionario.pessoa?.email_pessoal || "Email não informado"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{funcionario.matricula}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{funcionario.cargo_info?.nome}</div>
                                <div className="text-sm text-gray-500">
                                  {funcionario.departamento_info?.sigla} • {funcionario.cargo_info?.nivel}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTipoColor(funcionario.contrato?.tipo_contrato)}>
                                {funcionario.contrato?.tipo_contrato}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {funcionario.contrato?.data_admissao
                                ? new Date(funcionario.contrato.data_admissao).toLocaleDateString("pt-BR")
                                : "N/A"}
                            </TableCell>
                            <TableCell className="font-mono">
                              {funcionario.contrato?.salario_contratual
                                ? new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(funcionario.contrato.salario_contratual)
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(funcionario.contrato?.status)}>
                                {funcionario.contrato?.status || "N/A"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {alertas.length > 0 ? (
                                <div className="flex space-x-1">
                                  {alertas.slice(0, 2).map((alerta, index) => (
                                    <div key={index} title={alerta.descricao}>
                                      {getAlertaIcon(alerta.tipo)}
                                    </div>
                                  ))}
                                  {alertas.length > 2 && (
                                    <span className="text-xs text-gray-500">+{alertas.length - 2}</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Perfil Completo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editar Dados
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Documentos
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Histórico
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Desativar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas de Funcionários</CardTitle>
                <CardDescription>Itens que requerem atenção imediata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertasFuncionarios.map((alerta, index) => {
                    const funcionario = mockFuncionarios.find((f) => f.matricula === alerta.matricula)
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getAlertaIcon(alerta.tipo)}
                          <div>
                            <div className="font-medium">
                              {funcionario?.carteira_identidade?.nome_completo || alerta.matricula}
                            </div>
                            <div className="text-sm text-gray-500">{alerta.descricao}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              alerta.urgencia === "alta"
                                ? "bg-red-100 text-red-800"
                                : alerta.urgencia === "media"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {alerta.urgencia}
                          </Badge>
                          <Button size="sm">Resolver</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações Pendentes</CardTitle>
                <CardDescription>Tarefas que precisam ser executadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {acoesPendentes.map((acao, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{acao.funcionario}</div>
                        <div className="text-sm text-gray-500">{acao.acao}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Prazo: {new Date(acao.prazo).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="text-xs text-gray-500">Resp: {acao.responsavel}</div>
                        </div>
                        <Button size="sm">Executar</Button>
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
