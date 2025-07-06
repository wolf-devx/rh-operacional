"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Users, Shield, Database, Bell, Lock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PermissionGuard } from "@/components/ui/permission-guard"

const configSections = [
  {
    title: "Sistema",
    icon: Settings,
    description: "Configurações gerais do sistema",
  },
  {
    title: "Usuários",
    icon: Users,
    description: "Gerenciamento de usuários e permissões",
  },
  {
    title: "Segurança",
    icon: Shield,
    description: "Configurações de segurança e autenticação",
  },
  {
    title: "Backup",
    icon: Database,
    description: "Backup e restauração de dados",
  },
]

export default function ConfiguracoesPage() {
  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const [notificacoesPush, setNotificacoesPush] = useState(false)
  const [modoManutencao, setModoManutencao] = useState(false)

  return (
    <DashboardLayout>
      <PermissionGuard requiredRank={4}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
            <p className="text-gray-600 dark:text-gray-400">Gerencie as configurações do sistema</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {configSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Configuration Tabs */}
          <Tabs defaultValue="sistema" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sistema">Sistema</TabsTrigger>
              <TabsTrigger value="usuarios">Usuários</TabsTrigger>
              <TabsTrigger value="seguranca">Segurança</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            <TabsContent value="sistema" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Configurações Gerais</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                      <Input id="nome-empresa" defaultValue="Empresa XYZ Ltda" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select defaultValue="america-sao_paulo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                          <SelectItem value="america-new_york">América/Nova York</SelectItem>
                          <SelectItem value="europe-london">Europa/Londres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Modo Manutenção</Label>
                        <p className="text-sm text-gray-500">Bloquear acesso ao sistema</p>
                      </div>
                      <Switch checked={modoManutencao} onCheckedChange={setModoManutencao} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Notificações</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-gray-500">Enviar alertas por email</p>
                      </div>
                      <Switch checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-gray-500">Notificações no navegador</p>
                      </div>
                      <Switch checked={notificacoesPush} onCheckedChange={setNotificacoesPush} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-admin">Email do Administrador</Label>
                      <Input id="email-admin" type="email" defaultValue="admin@empresa.com" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="usuarios" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Gerenciamento de Usuários</span>
                  </CardTitle>
                  <CardDescription>Configure permissões e níveis de acesso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Rank 1-2</CardTitle>
                          <CardDescription>Funcionários</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1">
                            <li>• Ponto eletrônico</li>
                            <li>• Férias básicas</li>
                            <li>• Perfil pessoal</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Rank 3</CardTitle>
                          <CardDescription>RH</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1">
                            <li>• Gestão de funcionários</li>
                            <li>• Admissões</li>
                            <li>• Relatórios</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Rank 4-5</CardTitle>
                          <CardDescription>Administradores</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1">
                            <li>• Acesso total</li>
                            <li>• Configurações</li>
                            <li>• Folha de pagamento</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seguranca" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Autenticação</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tempo de Sessão (minutos)</Label>
                      <Input type="number" defaultValue="480" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tentativas de Login</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autenticação 2FA</Label>
                        <p className="text-sm text-gray-500">Exigir segundo fator</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Políticas de Senha</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tamanho Mínimo</Label>
                      <Input type="number" defaultValue="8" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Caracteres Especiais</Label>
                        <p className="text-sm text-gray-500">Exigir símbolos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Números Obrigatórios</Label>
                        <p className="text-sm text-gray-500">Pelo menos um número</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Backup e Restauração</span>
                  </CardTitle>
                  <CardDescription>Gerencie backups automáticos e manuais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Automático</h3>
                      <div className="space-y-2">
                        <Label>Frequência</Label>
                        <Select defaultValue="diario">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diario">Diário</SelectItem>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="mensal">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Horário</Label>
                        <Input type="time" defaultValue="02:00" />
                      </div>
                      <div className="space-y-2">
                        <Label>Retenção (dias)</Label>
                        <Input type="number" defaultValue="30" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Backup Manual</h3>
                      <div className="space-y-4">
                        <Button className="w-full">Criar Backup Agora</Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Restaurar Backup
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Download Backup
                        </Button>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Último backup: 06/01/2024 02:00</p>
                        <p>Status: ✅ Sucesso</p>
                        <p>Tamanho: 2.4 GB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg">Salvar Configurações</Button>
          </div>
        </div>
      </PermissionGuard>
    </DashboardLayout>
  )
}
