import { Schema, model, Document } from 'mongoose'

interface MovimentoTipoInterface extends Document {
    nome?: string
}

const Movimento = new Schema({
  nome: { type: String, required: true }
}, {
  timestamps: false
})

export default model<MovimentoTipoInterface>('MovimentoTipo', Movimento)
