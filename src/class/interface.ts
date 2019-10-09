import { Document } from 'mongoose'

import { Compras, ProdutoVenda } from '../class/class'

export interface AcessosInterface extends Document {
    usuario?: string
    senha?: string
}

export interface ClienteInterface extends Document {
    nome?: string
    email?: string
    cpf?: string
    nascimento?: string
    celular?: string
    compras?: Compras[]
}

export interface MarcaInterface extends Document {
    nome?: string
    status?: boolean
}

export interface MovimentoInterface extends Document {
    produto?: string
    tipo?: string
    quantidade?: number
    valor?: number
}

export interface ProdutoInterface extends Document {
    nome?: string
    valorVenda?: number
    marca?: string
    unidadeMedida?: string
    quantidade?: number
    descricao?: string
    qtdMinima?: number
    status?: boolean
}

export interface TipoInterface extends Document {
    nome?: string
}

export interface VendaInterface extends Document {
    produtos?: ProdutoVenda[]
}
