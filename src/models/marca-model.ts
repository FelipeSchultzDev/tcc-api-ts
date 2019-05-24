import { Schema, model } from 'mongoose'

import { MarcaInterface } from './../class/interface'

const Marca = new Schema({
  nome: { type: String, required: true, lowercase: true },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: false
})
export default model<MarcaInterface>('Marca', Marca)
