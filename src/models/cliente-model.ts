import { Schema, model, Document } from 'mongoose'
import { Compras } from '../class/class'

interface ClienteInterface extends Document{
  nome?: string
  email?: string
  cpf?: string
  nascimento?: string
  celular?: string
  compras?: Compras[]
}

const Cliente = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  nascimento: { type: Date, required: true },
  celular: { type: String, required: true },
  compras: [{ type: Schema.Types.ObjectId, red: 'Venda' }]
}, {
  timestamps: true
})

export default model<ClienteInterface>('Cliente', Cliente)
