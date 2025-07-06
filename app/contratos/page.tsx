"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, FileText, Users, Calendar, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data para demonstração
const mockContratos = [
  {
    id: "CT001",
    funcionario: "João Silva",
    matricula: "F001",
    tipo: "CLT",
    cargo: "Desenvolvedor Senior",
    departamento: "Tecnologia",
    dataAdmissao: "2023-01-15",
    salario: 8500.0,
    status: "Ativo",
  },
  {
    id: "CT002",
    funcionario: "Maria Santos",
    matricula: "F002",
    tipo: "PJ",
    cargo: "Consultora Marketing",
    departamento: "Marketing",
    dataAdmissao: "2023-03-20",
    salario: 12000.0,
    status: "Ativo",
  },
  {
    id: "CT003",
    funcionario: "Pedro Costa",
    matricula: "F003",
    tipo: "Estágio",
    cargo: "Estagiário TI",
    departamento: "Tecnologia",
    dataAdmissao: "2023-08-10",
    salario: 1200.0,
    status: "Ativo",
  },
  {
    id: "CT004",
    funcionario: "Ana Oliveira",
    matricula: "F004",
    tipo: "Temporário",
    cargo: "Assistente Vendas",
    departamento: "Vendas",
    dataAdmissao: "2023-11-01",
    salario: 2500.0,
    status: "Suspenso",
  },
]

const statsCards = [
  {
    title: "Contratos Ativos",
    value: "235",
    change: "+12",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "CLT",
    value: "180",
    change: "+8",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "PJ",
    value: "35",
    change: "+3",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Vencimentos Próximos",
    value: "8",
    change: "+2",
    icon: Calendar,
    color: "text-orange-600",
  },
]

export default function ContratosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState("all")

  const filteredContratos = mockContratos.filter((contrato) => {
    const matchesSearch =
      contrato.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = selectedTipo === "all" || contrato.tipo === selectedTipo
    return matchesSearch && matchesTipo
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800"
      case "Suspenso":
        return "bg-yellow-100 text-yellow-800"
      case "Rescindido":
        return "bg-red-100 text-red-800"
      case "Pendente":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "CLT":
        return "bg-blue-100 text-blue-800"
      case "PJ":
        return "bg-purple-100 text-purple-800"
      case "Estágio":
        return "bg-green-100 text-green-800"
      case "Temporário":
        return "bg-orange-100 text-orange-800"
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contratos de Trabalho</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie todos os tipos de contratos da empresa</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Contrato
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

        {/* Tabs por Tipo de Contrato */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="CLT">CLT</TabsTrigger>
            <TabsTrigger value="PJ">PJ</TabsTrigger>
            <TabsTrigger value="Estágio">Estágio</TabsTrigger>
            <TabsTrigger value="Temporário">Temporário</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Use os filtros abaixo para encontrar contratos específicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por funcionário ou matrícula..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedTipo === "all" ? "default" : "outline"}
                      onClick={() => setSelectedTipo("all")}
                    >
                      Todos
                    </Button>
                    <Button
                      variant={selectedTipo === "Ativo" ? "default" : "outline"}
                      onClick={() => setSelectedTipo("Ativo")}
                    >
                      Ativos
                    </Button>
                    <Button
                      variant={selectedTipo === "Suspenso" ? "default" : "outline"}
                      onClick={() => setSelectedTipo("Suspenso")}
                    >
                      Suspensos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Contratos</CardTitle>
                  <CardDescription>{filteredContratos.length} contrato(s) encontrado(s)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Funcionário</TableHead>
                          <TableHead>Matrícula</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Departamento</TableHead>
                          <TableHead>Admissão</TableHead>
                          <TableHead>Salário</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredContratos.map((contrato) => (
                          <TableRow key={contrato.id}>
                            <TableCell className="font-mono text-sm">{contrato.id}</TableCell>
                            <TableCell className="font-medium">{contrato.funcionario}</TableCell>
                            <TableCell className="font-mono text-sm">{contrato.matricula}</TableCell>
                            <TableCell>
                              <Badge className={getTipoColor(contrato.tipo)}>{contrato.tipo}</Badge>
                            </TableCell>
                            <TableCell>{contrato.cargo}</TableCell>
                            <TableCell>{contrato.departamento}</TableCell>
                            <TableCell>{new Date(contrato.dataAdmissao).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell className="font-mono">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(contrato.salario)}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(contrato.status)}>{contrato.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Outras tabs seguiriam o mesmo padrão */}
          <TabsContent value="CLT">
            <Card>
              <CardHeader>
                <CardTitle>Contratos CLT</CardTitle>
                <CardDescription>Contratos regidos pela Consolidação das Leis do Trabalho</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para contratos CLT...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="PJ">
            <Card>
              <CardHeader>
                <CardTitle>Contratos PJ</CardTitle>
                <CardDescription>Contratos de Pessoa Jurídica</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para contratos PJ...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Estágio">
            <Card>
              <CardHeader>
                <CardTitle>Contratos de Estágio</CardTitle>
                <CardDescription>Contratos de estágio supervisionado</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para contratos de estágio...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Temporário">
            <Card>
              <CardHeader>
                <CardTitle>Contratos Temporários</CardTitle>
                <CardDescription>Contratos de trabalho temporário</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para contratos temporários...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
