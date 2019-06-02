import { Schema, model } from 'mongoose'

import { MovimentoInterface } from './../class/interface'

const Movimento = new Schema({
  produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
  dataVenda: { type: Date, required: true, default: Date.now() },
  tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
  quantidade: { type: Number, required: true },
  valor: { type: Number, required: true }
}, {
  timestamps: false
})

export default model<MovimentoInterface>('Movimento', Movimento)
