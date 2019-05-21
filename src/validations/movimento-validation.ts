import { Request, Response, NextFunction } from 'express'

import util from './../util/util'

class MovimentoValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
    next()
  }
}

module.exports = new MovimentoValidation()
