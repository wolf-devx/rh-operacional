"use client"

import { useState } from "react"
import { Download, Filter, Clock, DollarSign, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RelatorioFuncionarioProps {
  funcionario: {
    matricula: string
    nome: string
    cargo: string
    departamento: string
    salario: number
  }
}

export function RelatorioFuncionario({ funcionario }: RelatorioFuncionarioProps) {
  const [periodoInicio, setPeriodoInicio] = useState("")
  const [periodoFim, setPeriodoFim] = useState("")
  const [tipoRelatorio, setTipoRelatorio] = useState("completo")

  // Mock data para relatórios
  const dadosPonto = [
    {
      data: "06/01/2024",
      entrada: "08:00",
      intervalo: "12:00",
      retorno: "13:00",
      saida: "17:00",
      horasExtras: "0:00",
      status: "Normal",
    },
    {
      data: "05/01/2024",
      entrada: "08:15",
      intervalo: "12:00",
      retorno: "13:00",
      saida: "17:30",
      horasExtras: "0:15",
      status: "Atraso",
    },
  ]

  const dadosFinanceiros = [
    {
      mes: "Janeiro 2024",
      salarioBase: funcionario.salario,
      horasExtras: 250.0,
      bonificacoes: 500.0,
      descontos: 150.0,
      total: funcionario.salario + 250 + 500 - 150,
    },
    {
      mes: "Dezembro 2023",
      salarioBase: funcionario.salario,
      horasExtras: 180.0,
      bonificacoes: 300.0,
      descontos: 100.0,
      total: funcionario.salario + 180 + 300 - 100,
    },
  ]

  const handleExportar = (formato: "csv" | "pdf" | "xlsx") => {
    console.log(`Exportando relatório em ${formato}`)
    // Implementar exportação
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Relatório Individual</span>
              </CardTitle>
              <CardDescription>
                {funcionario.nome} • {funcionario.cargo} • {funcionario.departamento}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleExportar("csv")}>
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" onClick={() => handleExportar("pdf")}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" onClick={() => handleExportar("xlsx")}>
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Data Início</label>
              <Input type="date" value={periodoInicio} onChange={(e) => setPeriodoInicio(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Data Fim</label>
              <Input type="date" value={periodoFim} onChange={(e) => setPeriodoFim(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de Relatório</label>
              <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completo">Completo</SelectItem>
                  <SelectItem value="ponto">Apenas Ponto</SelectItem>
                  <SelectItem value="financeiro">Apenas Financeiro</SelectItem>
                  <SelectItem value="resumo">Resumo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Gerar Relatório</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios */}
      <Tabs defaultValue="ponto" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ponto">Controle de Ponto</TabsTrigger>
          <TabsTrigger value="financeiro">Dados Financeiros</TabsTrigger>
          <TabsTrigger value="resumo">Resumo Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="ponto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Relatório de Ponto</span>
              </CardTitle>
              <CardDescription>Histórico detalhado de marcações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Entrada</TableHead>
                      <TableHead>Intervalo</TableHead>
                      <TableHead>Retorno</TableHead>
                      <TableHead>Saída</TableHead>
                      <TableHead>Horas Extras</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosPonto.map((dia, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{dia.data}</TableCell>
                        <TableCell>{dia.entrada}</TableCell>
                        <TableCell>{dia.intervalo}</TableCell>
                        <TableCell>{dia.retorno}</TableCell>
                        <TableCell>{dia.saida}</TableCell>
                        <TableCell>{dia.horasExtras}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              dia.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {dia.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Relatório Financeiro</span>
              </CardTitle>
              <CardDescription>Histórico de salários e bonificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Período</TableHead>
                      <TableHead>Salário Base</TableHead>
                      <TableHead>Horas Extras</TableHead>
                      <TableHead>Bonificações</TableHead>
                      <TableHead>Descontos</TableHead>
                      <TableHead>Total Líquido</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosFinanceiros.map((periodo, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{periodo.mes}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(periodo.salarioBase)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(periodo.horasExtras)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(periodo.bonificacoes)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(periodo.descontos)}
                        </TableCell>
                        <TableCell className="font-bold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(periodo.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resumo">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Matrícula:</span>
                  <span className="font-medium">{funcionario.matricula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-medium">{funcionario.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cargo:</span>
                  <span className="font-medium">{funcionario.cargo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departamento:</span>
                  <span className="font-medium">{funcionario.departamento}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Mês</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dias Trabalhados:</span>
                  <span className="font-medium">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Faltas:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Atrasos:</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horas Extras:</span>
                  <span className="font-medium">4h 15min</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salário Base:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(funcionario.salario)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bonificações:</span>
                  <span className="font-medium text-green-600">+ R$ 500,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Descontos:</span>
                  <span className="font-medium text-red-600">- R$ 150,00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">Total Líquido:</span>
                  <span className="font-bold text-lg">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(funcionario.salario + 500 - 150)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
