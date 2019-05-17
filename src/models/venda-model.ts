import mongoose from 'mongoose'

const Venda = new mongoose.Schema({
  idFuncionario: { type: mongoose.Schema.Types.ObjectId, red: 'Funcionario', required: true },
  produtos: [{
    idProduto: { type: mongoose.Schema.Types.ObjectId, red: 'Venda' },
    qtd: Number,
    valor: Number
  }]
}, {
  timestamps: true
})

export default mongoose.model('Venda', Venda)
