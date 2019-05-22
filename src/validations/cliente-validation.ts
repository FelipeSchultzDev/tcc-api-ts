import { FieldOptions } from './../class/class'
import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { noAuth } from './../util/messages'

class ClienteValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) return res.status(203).json({ success: false, msg: noAuth() })
    next()
  }

  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const options: FieldOptions = {
      nome: true,
      email: true,
      cpf: true,
      nascimento: true,
      celular: true,
      model: 'client'
    }

    let { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const options: FieldOptions = {
      _id: true,
      nome: true,
      email: true,
      cpf: true,
      nascimento: true,
      celular: true,
      model: 'Cliente'
    }
    let { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Cliente' })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }
}

export default new ClienteValidation()
