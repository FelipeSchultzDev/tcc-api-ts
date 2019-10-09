import { Schema, model } from 'mongoose'

import { ClienteInterface } from './../class/interface'

const Cliente = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  cpf: { type: String, required: true },
  nascimento: { type: Date, required: true },
  celular: { type: String, required: false, default: '' },
  compras: [{ type: Schema.Types.ObjectId, ref: 'Venda' }],
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true
})

export default model<ClienteInterface>('Cliente', Cliente)
