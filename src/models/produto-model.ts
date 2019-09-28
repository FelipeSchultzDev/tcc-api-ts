import { Schema, model } from 'mongoose'

import { ProdutoInterface } from './../class/interface'

const Produto = new Schema({
  nome: { type: String, required: true },
  barcode: { type: String, required: true },
  valorVenda: { type: Number, required: true },
  marca: { type: Schema.Types.ObjectId, required: false, ref: 'Marca' },
  unidadeMedida: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
  quantidade: { type: Number, required: true },
  descricao: { type: String },
  qtdMinima: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true
})

export default model<ProdutoInterface>('Produto', Produto)
