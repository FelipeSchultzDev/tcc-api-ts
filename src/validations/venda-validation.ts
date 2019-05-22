import { Request, Response, NextFunction } from 'express'

import util from './../util/util'

class VendaValidation {
  public async vender (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true, funcionario: true })) return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })

    let { msg, data } = await util.verifyFields(req.body, { _id: true })
    req.body = data

    if (!(msg.length > 0)) next()
    return res.status(400).json({ success: false, msg: msg })
  }
}

export default new VendaValidation()
