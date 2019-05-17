import mongoose from 'mongoose'
// import { alreadyInsert, idPermission } from './../util/messages'
// const validator = require('mongoose-unique-validator')

const Funcionario = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  nascimento: { type: Date, required: true },
  celular: { type: String, required: true },
  usuario: { type: String, required: true, lowercase: true, index: true },
  senha: { type: String, required: true, index: true },
  permissao: { type: mongoose.Schema.Types.ObjectId },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: false
})
// Funcionario.plugin(validator, { message: '{PATH} já existente!' })
export default mongoose.model('Funcionario', Funcionario)
