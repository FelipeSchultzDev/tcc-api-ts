import { Schema, model } from 'mongoose'

import { TipoInterface } from './../class/interface'

const Tipo = new Schema({
  nome: { type: String, required: true },
  tag: { type: String, required: true }
}, {
  timestamps: false
})

export default model<TipoInterface>('Tipo', Tipo)
