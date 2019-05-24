import { Schema, model } from 'mongoose'

import { TipoInterface } from './../class/interface'

const Tipo = new Schema({
  nome: { type: String,
    required: true,
    validate: [{
      validator: async (nome): Promise<boolean> => {
        let search = await model('Tipo').find({ nome: nome.toLowerCase() })

        if (search.length > 0) {
          return false
        }
      }
    }]
  },
  tag: { type: String, required: true }
}, {
  timestamps: false
})

export default model<TipoInterface>('Tipo', Tipo)
