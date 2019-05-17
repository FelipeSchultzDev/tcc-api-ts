import mongoose from 'mongoose'

const Marca = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    lowercase: true,
    validate: [{
      validator: async (nome): Promise<boolean> => {
        let search = await mongoose.model('Marca').find({ nome: nome.toLowerCase() })

        if (search.length > 0) {
          return false
        }
      },
      msg: 'A marca já está cadastrada'
    }]
  },
  status: { type: Boolean, required: true, default: true }
}, {
  timestamps: false
})
export default mongoose.model('Marca', Marca)
