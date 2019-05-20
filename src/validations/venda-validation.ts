import { Request, Response, NextFunction } from 'express'

import util from './../util/util'

class VendaValidation {
  public async searchById (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authList = ['admin', 'financeiro']
    if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let fields = ['id']
    let result = util.verifyFields(fields, req.body)
    let msg = result.msg
    req.body = result.data

    if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
    else next()
  }

  public async search (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authList = ['admin', 'financeiro']
    if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
    else next()
  }

  public async insert (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authList = ['admin']
    if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let fields = ['nome', 'email', 'cpf', 'nascimento', 'celular']
    let result = util.verifyFields(fields, req.body)
    let msg = result.msg
    req.body = result.data

    if (!msg.length > 0) return next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async update (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authList = ['admin']
    if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let fields = ['id', 'nome', 'email', 'cpf', 'nascimento', 'celular']
    let result = util.verifyFields(fields, req.body)
    let msg = result.msg
    req.body = result.data

    if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
    else next()
  }

  public async delete (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const authList = ['admin', 'financeiro']
    if (!util.verifyAuth(res.locals.user.permissao, authList)) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let fields = ['id']
    let result = util.verifyFields(fields, req.body)
    let msg = result.msg
    req.body = result.data

    if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
    else next()
  }
}

module.exports = new VendaValidation()
