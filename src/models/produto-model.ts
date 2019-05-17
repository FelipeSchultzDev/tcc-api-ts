import mongoose from 'mongoose'
import { alreadyInsert } from './../util/messages'

const Produto = new mongoose.Schema({
  nome: { type: String,
    required: true,
    validate: [{
      validator: async (cpf): Promise<boolean> => {
        let search = await mongoose.model('Produto').find({ cpf: cpf })

        if (search.length > 0) {
          return false
        }
      },
      msg: alreadyInsert('Nome')
    }] },
  valorVenda: { type: Number, required: true },
  marca: { type: mongoose.Schema.Types.ObjectId },
  unidadeMedida: { type: String, required: true },
  qtd: { type: Number, required: true },
  descricao: { type: String },
  qtdMinima: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: true
})

export default mongoose.model('Produto', Produto)
