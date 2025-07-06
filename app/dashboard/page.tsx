"use client"

import { motion } from "framer-motion"
import {
  Users,
  FileText,
  Clock,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Building2,
  DollarSign,
  UserPlus,
  CheckCircle,
  Timer,
  Target,
  Calculator,
  BarChart3,
  Database,
  User,
  MessageSquare,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockFuncionarios, mockDepartamentos, mockFerias, mockLicencas } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/auth"

export default function DashboardPage() {
  const { user } = useAuthStore()
  const userRank = Number.parseInt(user?.rank || "1")

  // Stats principais baseados no rank do usuário
  const getStatsCards = () => {
    if (userRank >= 4) {
      // Admin/Gerente - Visão completa
      return [
        {
          title: "Total de Funcionários",
          value: mockFuncionarios.length.toString(),
          change: "+2 este mês",
          icon: Users,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          href: "/funcionarios",
        },
        {
          title: "Folha de Pagamento",
          value: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
          }).format(mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0)),
          change: "+5% vs mês anterior",
          icon: DollarSign,
          color: "text-green-600",
          bgColor: "bg-green-50",
          href: "/folha",
        },
        {
          title: "Processos Ativos",
          value: "8",
          change: "3 admissões pendentes",
          icon: UserPlus,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          href: "/admissao",
        },
        {
          title: "Alertas",
          value: "12",
          change: "Requer atenção",
          icon: AlertTriangle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          href: "/relatorios",
        },
      ]
    } else if (userRank >= 3) {
      // RH - Foco em gestão de pessoas
      return [
        {
          title: "Funcionários Ativos",
          value: mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length.toString(),
          change: "Normal",
          icon: Users,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          href: "/funcionarios",
        },
        {
          title: "Admissões Pendentes",
          value: "5",
          change: "+2 esta semana",
          icon: UserPlus,
          color: "text-green-600",
          bgColor: "bg-green-50",
          href: "/admissao",
        },
        {
          title: "Férias Pendentes",
          value: mockFerias.filter((f) => f.status === "Pendente").length.toString(),
          change: "Aguardando aprovação",
          icon: Calendar,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          href: "/ferias",
        },
        {
          title: "Licenças Ativas",
          value: mockLicencas.filter((l) => l.status === "Ativa").length.toString(),
          change: "Em acompanhamento",
          icon: FileText,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          href: "/licencas",
        },
      ]
    } else {
      // Funcionário - Visão pessoal
      return [
        {
          title: "Meu Ponto Hoje",
          value: "8:00",
          change: "Entrada registrada",
          icon: Clock,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          href: "/ponto",
        },
        {
          title: "Saldo de Férias",
          value: "30 dias",
          change: "Disponível para uso",
          icon: Calendar,
          color: "text-green-600",
          bgColor: "bg-green-50",
          href: "/ferias",
        },
        {
          title: "Horas Extras",
          value: "4h 30min",
          change: "Este mês",
          icon: Timer,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          href: "/ponto/extras",
        },
        {
          title: "Tickets Abertos",
          value: "2",
          change: "Em andamento",
          icon: AlertTriangle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          href: "/atendimento",
        },
      ]
    }
  }

  const statsCards = getStatsCards()

  // Dados para gráficos (apenas para gestores)
  const departamentosStats = mockDepartamentos.map((dept) => {
    const funcionarios = mockFuncionarios.filter((f) => f.departamento_info?.idDepartamento === dept.idDepartamento)
    return {
      ...dept,
      funcionarios: funcionarios.length,
      percentage: Math.round((funcionarios.length / mockFuncionarios.length) * 100),
    }
  })

  // Ações rápidas baseadas no rank
  const getQuickActions = () => {
    if (userRank >= 4) {
      return [
        { title: "Processar Folha", href: "/folha", icon: Calculator, color: "bg-blue-500" },
        { title: "Relatório Geral", href: "/relatorios/geral", icon: BarChart3, color: "bg-green-500" },
        { title: "Backup Sistema", href: "/configuracoes/backup", icon: Database, color: "bg-purple-500" },
        { title: "Usuários", href: "/configuracoes/usuarios", icon: Users, color: "bg-orange-500" },
      ]
    } else if (userRank >= 3) {
      return [
        { title: "Nova Admissão", href: "/admissao/novo", icon: UserPlus, color: "bg-blue-500" },
        { title: "Aprovar Férias", href: "/ferias/aprovacoes", icon: CheckCircle, color: "bg-green-500" },
        { title: "Relatórios RH", href: "/relatorios", icon: BarChart3, color: "bg-purple-500" },
        { title: "Funcionários", href: "/funcionarios", icon: Users, color: "bg-orange-500" },
      ]
    } else {
      return [
        { title: "Marcar Ponto", href: "/ponto", icon: Clock, color: "bg-blue-500" },
        { title: "Solicitar Férias", href: "/ferias/solicitar", icon: Calendar, color: "bg-green-500" },
        { title: "Meu Perfil", href: "/funcionarios/perfil", icon: User, color: "bg-purple-500" },
        { title: "Novo Ticket", href: "/atendimento/novo", icon: MessageSquare, color: "bg-orange-500" },
      ]
    }
  }

  const quickActions = getQuickActions()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header personalizado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {userRank >= 4 ? "Dashboard Executivo" : userRank >= 3 ? "Dashboard RH" : "Meu Dashboard"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {userRank >= 4
                ? "Visão executiva completa do sistema"
                : userRank >= 3
                  ? "Gestão de recursos humanos"
                  : "Suas informações pessoais e ações rápidas"}
            </p>
          </div>
          <div className="text-sm text-gray-500">Última atualização: {new Date().toLocaleString("pt-BR")}</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => (window.location.href = stat.href)}
                >
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

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Ações Rápidas</span>
              </CardTitle>
              <CardDescription>Acesse rapidamente as funcionalidades mais utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all bg-transparent"
                      onClick={() => (window.location.href = action.href)}
                    >
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conteúdo específico por rank */}
        {userRank >= 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funcionários por Departamento */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Funcionários por Departamento</span>
                  </CardTitle>
                  <CardDescription>Distribuição atual dos colaboradores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departamentosStats.map((dept) => (
                      <div key={dept.idDepartamento} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full" />
                            <span className="text-sm font-medium">{dept.nome}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{dept.funcionarios}</span>
                            <Badge variant="secondary" className="text-xs">
                              {dept.percentage}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={dept.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alertas e Notificações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Alertas e Notificações</span>
                  </CardTitle>
                  <CardDescription>Itens que requerem atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <AlertTriangle className="h-5 w-5 mt-0.5 text-yellow-500" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Licenças Pendentes</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mockLicencas.filter((l) => l.status === "Pendente de Documento").length} licenças aguardando
                          documentação
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <Calendar className="h-5 w-5 mt-0.5 text-blue-500" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Solicitações de Férias</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mockFerias.filter((f) => f.status === "Pendente").length} solicitações aguardando aprovação
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Há 4 horas</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <TrendingUp className="h-5 w-5 mt-0.5 text-green-500" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Sistema Atualizado</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Todas as funcionalidades estão operacionais
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Há 1 dia</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Resumo Financeiro - Apenas para Admin */}
        {userRank >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Resumo da Folha de Pagamento</span>
                </CardTitle>
                <CardDescription>Valores consolidados do mês atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        mockFuncionarios.reduce((total, f) => total + (f.contrato?.salario_contratual || 0), 0),
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Folha Bruta</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mockFuncionarios.filter((f) => f.contrato?.status === "Ativo").length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Funcionários Ativos</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{mockDepartamentos.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Departamentos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
