import { Schema, model, Document } from 'mongoose'

interface PermissaoInterface extends Document{
  nome?: string
}

const Permissao = new Schema({
  nome: { type: String,
    required: true,
    lowercase: true,
    validate: [{
      validator: async (nome): Promise<boolean> => {
        let search = await model('Permissao').find({ nome: nome.toLowerCase() })

        if (search.length > 0) {
          return false
        }
      }
    }]
  }
}, {
  timestamps: false
})
export default model<PermissaoInterface>('Permissao', Permissao)
