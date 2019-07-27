import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from './../class/class'

class LoginValidation {
  public async doLogin (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const options: FieldOptions = {
      usuario: true,
      senha: true
    }

    const { msg, data } = await util.verifyFields(req.body, options)

    if (msg.length > 0) return res.status(200).json({ success: false, msg: msg })

    req.body = data
    next()
  }
}
export default new LoginValidation()
