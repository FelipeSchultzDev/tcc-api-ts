import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from '../class/class'

class VendaValidation {
  public async vender (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const options: FieldOptions = {
      produtos: true
    }

    let { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(200).json({ success: false, msg: msg })
  }
}

export default new VendaValidation()
