import { Schema, model, Document } from 'mongoose'

interface ProdutoInterface extends Document{
  nome?: string
  valorVenda?: number
  marca?: string
  unidadeMedida?: string
  qtd?: number
  descricao?: string
  qtdMinima?: number
  status?: boolean
}

const Produto = new Schema({
  nome: { type: String, required: true },
  valorVenda: { type: Number, required: true },
  marca: { type: Schema.Types.ObjectId },
  unidadeMedida: { type: String, required: true },
  qtd: { type: Number, required: true },
  descricao: { type: String },
  qtdMinima: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true
})

export default model<ProdutoInterface>('Produto', Produto)
