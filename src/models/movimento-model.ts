import mongoose from 'mongoose'

const Movimento = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, required: true },
  tipo: { type: Number, required: true },
  qtd: { type: Number, required: true },
  valor: { type: Number, required: true }
}, {
  timestamps: true
})

export default mongoose.model('Movimento', Movimento)
