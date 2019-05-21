import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from '../class/class'

class FuncionarioValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
    next()
  }

  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    const options: FieldOptions = {
      nome: true,
      email: true,
      cpf: true,
      nascimento: true,
      celular: true,
      usuario: true,
      senha: true
    }

    let { msg, data } = util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    const options: FieldOptions = {
      _id: true,
      nome: true,
      email: true,
      cpf: true,
      nascimento: true,
      celular: true,
      usuario: true,
      senha: true
    }
    let { msg, data } = util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = util.verifyFields(req.body, { _id: true })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = util.verifyFields(req.body, { _id: true })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = util.verifyFields(req.body, { _id: true })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }
}

export default new FuncionarioValidation()
