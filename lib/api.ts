import type { AuthUser } from "./types"
import { mockFuncionarios } from "./mock-data"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Adicionar token de autenticação se disponível
    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage")
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage)
          if (authData.state?.user?.token) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${authData.state.user.token}`,
            }
          }
        } catch (error) {
          console.error("Erro ao parsear auth storage:", error)
        }
      }
    }

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Para desenvolvimento, retornar dados mock
    if (endpoint.includes("/funcionarios")) {
      return mockFuncionarios as T
    }

    // Simular resposta da API
    return {} as T
  }

  // Auth - Simulação para testes
  async login(matricula: string, senha: string): Promise<AuthUser> {
    console.log("API: Tentando login com", { matricula, senha })

    // Simulação de delay da API
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Buscar funcionário nos dados mock
    const funcionario = mockFuncionarios.find(
      (f) => f.matricula.toLowerCase() === matricula.toLowerCase() && f.senha === senha,
    )

    if (funcionario) {
      const authUser = {
        matricula: funcionario.matricula,
        rank: funcionario.rank,
        token: `fake-token-${Date.now()}`,
        nome: funcionario.carteira_identidade?.nome_completo,
      }
      console.log("API: Login bem-sucedido", authUser)
      return authUser
    }

    console.log("API: Credenciais inválidas")
    throw new Error("Credenciais inválidas")
  }

  // Funcionários
  async getFuncionarios() {
    return this.request("/funcionarios")
  }

  async getFuncionario(matricula: string) {
    return this.request(`/funcionarios/${matricula}`)
  }

  async createFuncionario(data: any) {
    return this.request("/funcionarios", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Contratos
  async getContratos() {
    return this.request("/contratos")
  }

  // Marcações de Ponto
  async getMarcacoes(funcionario?: string, dataInicio?: string, dataFim?: string) {
    const params = new URLSearchParams()
    if (funcionario) params.append("funcionario", funcionario)
    if (dataInicio) params.append("dataInicio", dataInicio)
    if (dataFim) params.append("dataFim", dataFim)

    return this.request(`/marcacoes?${params.toString()}`)
  }

  // Férias
  async getSolicitacaoFerias() {
    return this.request("/ferias")
  }

  async createSolicitacaoFerias(data: any) {
    return this.request("/ferias", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Departamentos
  async getDepartamentos() {
    return this.request("/departamentos")
  }

  // Upload de arquivos
  async uploadFile(file: File, path: string): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("path", path)

    return this.request("/upload", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type para FormData
    })
  }
}

export const api = new ApiClient(API_BASE_URL)
