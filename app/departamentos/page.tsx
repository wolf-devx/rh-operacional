"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Building2, Users, MapPin, Edit, Trash2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PermissionGuard } from "@/components/ui/permission-guard"
import { mockDepartamentos, mockFuncionarios } from "@/lib/mock-data"

const statsCards = [
  {
    title: "Total Departamentos",
    value: mockDepartamentos.length.toString(),
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Funcionários Ativos",
    value: mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length.toString(),
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Maior Departamento",
    value: "TI",
    icon: Building2,
    color: "text-purple-600",
  },
  {
    title: "Localizações",
    value: "3",
    icon: MapPin,
    color: "text-orange-600",
  },
]

export default function DepartamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDepartamentos = mockDepartamentos.filter(
    (dept) =>
      dept.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.sigla.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcular funcionários por departamento
  const departamentosComFuncionarios = filteredDepartamentos.map((dept) => {
    const funcionarios = mockFuncionarios.filter((f) => f.departamento_info?.idDepartamento === dept.idDepartamento)
    return {
      ...dept,
      totalFuncionarios: funcionarios.length,
      funcionariosAtivos: funcionarios.filter((f) => f.contrato?.status === "Ativo").length,
    }
  })

  return (
    <DashboardLayout>
      <PermissionGuard requiredRank={3}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Departamentos</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerencie a estrutura organizacional da empresa</p>
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Novo Departamento
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
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar Departamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou sigla..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Departamentos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departamentosComFuncionarios.map((dept, index) => (
              <motion.div
                key={dept.idDepartamento}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{dept.nome}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {dept.sigla}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            •••
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
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{dept.descricao}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{dept.funcionariosAtivos}</div>
                        <div className="text-xs text-gray-600">Ativos</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{dept.totalFuncionarios}</div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Gerente:</span>
                        <span className="font-medium">{dept.gerente}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Localização:</span>
                        <span className="font-medium">{dept.localizacao}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Table View */}
          <Card>
            <CardHeader>
              <CardTitle>Lista Detalhada</CardTitle>
              <CardDescription>{departamentosComFuncionarios.length} departamento(s) encontrado(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Departamento</TableHead>
                      <TableHead>Sigla</TableHead>
                      <TableHead>Gerente</TableHead>
                      <TableHead>Funcionários</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departamentosComFuncionarios.map((dept) => (
                      <TableRow key={dept.idDepartamento}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{dept.nome}</div>
                            <div className="text-sm text-gray-500">{dept.descricao}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{dept.sigla}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{dept.gerente}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-green-600">{dept.funcionariosAtivos}</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-600">{dept.totalFuncionarios}</span>
                          </div>
                        </TableCell>
                        <TableCell>{dept.localizacao}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
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
        </div>
      </PermissionGuard>
    </DashboardLayout>
  )
}
