import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import Funcionario from '../models/funcionario-model'
import variables from './../config/variables'
import util from './../util/util'

class LoginController {
  public async doLogin (req: Request, res: Response): Promise<Response> {
    const funcionario = await Funcionario.findOne({
      usuario: req.body.usuario,
      senha: util.encode(req.body.senha)
    }).populate('permissao', 'nome', 'Permissao')

    if (!funcionario) return res.status(401).json({ success: false, msg: 'Usuário ou senha incorretos' })

    const user = {
      id: funcionario._id,
      permissao: (funcionario.permissao) ? funcionario.permissao.nome : ''
    }

    const token = jwt.sign({ user }, variables.Security.secretKey, {
      expiresIn: 14400
    })

    return res.status(200).json({ success: true, _token: token })
  }
}

export default new LoginController()
