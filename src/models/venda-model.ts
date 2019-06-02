import { Schema, model } from 'mongoose'

import { VendaInterface } from './../class/interface'

const Venda = new Schema({
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: 'Venda' },
    quantidade: Number,
    valor: Number,
    desconto: Number
  }],
  dataVenda: { type: Date, required: true, default: Date.now() },
  valorTotal: { type: Number, required: true },
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' }
}, {
  timestamps: false
})

export default model<VendaInterface>('Venda', Venda)
