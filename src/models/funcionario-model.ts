import { Schema, model, Document } from 'mongoose'

interface FuncionarioInterface extends Document{
  nome?: string
  email?: string
  cpf?: string
  nascimento?: string
  celular?: string
  usuario?: string
  senha?: string
  permissao?: {
    _id: string,
    nome: string
  }
  status?: boolean
}

const Funcionario = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  nascimento: { type: Date, required: true },
  celular: { type: String, required: true },
  usuario: { type: String, required: true, lowercase: true, index: true },
  senha: { type: String, required: true, index: true },
  permissao: { type: Schema.Types.ObjectId, red: 'Permissao' },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: false
})
export default model<FuncionarioInterface>('Funcionario', Funcionario)
