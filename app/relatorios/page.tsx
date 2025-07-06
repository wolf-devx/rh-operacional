"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Users, DollarSign, Clock, Download, Filter, Search } from "lucide-react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatorioFuncionario } from "@/components/relatorios/relatorio-funcionario"
import { mockFuncionarios, mockDepartamentos } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/auth"

export default function RelatoriosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartamento, setSelectedDepartamento] = useState("all")
  const [selectedFuncionario, setSelectedFuncionario] = useState("")
  const { user } = useAuthStore()

  const userRank = Number.parseInt(user?.rank || "1")

  // Filtrar funcionários baseado na busca e departamento
  const filteredFuncionarios = mockFuncionarios.filter((funcionario) => {
    const matchesSearch =
      funcionario.carteira_identidade?.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.matricula.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartamento =
      selectedDepartamento === "all" || funcionario.departamento_info?.idDepartamento === selectedDepartamento

    return matchesSearch && matchesDepartamento
  })

  const funcionarioSelecionado = mockFuncionarios.find((f) => f.matricula === selectedFuncionario)

  const handleExportarGeral = (formato: "csv" | "pdf" | "xlsx") => {
    console.log(`Exportando relatório geral em ${formato}`)
    // Implementar exportação geral
  }

  const statsCards = [
    {
      title: "Total de Funcionários",
      value: mockFuncionarios.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Folha de Pagamento",
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        notation: "compact",
      }).format(mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0)),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Departamentos",
      value: mockDepartamentos.length.toString(),
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Relatórios Gerados",
      value: "156",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gere relatórios detalhados de funcionários, ponto e folha de pagamento
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExportarGeral("csv")}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Geral
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

        {/* Tabs de Relatórios */}
        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual">Relatório Individual</TabsTrigger>
            <TabsTrigger value="geral">Relatório Geral</TabsTrigger>
            <TabsTrigger value="customizado">Relatório Customizado</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-6">
            {/* Seleção de Funcionário */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Selecionar Funcionário</span>
                </CardTitle>
                <CardDescription>Escolha um funcionário para gerar o relatório individual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por nome ou matrícula..."
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
                      <SelectItem value="all">Todos os Departamentos</SelectItem>
                      {mockDepartamentos.map((dept) => (
                        <SelectItem key={dept.idDepartamento} value={dept.idDepartamento}>
                          {dept.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedFuncionario} onValueChange={setSelectedFuncionario}>
                    <SelectTrigger>
                      <SelectValue placeholder="Funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredFuncionarios.map((funcionario) => (
                        <SelectItem key={funcionario.matricula} value={funcionario.matricula}>
                          {funcionario.carteira_identidade?.nome_completo || funcionario.matricula}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-500 flex items-center">
                    {filteredFuncionarios.length} funcionário(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relatório Individual */}
            {funcionarioSelecionado && (
              <RelatorioFuncionario
                funcionario={{
                  matricula: funcionarioSelecionado.matricula,
                  nome: funcionarioSelecionado.carteira_identidade?.nome_completo || funcionarioSelecionado.matricula,
                  cargo: funcionarioSelecionado.cargo_info?.nome || "N/A",
                  departamento: funcionarioSelecionado.departamento_info?.nome || "N/A",
                  salario: funcionarioSelecionado.contrato?.salario_contratual || 0,
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="geral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Geral da Empresa</CardTitle>
                <CardDescription>Visão consolidada de todos os funcionários e departamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Resumo Geral</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total de Funcionários:</span>
                          <span className="font-medium">{mockFuncionarios.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Funcionários Ativos:</span>
                          <span className="font-medium">
                            {mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departamentos:</span>
                          <span className="font-medium">{mockDepartamentos.length}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Folha de Pagamento</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Folha Bruta:</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(
                              mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0),
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Encargos (est.):</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(
                              mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0) *
                                0.3,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600 font-medium">Custo Total:</span>
                          <span className="font-bold">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(
                              mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0) *
                                1.3,
                            )}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Por Departamento</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {mockDepartamentos.slice(0, 3).map((dept) => {
                          const funcionariosDept = mockFuncionarios.filter(
                            (f) => f.departamento_info?.idDepartamento === dept.idDepartamento,
                          ).length
                          return (
                            <div key={dept.idDepartamento} className="flex justify-between">
                              <span className="text-gray-600">{dept.sigla}:</span>
                              <span className="font-medium">{funcionariosDept}</span>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleExportarGeral("csv")}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportarGeral("pdf")}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleExportarGeral("xlsx")}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customizado" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Customizado</CardTitle>
                <CardDescription>Configure um relatório personalizado com filtros específicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Em Desenvolvimento</h3>
                  <p>Esta funcionalidade estará disponível em breve</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
