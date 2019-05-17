import mongoose from 'mongoose'

const Permissao = new mongoose.Schema({
  nome: { type: String,
    required: true,
    lowercase: true,
    validate: [{
      validator: async (nome): Promise<boolean> => {
        let search = await mongoose.model('Permissao').find({ nome: nome.toLowerCase() })

        if (search.length > 0) {
          return false
        }
      }
    }]
  }
}, {
  timestamps: false
})
export default mongoose.model('Permissao', Permissao)
