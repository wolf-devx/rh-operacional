"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  FileText,
  Clock,
  Calendar,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  UserCheck,
  UserPlus,
  MessageSquare,
  Heart,
  BarChart3,
  Calculator,
  CreditCard,
  Shield,
  ChevronRight,
  Award,
  Bell,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth"
import { cn } from "@/lib/utils"

interface MenuItem {
  title: string
  href: string
  icon: any
  rank: number
  badge?: string
  submenu?: {
    title: string
    href: string
    description?: string
  }[]
}

const menuItems: MenuItem[] = [
  // DASHBOARD
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    rank: 1,
    submenu: [
      { title: "Visão Geral", href: "/dashboard", description: "Métricas principais" },
      { title: "Meu Painel", href: "/dashboard/pessoal", description: "Informações pessoais" },
    ],
  },

  // GESTÃO DE PESSOAS
  {
    title: "Funcionários",
    href: "/funcionarios",
    icon: Users,
    rank: 1,
    submenu: [
      { title: "Lista Geral", href: "/funcionarios", description: "Todos os funcionários" },
      { title: "Meu Perfil", href: "/funcionarios/perfil", description: "Meus dados pessoais" },
      { title: "Organograma", href: "/funcionarios/organograma", description: "Estrutura hierárquica" },
      { title: "Aniversariantes", href: "/funcionarios/aniversarios", description: "Datas especiais" },
    ],
  },

  // PONTO E FREQUÊNCIA
  {
    title: "Ponto Eletrônico",
    href: "/ponto",
    icon: Clock,
    rank: 1,
    badge: "Novo",
    submenu: [
      { title: "Marcar Ponto", href: "/ponto", description: "Registrar entrada/saída" },
      { title: "Meu Histórico", href: "/ponto/historico", description: "Minhas marcações" },
      { title: "Espelho de Ponto", href: "/ponto/espelho", description: "Relatório mensal" },
      { title: "Horas Extras", href: "/ponto/extras", description: "Banco de horas" },
      { title: "Justificativas", href: "/ponto/justificativas", description: "Correções de ponto" },
      { title: "Dispositivos", href: "/ponto/dispositivos", description: "REPs disponíveis" },
    ],
  },

  // FÉRIAS E LICENÇAS
  {
    title: "Férias",
    href: "/ferias",
    icon: Calendar,
    rank: 1,
    submenu: [
      { title: "Minhas Férias", href: "/ferias", description: "Saldo e histórico" },
      { title: "Solicitar Férias", href: "/ferias/solicitar", description: "Nova solicitação" },
      { title: "Calendário", href: "/ferias/calendario", description: "Períodos da equipe" },
      { title: "Aprovações", href: "/ferias/aprovacoes", description: "Pendentes de aprovação" },
    ],
  },

  {
    title: "Licenças",
    href: "/licencas",
    icon: Heart,
    rank: 2,
    submenu: [
      { title: "Minhas Licenças", href: "/licencas", description: "Histórico pessoal" },
      { title: "Solicitar Licença", href: "/licencas/solicitar", description: "Nova solicitação" },
      { title: "Licenças Médicas", href: "/licencas/medicas", description: "Atestados médicos" },
      { title: "Maternidade/Paternidade", href: "/licencas/maternidade", description: "Licenças familiares" },
      { title: "INSS", href: "/licencas/inss", description: "Auxílios previdenciários" },
    ],
  },

  // RH E ADMISSÃO
  {
    title: "Admissão",
    href: "/admissao",
    icon: UserPlus,
    rank: 3,
    submenu: [
      { title: "Processos Ativos", href: "/admissao", description: "Em andamento" },
      { title: "Novo Processo", href: "/admissao/novo", description: "Iniciar admissão" },
      { title: "Checklist", href: "/admissao/checklist", description: "Itens obrigatórios" },
      { title: "Documentação", href: "/admissao/documentos", description: "Arquivos necessários" },
      { title: "Integração", href: "/admissao/integracao", description: "Onboarding" },
    ],
  },

  {
    title: "Contratos",
    href: "/contratos",
    icon: FileText,
    rank: 2,
    submenu: [
      { title: "Todos os Contratos", href: "/contratos", description: "Gestão completa" },
      { title: "CLT", href: "/contratos/clt", description: "Contratos CLT" },
      { title: "PJ", href: "/contratos/pj", description: "Pessoa Jurídica" },
      { title: "Estágio", href: "/contratos/estagio", description: "Contratos de estágio" },
      { title: "Temporários", href: "/contratos/temporarios", description: "Trabalho temporário" },
      { title: "Renovações", href: "/contratos/renovacoes", description: "Vencimentos próximos" },
      { title: "Rescisões", href: "/contratos/rescisoes", description: "Desligamentos" },
    ],
  },

  // CARGOS E CARREIRA
  {
    title: "Cargos & Carreira",
    href: "/cargos",
    icon: Award,
    rank: 3,
    submenu: [
      { title: "Plano de Cargos", href: "/cargos", description: "Estrutura de cargos" },
      { title: "Jornadas de Trabalho", href: "/cargos/jornadas", description: "Horários e turnos" },
      { title: "Promoções", href: "/cargos/promocoes", description: "Mudanças de cargo" },
      { title: "Avaliações", href: "/cargos/avaliacoes", description: "Performance" },
      { title: "Competências", href: "/cargos/competencias", description: "Skills necessárias" },
    ],
  },

  // FOLHA DE PAGAMENTO
  {
    title: "Folha de Pagamento",
    href: "/folha",
    icon: Calculator,
    rank: 4,
    submenu: [
      { title: "Processamento", href: "/folha", description: "Calcular folha" },
      { title: "Holerites", href: "/folha/holerites", description: "Contracheques" },
      { title: "13º Salário", href: "/folha/decimo-terceiro", description: "Gratificação natalina" },
      { title: "Férias", href: "/folha/ferias", description: "Cálculo de férias" },
      { title: "Rescisões", href: "/folha/rescisoes", description: "Acerto rescisório" },
      { title: "Impostos", href: "/folha/impostos", description: "IRRF, INSS, FGTS" },
      { title: "Relatórios", href: "/folha/relatorios", description: "SEFIP, RAIS, DIRF" },
    ],
  },

  {
    title: "Benefícios",
    href: "/beneficios",
    icon: Shield,
    rank: 2,
    submenu: [
      { title: "Plano de Saúde", href: "/beneficios/saude", description: "Assistência médica" },
      { title: "Vale Refeição", href: "/beneficios/vr", description: "Alimentação" },
      { title: "Vale Transporte", href: "/beneficios/vt", description: "Transporte público" },
      { title: "Seguro de Vida", href: "/beneficios/seguro", description: "Proteção familiar" },
      { title: "Auxílio Creche", href: "/beneficios/creche", description: "Apoio familiar" },
      { title: "Participação Lucros", href: "/beneficios/plr", description: "PLR" },
    ],
  },

  // FINANCEIRO
  {
    title: "Centros de Custo",
    href: "/centros-custo",
    icon: CreditCard,
    rank: 4,
    submenu: [
      { title: "Gestão de Centros", href: "/centros-custo", description: "Controle de custos" },
      { title: "Relatórios", href: "/centros-custo/relatorios", description: "Análise financeira" },
      { title: "Orçamento", href: "/centros-custo/orcamento", description: "Planejamento" },
    ],
  },

  // ESTRUTURA ORGANIZACIONAL
  {
    title: "Departamentos",
    href: "/departamentos",
    icon: Building2,
    rank: 3,
    submenu: [
      { title: "Lista de Departamentos", href: "/departamentos", description: "Estrutura organizacional" },
      { title: "Organograma", href: "/departamentos/organograma", description: "Hierarquia visual" },
      { title: "Gestores", href: "/departamentos/gestores", description: "Responsáveis" },
      { title: "Localização", href: "/departamentos/localizacao", description: "Endereços e salas" },
    ],
  },

  // RELATÓRIOS E BI
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
    rank: 2,
    submenu: [
      { title: "Dashboard BI", href: "/relatorios", description: "Business Intelligence" },
      { title: "Relatório Individual", href: "/relatorios/individual", description: "Por funcionário" },
      { title: "Relatório Geral", href: "/relatorios/geral", description: "Consolidado" },
      { title: "Ponto Eletrônico", href: "/relatorios/ponto", description: "Frequência" },
      { title: "Folha de Pagamento", href: "/relatorios/folha", description: "Financeiro" },
      { title: "Turnover", href: "/relatorios/turnover", description: "Rotatividade" },
      { title: "Absenteísmo", href: "/relatorios/absenteismo", description: "Faltas e atrasos" },
      { title: "Customizados", href: "/relatorios/customizados", description: "Relatórios personalizados" },
    ],
  },

  // COMUNICAÇÃO
  {
    title: "Atendimento",
    href: "/atendimento",
    icon: MessageSquare,
    rank: 1,
    submenu: [
      { title: "Meus Tickets", href: "/atendimento", description: "Minhas solicitações" },
      { title: "Novo Ticket", href: "/atendimento/novo", description: "Abrir chamado" },
      { title: "FAQ", href: "/atendimento/faq", description: "Perguntas frequentes" },
      { title: "Chat Online", href: "/atendimento/chat", description: "Suporte em tempo real" },
      { title: "Base de Conhecimento", href: "/atendimento/kb", description: "Documentação" },
    ],
  },

  {
    title: "Comunicados",
    href: "/comunicados",
    icon: Bell,
    rank: 1,
    submenu: [
      { title: "Avisos Gerais", href: "/comunicados", description: "Informações da empresa" },
      { title: "Mural", href: "/comunicados/mural", description: "Quadro de avisos" },
      { title: "Eventos", href: "/comunicados/eventos", description: "Calendário de eventos" },
      { title: "Treinamentos", href: "/comunicados/treinamentos", description: "Capacitação" },
    ],
  },

  // INTEGRAÇÕES
  {
    title: "Integrações",
    href: "/integracoes",
    icon: Zap,
    rank: 4,
    submenu: [
      { title: "API", href: "/integracoes/api", description: "Endpoints disponíveis" },
      { title: "Webhooks", href: "/integracoes/webhooks", description: "Notificações automáticas" },
      { title: "Importação", href: "/integracoes/importacao", description: "Importar dados" },
      { title: "Exportação", href: "/integracoes/exportacao", description: "Exportar dados" },
      { title: "Sincronização", href: "/integracoes/sync", description: "Sistemas externos" },
    ],
  },

  // CONFIGURAÇÕES
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
    rank: 4,
    submenu: [
      { title: "Sistema", href: "/configuracoes", description: "Configurações gerais" },
      { title: "Usuários", href: "/configuracoes/usuarios", description: "Gestão de usuários" },
      { title: "Permissões", href: "/configuracoes/permissoes", description: "Controle de acesso" },
      { title: "Segurança", href: "/configuracoes/seguranca", description: "Políticas de segurança" },
      { title: "Backup", href: "/configuracoes/backup", description: "Backup e restauração" },
      { title: "Logs", href: "/configuracoes/logs", description: "Auditoria do sistema" },
      { title: "Personalização", href: "/configuracoes/personalizacao", description: "Temas e layout" },
    ],
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const userRank = Number.parseInt(user?.rank || "1")
  const filteredMenuItems = menuItems.filter((item) => userRank >= item.rank)

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  const isItemActive = (item: MenuItem) => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((subItem) => pathname === subItem.href)
    }
    return false
  }

  const isSubItemActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-80 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 overflow-y-auto",
          "lg:translate-x-0 lg:static lg:z-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Sistema RH</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user?.matricula} • Rank {user?.rank}
                  {userRank >= 3 && <span className="text-blue-600 ml-1">• RH</span>}
                  {userRank >= 4 && <span className="text-purple-600 ml-1">• Admin</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/ponto"
                className="flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Clock className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Ponto</span>
              </Link>
              <Link
                href="/ferias/solicitar"
                className="flex items-center justify-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-600">Férias</span>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {filteredMenuItems.map((item) => {
              const isActive = isItemActive(item)
              const isExpanded = expandedItems.includes(item.href)
              const Icon = item.icon

              return (
                <div key={item.href} className="space-y-1">
                  <div
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer group",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                    onClick={() => {
                      if (item.submenu) {
                        toggleExpanded(item.href)
                      } else {
                        setIsOpen(false)
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {!item.submenu ? (
                        <Link href={item.href} className="flex items-center space-x-3 flex-1 min-w-0">
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{item.badge}</span>
                          )}
                        </Link>
                      ) : (
                        <>
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">{item.badge}</span>
                          )}
                        </>
                      )}
                    </div>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 space-y-1 py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block px-3 py-2 rounded-md text-sm transition-colors group",
                                isSubItemActive(subItem.href)
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-medium"
                                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800",
                              )}
                            >
                              <div className="font-medium">{subItem.title}</div>
                              {subItem.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{user?.matricula?.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.matricula}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userRank >= 4
                    ? "Administrador"
                    : userRank >= 3
                      ? "RH"
                      : userRank >= 2
                        ? "Supervisor"
                        : "Funcionário"}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair do Sistema
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
