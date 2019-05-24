import { MarcaInterface } from './../class/interface'
import { Request, Response } from 'express'

import Marca from './../models/marca-model'
import Produto from './../models/produto-model'
import * as msg from './../util/messages'

class MarcaController {
  public async ld (req: Request, res: Response): Promise<Response> {
    const marcas = await Marca.find({ status: false }).select('-__v')

    if (marcas && marcas.length > 0) return res.status(200).json({ success: true, marcas: marcas })
    else if (marcas && !(marcas.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Marca') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Marca') })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    const marcas = await Marca.find({ status: true }).select('-__v')

    if (marcas && marcas.length > 0) return res.status(200).json({ success: true, marcas: marcas })
    else if (marcas && !(marcas.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Marca') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Marca') })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    const data: MarcaInterface = { ...req.body }
    const validate = await Marca.findOne({ nome: data.nome })

    if (validate) return res.status(400).json({ success: false, msg: msg.alreadyInsert('Marca') })

    const marca = await Marca.create(data)

    if (marca) return res.status(200).json({ success: true, msg: msg.successInsert('Marca') })

    return res.status(400).json({ success: false, msg: msg.errorInsert('Marca') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    const data = { ...req.body }
    const validate = await Marca.findOne({ nome: data.nome })

    if (validate && !(`${validate._id}` === data._id)) return res.status(400).json({ success: false, msg: msg.alreadyInsert('Nome') })

    const marca = await Marca.findOneAndUpdate({ _id: data._id }, data)

    if (marca) return res.status(200).json({ success: true, msg: msg.successUpdate('Marca') })

    return res.status(400).json({ success: false, msg: msg.errorUpdate('Marca') })
  }

  public async desativar (req: Request, res: Response): Promise<void> {
    Marca.findByIdAndUpdate(req.body._id, { status: false })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.disabled('Marca') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async ativar (req: Request, res: Response): Promise<void> {
    Marca.findByIdAndUpdate(req.body._id, { status: true })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.enabled('Marca') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async deletar (req: Request, res: Response): Promise<Response> {
    const produto = await Produto.findOne({ marca: req.body._id })

    if (produto) return res.status(400).json({ success: false, msg: msg.cantDelete('Marca') })

    await Marca.findByIdAndDelete(req.body._id)

    return res.status(200).json({ success: true, msg: msg.successDelete('Marca') })
  }
}

export default new MarcaController()
