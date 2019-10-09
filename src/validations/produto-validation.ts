import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from '../class/class'

class ProdutoValidation {
  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const options: FieldOptions = {
      nome: true,
      valorVenda: true,
      unidadeMedida: true,
      quantidade: true,
      qtdMinima: true,
      model: 'Produto'
    }

    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const options: FieldOptions = {
      _id: true,
      nome: true,
      model: 'Produto'
    }
    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async entradaEstoque (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const options: FieldOptions = {
      _id: true,
      quantidade: true,
      model: 'Produto'
    }

    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async retiradaEstoque (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const options: FieldOptions = {
      _id: true,
      quantidade: true,
      model: 'Produto'
    }

    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }
}

export default new ProdutoValidation()
