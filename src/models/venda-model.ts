import { Schema, model, Document } from 'mongoose'

interface VendaInterface extends Document{
  funcionario?: string
  produtos?: ProdutoVenda[]
}

const Venda = new Schema({
  funcionario: { type: Schema.Types.ObjectId, red: 'Funcionario', required: true },
  produtos: [{
    idProduto: { type: Schema.Types.ObjectId, red: 'Venda' },
    qtd: Number,
    valor: Number
  }]
}, {
  timestamps: true
})

export default model<VendaInterface>('Venda', Venda)

export class ProdutoVenda {
  public id: string
  public qtd: number
  public valor: number
}
