// Tipos baseados no schema MySQL fornecido
export interface CarteiraDeIdentidade {
  id: string
  cpf: string
  rg: string
  nome_completo: string
  nome_da_mae: string
  nome_do_pai: string
  sexo: "Masculino" | "Feminino"
  data_nascimento?: Date
  raca_cor?: "Preto" | "Branco" | "Amarelo"
  estado_civil: "Solteiro" | "Viuvo" | "Casado"
  orgao_expedidor: string
  data_expedicao?: string
  foto_identidade_frente?: string
  foto_identidade_verso?: string
}

export interface Endereco {
  cep: string
  numero?: string
  logradouro: string
  cidade: string
  complemento?: string
  bairro: string
  uf: string
  foto_comprovante_residencia?: string
}

export interface Funcionario {
  matricula: string
  foto_funcionario?: string
  rank: "1" | "2" | "3" | "4" | "5"
  senha: string
}

export interface Banco {
  idBanco: number
  banco: string
  tipo_conta: "Corrente" | "Poupança" | "Empregado"
  agencia: string
  conta: string
  chave_pix: string
  funcionario: string
}

export interface Departamento {
  idDepartamento: string
  nome: string
  sigla: string
  descricao?: string
  gerente: string
  localizacao?: string
}

export interface JornadaTrabalho {
  idJornadaTrabalho: number
  turno: string
  hora_inicio: string
  hora_fim: string
  duracao_intervalo: number
  tolerancia_atraso: number
  tolerancia_saida: number
  permitir_extra: boolean
  limite_extra?: number
}

export interface Cargo {
  idCargo: number
  nome: string
  nivel?: "Pleno" | "Sênior" | "Júnior" | "Estagiário"
  salario_base?: number
  descricao?: string
  ativo?: boolean
  departamento: string
  jornada_trabalho: number
}

export interface CarteiraDeTrabalho {
  ctps: string
  serie_ctps: string
  uf: string
  pis_pasep?: string
  foto_cpts?: string
}

export interface TituloEleitor {
  idTituloEleitor: string
  zona_eleitoral?: string
  secao_eleitoral?: string
}

export interface Pessoa {
  idPessoa: number
  endereco: string
  titulo_eleitor: string
  carteira_identidade: string
  numero_celular?: string
  email_pessoal?: string
  carteira_trabalho: string
}

export interface FormacaoAcademica {
  idFormacaoAcademica: number
  instituicao?: string
  curso?: string
  nivel?:
    | "Técnico"
    | "Pós-graduação"
    | "Superior"
    | "Ensino médio"
    | "Mestrado"
    | "Doutorado"
    | "Ensino fundamental"
    | "Phd"
  situacao?: "Completo" | "Incompleto" | "Cursando" | "Trancado"
  pessoa: number
}

export interface Dependente {
  cpf: string
  nome_completo?: string
  data_nascimentoo?: Date
  dependente_irrf?: boolean
  bolsa_familia?: boolean
  pessoa: number
}

export interface ExperienciaProfissional {
  idExperienciaProfissional: number
  cargo?: string
  empresa?: string
  descricao?: string
  data_inicio?: Date
  data_fim?: Date
}

export interface CentroDeCusto {
  idCentroDeCusto: string
  descricao?: string
  nome?: string
  data_criacao?: Date
  conta_contabil?: string
  departamento: string
}

export interface Dispositivo {
  idDispositivo: string
  modelo?: string
  localizacao?: string
  online?: boolean
}

export interface MarcacaoDePonto {
  idMarcacaoDePonto: string
  funcionario: string
  dispositivo: string
  data_hora: Date
  tipo_marcacao: "Entrada" | "Saída" | "Intervalo" | "Retorno"
  status: "Válida" | "Duplicada" | "Rejeitada"
  metodo_autenticacao: "biometria" | "cartão" | "senha" | "facial"
  assinatura_digital: string
  data_registro?: Date
}

export interface ContratoTrabalho {
  idContratoTrabalho: number
  data_admissao: Date
  data_rescisao?: Date
  tipo_contrato: "CLT" | "Pessoa Júridica" | "Estágio" | "Temporário" | "Terceirizado"
  status: "Ativo" | "Encerrado" | "Pendente" | "Rescindido" | "Suspenso" | "Cancelado"
  observacoes?: string
  salario_contratual: number
  funcionario: string
  departamento: string
  jornada_trabalho: number
  cargo: number
}

export interface SolicitacaoDeFerias {
  idSolicitacaoDeFerias: number
  aprovador_por: string
  funcionario: string
  data_inicio_solicitacao?: Date
  data_fim_solicitacao?: Date
  dias?: number
  data_pagamento?: Date
  data_aprovacao?: Date
  status?: "Pendente" | "Em gozo" | "Concluído" | "Rejeitado" | "Aprovado" | "Cancelado"
  resposta?: string
}

export interface Licencas {
  idLicenca: number
  funcionario: string
  data_inicio?: Date
  data_fim?: Date
  motivo?: string
  anexo?: string
  status?: "Pendente de Documento" | "Rejeitada" | "Concluída" | "Ativa"
}

// Tipos para o sistema de autenticação
export interface AuthUser {
  matricula: string
  rank: string
  token: string
  nome?: string
}

// Tipos para dados completos do funcionário
export interface FuncionarioCompleto extends Funcionario {
  pessoa?: Pessoa
  carteira_identidade?: CarteiraDeIdentidade
  endereco?: Endereco
  banco?: Banco
  contrato?: ContratoTrabalho
  cargo_info?: Cargo
  departamento_info?: Departamento
  formacao?: FormacaoAcademica[]
  dependentes?: Dependente[]
  experiencias?: ExperienciaProfissional[]
}
