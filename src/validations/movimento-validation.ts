import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { noAuth } from '../util/messages'

class MovimentoValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) return res.status(203).json({ success: false, msg: noAuth() })
    next()
  }
}

module.exports = new MovimentoValidation()
