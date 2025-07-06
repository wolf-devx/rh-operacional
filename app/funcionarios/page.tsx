"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { mockFuncionarios, mockDepartamentos } from "@/lib/mock-data"

export default function FuncionariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartamento, setSelectedDepartamento] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredFuncionarios = mockFuncionarios.filter((funcionario) => {
    const matchesSearch =
      funcionario.carteira_identidade?.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo_info?.nome?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartamento =
      selectedDepartamento === "all" || funcionario.departamento_info?.idDepartamento === selectedDepartamento

    const matchesStatus = selectedStatus === "all" || funcionario.contrato?.status === selectedStatus

    return matchesSearch && matchesDepartamento && matchesStatus
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Funcionários</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie todos os colaboradores da empresa</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Funcionário
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </CardTitle>
            <CardDescription>Use os filtros abaixo para encontrar funcionários específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, matrícula ou cargo..."
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Rescindido">Rescindido</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-500 flex items-center">
                {filteredFuncionarios.length} funcionário(s) encontrado(s)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Lista de Funcionários</CardTitle>
              <CardDescription>Informações detalhadas dos colaboradores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Funcionário</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Admissão</TableHead>
                      <TableHead>Salário</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFuncionarios.map((funcionario) => (
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
                            <div className="text-sm text-gray-500">{funcionario.cargo_info?.nivel}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{funcionario.departamento_info?.nome}</div>
                            <div className="text-sm text-gray-500">{funcionario.departamento_info?.sigla}</div>
                          </div>
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
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
