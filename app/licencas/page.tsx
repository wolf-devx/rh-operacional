"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Heart, Baby, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Mock data para demonstração
const mockLicencas = [
  {
    id: "LIC001",
    funcionario: "Maria Silva",
    matricula: "F002",
    tipo: "Médica",
    dataInicio: "2024-01-05",
    dataFim: "2024-01-15",
    dias: 10,
    motivo: "Cirurgia",
    cid: "K80.2",
    status: "Ativa",
    anexo: "atestado_medico.pdf",
  },
  {
    id: "LIC002",
    funcionario: "Ana Santos",
    matricula: "F005",
    tipo: "Maternidade",
    dataInicio: "2024-01-10",
    dataFim: "2024-05-10",
    dias: 120,
    motivo: "Licença Maternidade",
    cid: "Z39.2",
    status: "Ativa",
    anexo: "certidao_nascimento.pdf",
  },
  {
    id: "LIC003",
    funcionario: "Carlos Lima",
    matricula: "F003",
    tipo: "INSS",
    dataInicio: "2023-12-20",
    dataFim: "2024-02-20",
    dias: 60,
    motivo: "Acidente de trabalho",
    cid: "S72.0",
    status: "Pendente de Documento",
    anexo: null,
  },
]

const statsCards = [
  {
    title: "Licenças Ativas",
    value: "23",
    change: "+5",
    icon: Heart,
    color: "text-red-600",
  },
  {
    title: "Maternidade",
    value: "8",
    change: "+2",
    icon: Baby,
    color: "text-pink-600",
  },
  {
    title: "Médicas",
    value: "12",
    change: "+3",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "INSS",
    value: "3",
    change: "0",
    icon: Shield,
    color: "text-green-600",
  },
]

export default function LicencasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState("all")

  const filteredLicencas = mockLicencas.filter((licenca) => {
    const matchesSearch =
      licenca.funcionario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licenca.matricula.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = selectedTipo === "all" || licenca.tipo === selectedTipo
    return matchesSearch && matchesTipo
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800"
      case "Pendente de Documento":
        return "bg-yellow-100 text-yellow-800"
      case "Rejeitada":
        return "bg-red-100 text-red-800"
      case "Concluída":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Médica":
        return "bg-blue-100 text-blue-800"
      case "Maternidade":
        return "bg-pink-100 text-pink-800"
      case "Paternidade":
        return "bg-cyan-100 text-cyan-800"
      case "INSS":
        return "bg-green-100 text-green-800"
      case "Acidente":
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Licenças e Afastamentos</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie licenças médicas, maternidade, INSS e outros afastamentos
            </p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Nova Licença
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

        {/* Tabs por Tipo de Licença */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="Médica">Médicas</TabsTrigger>
            <TabsTrigger value="Maternidade">Maternidade</TabsTrigger>
            <TabsTrigger value="INSS">INSS</TabsTrigger>
            <TabsTrigger value="Outras">Outras</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Use os filtros abaixo para encontrar licenças específicas</CardDescription>
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
                      Todas
                    </Button>
                    <Button
                      variant={selectedTipo === "Ativa" ? "default" : "outline"}
                      onClick={() => setSelectedTipo("Ativa")}
                    >
                      Ativas
                    </Button>
                    <Button
                      variant={selectedTipo === "Pendente de Documento" ? "default" : "outline"}
                      onClick={() => setSelectedTipo("Pendente de Documento")}
                    >
                      Pendentes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Licenças</CardTitle>
                  <CardDescription>{filteredLicencas.length} licença(s) encontrada(s)</CardDescription>
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
                          <TableHead>Período</TableHead>
                          <TableHead>Dias</TableHead>
                          <TableHead>CID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Anexo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLicencas.map((licenca) => (
                          <TableRow key={licenca.id}>
                            <TableCell className="font-mono text-sm">{licenca.id}</TableCell>
                            <TableCell className="font-medium">{licenca.funcionario}</TableCell>
                            <TableCell className="font-mono text-sm">{licenca.matricula}</TableCell>
                            <TableCell>
                              <Badge className={getTipoColor(licenca.tipo)}>{licenca.tipo}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{new Date(licenca.dataInicio).toLocaleDateString("pt-BR")}</div>
                                <div className="text-gray-500">
                                  até {new Date(licenca.dataFim).toLocaleDateString("pt-BR")}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">{licenca.dias}</TableCell>
                            <TableCell className="font-mono text-sm">{licenca.cid}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(licenca.status)}>{licenca.status}</Badge>
                            </TableCell>
                            <TableCell>
                              {licenca.anexo ? (
                                <Button variant="ghost" size="sm" className="text-blue-600">
                                  Ver Anexo
                                </Button>
                              ) : (
                                <span className="text-gray-400 text-sm">Sem anexo</span>
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
          </TabsContent>

          {/* Outras tabs seguiriam o mesmo padrão */}
          <TabsContent value="Médica">
            <Card>
              <CardHeader>
                <CardTitle>Licenças Médicas</CardTitle>
                <CardDescription>Licenças por motivos de saúde com atestado médico</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para licenças médicas...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Maternidade">
            <Card>
              <CardHeader>
                <CardTitle>Licença Maternidade</CardTitle>
                <CardDescription>Licenças maternidade e paternidade</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conteúdo específico para licenças maternidade...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
