import { Schema, model } from 'mongoose'

import { VendaInterface } from './../class/interface'

const Venda = new Schema({
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: 'Venda' },
    qtd: Number,
    valor: Number,
    desconto: Number
  }],
  valorTotal: { type: Number, required: true },
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' }
}, {
  timestamps: true
})

export default model<VendaInterface>('Venda', Venda)
