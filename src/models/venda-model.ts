import { Schema, model } from 'mongoose'

import { VendaInterface } from './../class/interface'

const Venda = new Schema({
  produtos: [{
    produto: { type: Schema.Types.ObjectId, red: 'Venda' },
    qtd: Number,
    valor: Number,
    desconto: Number
  }]
}, {
  timestamps: true
})

export default model<VendaInterface>('Venda', Venda)
