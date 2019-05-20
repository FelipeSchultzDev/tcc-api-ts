import { Schema, model, Document } from 'mongoose'

interface MovimentoInterface extends Document{
  produto?: string
  tipo?: string
  qtd?: number
  valor?: number
}

const Movimento = new Schema({
  produto: { type: Schema.Types.ObjectId, required: true },
  tipo: { type: String, required: true },
  qtd: { type: Number, required: true },
  valor: { type: Number, required: true }
}, {
  timestamps: true
})

export default model<MovimentoInterface>('Movimento', Movimento)
