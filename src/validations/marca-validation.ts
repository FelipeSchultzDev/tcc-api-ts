import { Request, Response, NextFunction } from 'express'

import util from './../util/util'

class MarcaValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) next()
    else return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
  }

  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { nome: true, model: 'Marca' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, nome: true, model: 'Marca' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Marca' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Marca' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Marca' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }
}

export default new MarcaValidation()
