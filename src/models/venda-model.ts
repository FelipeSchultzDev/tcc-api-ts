import { Schema, model, Document } from 'mongoose'
import { ProdutoVenda } from '../class/class'

interface VendaInterface extends Document{
  produtos?: ProdutoVenda[]
}

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
