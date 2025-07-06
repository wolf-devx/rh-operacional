"use client"

import { motion } from "framer-motion"
import {
  Users,
  UserPlus,
  FileText,
  AlertTriangle,
  Clock,
  DollarSign,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockFuncionarios, mockDepartamentos, mockFerias, mockLicencas } from "@/lib/mock-data"

const rhStatsCards = [
  {
    title: "Processos de Admissão",
    value: "8",
    change: "+3 esta semana",
    icon: UserPlus,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    urgent: 2,
  },
  {
    title: "Solicitações Pendentes",
    value: "15",
    change: "12 férias, 3 licenças",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    urgent: 5,
  },
  {
    title: "Documentos Vencidos",
    value: "6",
    change: "Requer atenção",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    urgent: 6,
  },
  {
    title: "Avaliações Pendentes",
    value: "23",
    change: "Período de avaliação",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    urgent: 8,
  },
]

const processosPendentes = [
  {
    id: "ADM001",
    candidato: "Ana Silva Santos",
    cargo: "Analista de Marketing",
    etapa: "Documentação",
    prioridade: "Alta",
    dias: 3,
    responsavel: "Maria Costa",
  },
  {
    id: "ADM002",
    candidato: "Carlos Eduardo Lima",
    cargo: "Desenvolvedor Júnior",
    etapa: "Exames Médicos",
    prioridade: "Média",
    dias: 7,
    responsavel: "João Silva",
  },
  {
    id: "SOL001",
    candidato: "Pedro Santos",
    cargo: "Analista Financeiro",
    etapa: "Aprovação Férias",
    prioridade: "Urgente",
    dias: 1,
    responsavel: "Ana Costa",
  },
]

const alertasRH = [
  {
    tipo: "error",
    titulo: "Documentos Vencendo",
    descricao: "6 funcionários com documentos vencendo em 30 dias",
    acao: "Notificar funcionários",
    tempo: "Hoje",
  },
  {
    tipo: "warning",
    titulo: "Período Probatório",
    descricao: "4 funcionários completando período probatório",
    acao: "Agendar avaliações",
    tempo: "Esta semana",
  },
  {
    tipo: "info",
    titulo: "Aniversariantes",
    descricao: "8 funcionários fazem aniversário este mês",
    acao: "Enviar felicitações",
    tempo: "Este mês",
  },
]

export default function RHDashboardPage() {
  const totalFuncionarios = mockFuncionarios.length
  const funcionariosAtivos = mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length
  const feriasAprovadas = mockFerias.filter((f) => f.status === "Aprovado").length
  const licencasAtivas = mockLicencas.filter((l) => l.status === "Ativa").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header RH */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard RH</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestão completa de recursos humanos e processos administrativos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Nova Admissão
            </Button>
          </div>
        </div>

        {/* Stats Cards RH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {rhStatsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200 relative">
                  {stat.urgent > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {stat.urgent}
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Quadro de Funcionários</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total de Funcionários</span>
                  <span className="font-bold text-2xl">{totalFuncionarios}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ativos</span>
                  <Badge className="bg-green-100 text-green-800">{funcionariosAtivos}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Em Férias</span>
                  <Badge className="bg-blue-100 text-blue-800">{feriasAprovadas}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Em Licença</span>
                  <Badge className="bg-yellow-100 text-yellow-800">{licencasAtivas}</Badge>
                </div>
                <Progress value={(funcionariosAtivos / totalFuncionarios) * 100} className="mt-4" />
                <p className="text-xs text-gray-500">
                  {Math.round((funcionariosAtivos / totalFuncionarios) * 100)}% dos funcionários ativos
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Departamentos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDepartamentos.slice(0, 4).map((dept) => {
                  const funcionariosDept = mockFuncionarios.filter(
                    (f) => f.departamento_info?.idDepartamento === dept.idDepartamento,
                  ).length
                  return (
                    <div key={dept.idDepartamento} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{dept.sigla}</span>
                        <p className="text-xs text-gray-500">{dept.nome}</p>
                      </div>
                      <Badge variant="outline">{funcionariosDept}</Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Resumo Financeiro</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0))}
                  </div>
                  <div className="text-sm text-gray-600">Folha Mensal</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="font-bold text-green-600">R$ 45.2K</div>
                    <div className="text-xs text-gray-600">Benefícios</div>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="font-bold text-purple-600">R$ 12.8K</div>
                    <div className="text-xs text-gray-600">Encargos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Processos Pendentes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Processos Pendentes</span>
                </div>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </CardTitle>
              <CardDescription>Processos que requerem sua atenção imediata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processosPendentes.map((processo) => (
                  <div
                    key={processo.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            processo.prioridade === "Urgente"
                              ? "bg-red-100 text-red-800"
                              : processo.prioridade === "Alta"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {processo.prioridade}
                        </Badge>
                        <span className="font-medium">{processo.candidato}</span>
                        <span className="text-sm text-gray-500">• {processo.cargo}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        {processo.etapa} • Responsável: {processo.responsavel} • {processo.dias} dias
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button size="sm" variant="ghost">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alertas RH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Alertas e Lembretes</span>
              </CardTitle>
              <CardDescription>Itens importantes para acompanhamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasRH.map((alerta, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div
                      className={`p-1 rounded-full ${
                        alerta.tipo === "error"
                          ? "bg-red-100 text-red-600"
                          : alerta.tipo === "warning"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {alerta.tipo === "error" ? (
                        <XCircle className="w-4 h-4" />
                      ) : alerta.tipo === "warning" ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{alerta.titulo}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{alerta.descricao}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{alerta.tempo}</p>
                        <Button size="sm" variant="outline">
                          {alerta.acao}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
