import { Request, Response } from 'express'

import Venda from '../models/venda-model'
import Tipo from '../models/tipo-model'
import Movimento from '../models/movimento-model'
import Produto from '../models/produto-model'
import { VendaInterface, ProdutoInterface } from '../class/interface'
import { MovimentoClass } from '../class/class'

const createMovimento = (data: VendaInterface): Promise<boolean> => {
  return new Promise(async (resolve, reject): Promise<void> => {
    const movimentos: MovimentoClass[] = []

    const tipo = await Tipo.findOne({ nome: 'venda' }).select('_id')

    if (!tipo) reject(new Error('o tipo "venda" não existe no banco'))

    data.produtos.forEach((produto): void => {
      movimentos.push({ produto: produto.produto, tipo: tipo._id, quantidade: produto.quantidade, valor: produto.valor })
    })

    Movimento.create(movimentos)
      .then((): void => resolve(true))
      .catch((): void => reject(new Error('Erro ao salvar as movimentações')))
  })
}

const updateProduto = (data: VendaInterface): Promise<boolean> => {
  return new Promise(async (resolve, reject): Promise<void> => {
    const promises = []
    data.produtos.forEach((produto): void => {
      promises.push(Produto.findOneAndUpdate({ _id: produto.produto }, { $inc: { quantidade: -produto.quantidade } }))
    })

    Promise.all(promises)
      .then((): void => resolve(true))
      .catch((): void => reject(new Error('Erro ao atulizar produto')))
  })
}

class VendaController {
  public async vender (req: Request, res: Response): Promise<void> {
    createMovimento(req.body)
      .then((): Promise<VendaInterface> => {
        return Venda.create(req.body)
      })
      .then((): Promise<boolean> => {
        return updateProduto(req.body)
      })
      .then((): Response => res.status(200).json({ success: true, msg: 'Venda concluida' }))
      .catch((err): Response => res.status(200).json({ success: false, msg: err }))
  }

  public async getVendas (req: Request, res: Response): Promise<void> {
    const vendas = await Venda.find().select('-__v').populate('cliente', 'nome')

    // const newLista = vendas.map((produto: ProdutoInterface): ListaProdutos => {
    //   return {
    //     label: produto.nome,
    //     value: produto._id
    //   }
    // })

    res.status(200).send({ success: true, vendas })
  }

  public async getProdutos (req: Request, res: Response): Promise<void> {
    const produtos = await Produto.find()

    const newLista = produtos.map((produto: ProdutoInterface): ListaProdutos => {
      return {
        label: produto.nome,
        value: produto._id
      }
    })

    res.status(200).send({ success: true, produtos: newLista })
  }

  public async getProdutoById (req: Request, res: Response): Promise<void> {
    const produto = await Produto.findById({ _id: req.params.id }).select('valorVenda')

    res.status(200).send({ success: true, produto })
  }

  public async validateQuantidade (req: Request, res: Response): Promise<void> {
    const produto = await Produto.findById({ _id: req.params.id }).select('quantidade')

    const quantidade = parseInt(req.query.qtd)

    res.status(200).send({ success: true, validate: quantidade <= produto.quantidade })
  }
}

module.exports = new VendaController()

interface ListaProdutos {
  label: string;
  value: string
}
