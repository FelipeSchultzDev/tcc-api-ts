import { Schema, model } from 'mongoose'

import { MovimentoInterface } from './../class/interface'

const Movimento = new Schema({
  produto: { type: Schema.Types.ObjectId, red: 'Produto', required: true },
  tipo: { type: Schema.Types.ObjectId, red: 'Tipo', required: true },
  quantidade: { type: Number, required: true },
  valor: { type: Number, required: true }
}, {
  timestamps: true
})

export default model<MovimentoInterface>('Movimento', Movimento)
