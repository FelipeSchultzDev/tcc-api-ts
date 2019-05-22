import { Schema, model, Document } from 'mongoose'

interface TipoInterface extends Document {
    nome?: string
}

const Tipo = new Schema({
  nome: { type: String, required: true },
  tag: { type: String, required: true }
}, {
  timestamps: false
})

export default model<TipoInterface>('Tipo', Tipo)
