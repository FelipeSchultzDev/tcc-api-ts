import { Request, Response } from 'express'

import * as msg from './../util/messages'
import Produto from '../models/produto-model'
import Marca from '../models/marca-model'
import Tipo from '../models/tipo-model'
import Movimento from '../models/movimento-model'
import { ProdutoInterface } from '../class/interface'

const createMovimento = (data, type: string): Promise<boolean> => {
  return new Promise(async (resolve, reject): Promise<void> => {
    const tipo = await Tipo.findOne({ nome: type })

    if (!tipo) reject(new Error(`O tipo "${type}" não existe no banco`))

    Movimento.create({ produto: data._id, tipo: tipo, quantidade: data.quantidade, valor: data.valor })
      .then((): void => resolve(true))
      .catch((err): void => {
        console.log(err)
        return reject(new Error('Erro ao criar movimento'))
      })
  })
}

class ProdutoController {
  public async ld (req: Request, res: Response): Promise<Response> {
    const produtos = await Produto.find({ status: false }).populate('marca unidadeMedida', 'nome -_id').select('-__v')

    if (produtos && produtos.length > 0) return res.status(200).json({ success: true, produtos: produtos })
    else if (produtos && !(produtos.length > 0)) return res.status(200).json({ success: false, msg: msg.notFound('Produto') })
    else return res.status(200).json({ success: false, msg: msg.errorGet('Produto') })
  }

  public async getById (req: Request, res: Response): Promise<Response> {
    const produto = await Produto.findById({ _id: req.params.id }).populate('marca unidadeMedida', 'nome _id').select('-__v')

    const marcas = await Marca.find({ status: true }).select('_id nome')
    const tipos = await Tipo.find({ tag: 'unidade' }).select('_id nome')

    const response = {
      marcas: marcas.map((marca): Combo => {
        return {
          label: marca.nome,
          value: marca._id
        }
      }),
      tipos: tipos.map((tipo): Combo => {
        return {
          label: tipo.nome,
          value: tipo._id
        }
      })
    }

    return res.status(200).json({ success: true, combo: response, produto })
  }

  public async valorMinimo (req: Request, res: Response): Promise<Response> {
    const produto = await Produto.findById({ _id: req.params.id }).select('quantidade')

    return res.status(200).json({ success: true, quantidade: produto.quantidade })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    const produtos = await Produto.find({ status: true }).populate('marca unidadeMedida', 'nome -_id').select('-__v')

    if (produtos && produtos.length > 0) return res.status(200).json({ success: true, produtos: produtos })
    else if (produtos && !(produtos.length > 0)) return res.status(200).json({ success: false, msg: msg.notFound('Produto') })
    else return res.status(200).json({ success: false, msg: msg.errorGet('Produto') })
  }

  public async comboOptions (req: Request, res: Response): Promise<Response> {
    const marcas = await Marca.find({ status: true }).select('_id nome')
    const tipos = await Tipo.find({ tag: 'unidade' }).select('_id nome')

    const response = {
      marcas: marcas.map((marca): Combo => {
        return {
          label: marca.nome,
          value: marca._id
        }
      }),
      tipos: tipos.map((tipo): Combo => {
        return {
          label: tipo.nome,
          value: tipo._id
        }
      })
    }

    return res.status(200).json({ success: true, combo: response })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    const validate = await Produto.findOne({ nome: req.body.nome.toLowerCase() })

    if (validate) return res.status(200).json({ success: false, msg: [msg.alreadyInsert('nome')] })

    const produto = await Produto.create(req.body)

    if (produto) return res.status(200).json({ success: true, msg: [msg.successInsert('Produto')] })

    return res.status(200).json({ success: false, msg: msg.errorInsert('Produto') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    const { _id, nome }: ProdutoInterface = { ...req.body }

    const validate = await Produto.find({ nome: nome })
    const errorList = []

    validate.forEach((produto): void => {
      if (produto.nome === nome.toLowerCase() && (`${produto._id}` !== _id)) errorList.push(msg.alreadyInsert('nome'))
    })

    if (errorList.length > 0) return res.status(200).json({ success: false, msg: errorList })

    const produto = await Produto.findOneAndUpdate({ _id: _id }, req.body)

    if (produto) return res.status(200).json({ success: true, msg: msg.successUpdate('Produto') })

    return res.status(200).json({ success: false, msg: msg.errorUpdate('Produto') })
  }

  public async entradaEstoque (req: Request, res: Response): Promise<void> {
    const { _id, quantidade }: ProdutoInterface = { ...req.body }

    Produto.findOneAndUpdate({ _id: _id }, { $inc: { quantidade: quantidade } })
      .then((): Promise<boolean> => {
        return createMovimento(req.body, 'entrada')
      })
      .then((): Response => res.status(200).json({ success: true, msg: msg.successUpdate('Produto') }))
      .catch((err): Response => {
        console.log(err)
        return res.status(200).json({ success: false, msg: msg.errorUpdate('Produto') })
      })
  }

  public async retiradaEstoque (req: Request, res: Response): Promise<Response> {
    const { _id, quantidade }: ProdutoInterface = { ...req.body }

    const validate = await Produto.findOne({ _id: _id })

    if (!validate) return res.status(200).json({ success: false, msg: msg.notFoundId('Produto') })
    else if (validate.quantidade < quantidade) return res.status(200).json({ success: false, msg: 'Quantidade de retirada inválida' })

    Produto.findOneAndUpdate({ _id: _id }, { $inc: { quantidade: -quantidade } })
      .then((): Promise<boolean> => {
        req.body.valor = 0
        return createMovimento(req.body, 'retirada')
      })
      .then((): Response => res.status(200).json({ success: true, msg: msg.successUpdate('Produto') }))
      .catch((): Response => res.status(200).json({ success: false, msg: msg.errorUpdate('Produto') }))
  }

  public async desativar (req: Request, res: Response): Promise<void> {
    Produto.findByIdAndUpdate(req.body._id, { status: false })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.disabled('Produto') })
      })
      .catch((): Response => {
        return res.status(200).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async ativar (req: Request, res: Response): Promise<void> {
    Produto.findByIdAndUpdate(req.body._id, { status: true })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.enabled('Produto') })
      })
      .catch((): Response => {
        return res.status(200).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async deletar (req: Request, res: Response): Promise<Response> {
    const movimento = await Movimento.findOne({ produto: req.body._id })
    if (movimento) return res.status(200).json({ success: false, msg: msg.cantDelete('Produto') })

    await Produto.findByIdAndDelete(req.body._id)

    return res.status(200).json({ success: true, msg: msg.successDelete('Produto') })
  }
}
export default new ProdutoController()

interface Combo {
  label: string
  value: any
};
