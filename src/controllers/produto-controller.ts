import { Request, Response } from 'express'

import * as msg from './../util/messages'
import Produto from '../models/produto-model'
import Movimento from '../models/movimento-model'
import { ProdutoInterface } from '../class/interface'

class ProdutoController {
  public async ld (req: Request, res: Response): Promise<Response> {
    const produto = await Produto.find({ status: false }).populate('marca unidadeMedida', 'nome -_id').select('-__v')

    if (produto && produto.length > 0) return res.status(200).json({ success: true, produto: produto })
    else if (produto && !(produto.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Produto') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Produto') })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    const produto = await Produto.find({ status: true }).populate('marca unidadeMedida', 'nome -_id').select('-__v')

    if (produto && produto.length > 0) return res.status(200).json({ success: true, produto: produto })
    else if (produto && !(produto.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Produto') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Produto') })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    const validate = await Produto.findOne({ nome: req.body.nome })

    if (validate) return res.status(400).json({ success: false, msg: [msg.alreadyInsert('Produto')] })

    const produto = await Produto.create(req.body)

    if (produto) return res.status(200).json({ success: true, msg: [msg.successInsert('Produto')] })

    return res.status(400).json({ success: false, msg: msg.errorInsert('Produto') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    const data: ProdutoInterface = { ...req.body }
    const validate = await Produto.findOne({ nome: data.nome })

    if (validate && !(`${validate._id}` === data._id)) return res.status(400).json({ success: false, msg: msg.alreadyInsert('Nome') })

    const produto = await Produto.findOneAndUpdate({ _id: data._id }, data)

    if (produto) return res.status(200).json({ success: true, msg: msg.successUpdate('Produto') })

    return res.status(400).json({ success: false, msg: msg.errorUpdate('Produto') })
  }

  public async desativar (req: Request, res: Response): Promise<void> {
    Produto.findByIdAndUpdate(req.body._id, { status: false })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.disabled('Produto') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async ativar (req: Request, res: Response): Promise<void> {
    Produto.findByIdAndUpdate(req.body._id, { status: true })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.enabled('Produto') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async deletar (req: Request, res: Response): Promise<Response> {
    const movimento = await Movimento.findOne({ produto: req.body._id })
    if (movimento) return res.status(400).json({ success: false, msg: msg.cantDelete('Produto') })

    await Produto.findByIdAndDelete(req.body._id)

    return res.status(200).json({ success: true, msg: msg.successDelete('Produto') })
  }
}
export default new ProdutoController()
