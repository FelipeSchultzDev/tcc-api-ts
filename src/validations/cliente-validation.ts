import { FieldOptions } from './../class/class'
import { Request, Response, NextFunction } from 'express'

import util from './../util/util'

class ClienteValidation {
  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const options: FieldOptions = {
      nome: true,
      cpf: true,
      nascimento: true,
      model: 'Cliente'
    }

    let { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id
    const options: FieldOptions = {
      _id: true,
      model: 'Cliente'
    }
    let { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async getById (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    req.body._id = req.params.id

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }
}

export default new ClienteValidation()
