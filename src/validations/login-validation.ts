import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from './../class/class'

class LoginValidation {
  public async doLogin (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const options: FieldOptions = {
      usuario: true,
      senha: true
    }

    console.log(req.body)

    const { msg, data } = util.verifyFields(req.body, options)

    if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })

    req.body = data
    next()
  }
}
export default new LoginValidation()
