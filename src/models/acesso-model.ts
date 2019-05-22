import { Schema, model, Document } from 'mongoose'

interface AcessosInterface extends Document{
  usuario?: string
  senha?: string
}

const Acessos = new Schema({
  usuario: {
    type: String,
    required: true,
    lowercase: true,
    validate: [{
      validator: async (usuario): Promise<boolean> => {
        let search = await model('Acessos').find({ usuario: usuario.toLowerCase() })

        if (search.length > 0) {
          return false
        }
      }
    }]
  },
  senha: { type: String, required: true }
}, {
  timestamps: false
})
export default model<AcessosInterface>('Acessos', Acessos)
