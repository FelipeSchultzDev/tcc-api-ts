import mongoose from 'mongoose'
import { alreadyInsert } from './../util/messages'

const Cliente = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String,
    required: true,
    validate: [{
      validator: async (cpf): Promise<boolean> => {
        let search = await mongoose.model('Cliente').find({ cpf: cpf })

        if (search.length > 0) {
          return false
        }
      },
      msg: alreadyInsert('cpf')
    }] },
  nascimento: { type: Date, required: true },
  celular: { type: String, required: true },
  compras: [{ type: mongoose.Schema.Types.ObjectId, red: 'Venda' }]
}, {
  timestamps: true
})

export default mongoose.model('Cliente', Cliente)
