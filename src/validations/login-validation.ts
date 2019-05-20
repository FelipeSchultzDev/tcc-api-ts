import { Request, Response, NextFunction } from 'express'

// import util from './../util/util'

class LoginValidation {
  public async doLogin (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const msg = []

    if (!req.body.usuario || req.body.usuario.length == 0) msg.push('O campo usuario é obrigatório')

    if (!req.body.senha || req.body.senha.length == 0) msg.push('O campo senha é obrigatório')
    else if (req.body.senha.length < 6) msg.push('O campo senha deve ter pelo menos 6 caracteres')

    if (msg.length > 0) return res.status(400).json({ success: false, msg: msg })
    else next()
  }
}

module.exports = new LoginValidation()
