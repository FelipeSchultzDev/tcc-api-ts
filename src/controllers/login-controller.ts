import jwt from 'jsonwebtoken'

import Funcionario from '../models/Funcionario-model'
import variables from './../config/variables'
import util from './../util/util'

class LoginController {
  public async doLogin (req, res): Promise<void> {
    let funcionario = await Funcionario.findOne({
      usuario: req.body.usuario,
      senha: util.encode(req.body.senha)
    }).populate('permissao', 'nome', 'Permissao')

    if (!funcionario) {
      return res.status(401).json({ success: false, msg: 'Usuário ou senha incorretos' })
    }

    let user = {
      // id: funcionario._id,
      // permissao: funcionario.permissao.nome
    }

    let token = jwt.sign({ user }, variables.Security.secretKey, {
      expiresIn: 14400
    })

    return res.status(200).json({ success: true, _token: token })
  }
}

export default new LoginController()
