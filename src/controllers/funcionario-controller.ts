import { Request, Response } from 'express'

import Funcionario from './../models/funcionario-model'
import {
  notFoundId,
  errorGet,
  notFound,
  successInsert,
  successUpdate,
  successDelete,
  errorDelete
} from './../util/messages'

export class Resp {
    public success: boolean;
    public funcionarios: {};
    public msg: [string];
}

class FuncionarioController {
    public type = 'funcionario'

    public async searchById (req: Request, res: Response): Promise<void> {
      let resp = new Resp()

      await Funcionario.findById(req.body._id)
        .populate('permissao', 'nome', 'Permissao')
        .select(' _id nome email cpf nascimento celular permissao')
        .then((funcionario): Response => {
          if (!funcionario) {
            resp.success = false
            resp.msg.push(notFoundId(this.type))
            return res.status(400).json(resp)
          }
          resp.funcionarios = funcionario
          return res.status(200).json(resp)
        })
        .catch((): Response => {
          resp.success = false
          resp.msg.push(errorGet(this.type))
          return res.status(400).json(resp)
        })
    }

    public async search (req, res): Promise<void> {
      let resp = { success: true, funcionarios: [], msg: [] }

      Funcionario.find()
        .populate('permissao', 'nome', 'Permissao')
        .select(' _id nome email cpf nascimento celular permissao')
        .then((funcionarios): void => {
          if (funcionarios.length === 0) {
            resp.msg.push(notFound(this.type))
            return res.status(400).json(resp)
          }

          resp.funcionarios = funcionarios
          return res.status(200).json(resp)
        })
        .catch((): void => {
          resp.success = false
          resp.msg.push(errorGet(this.type))
          return res.status(400).json(resp)
        })
    }

    public async insert (req, res): Promise<void> {
      let resp = { success: true, msg: [] }

      Funcionario.create(req.body)
        .then((): void => {
          resp.msg.push(successInsert(this.type))
          return res.status(201).json(resp)
        })
        .catch((err): void => {
          console.log(err)
          // const { usuario, cpf, permissao } = errors;

          resp.success = false

          // if (usuario) resp.msg.push(usuario.message);
          // if (cpf) resp.msg.push(cpf.message);
          // if (permissao) resp.msg.push(permissao.message);
          // if (resp.msg.length == 0) resp.msg.push(msg.errorInsert(this.type));

          return res.status(400).json(resp)
        })
    }

    public async update (req, res): Promise<void> {
      let resp = { success: true, msg: [] }

      Funcionario.findOneAndUpdate({ _id: req.body._id }, req.body, { runValidators: true, context: 'query' })
        .then((funcionario): void => {
          if (!funcionario) {
            resp.success = false
            resp.msg.push(notFoundId(this.type))
            return res.status(400).json(resp)
          }
          resp.msg.push(successUpdate(this.type))
          return res.status(200).json(resp)
        })
        .catch((err): void => {
        // const {usuario, cpf, permissao} = errors;
          console.log(err)

          resp.success = false

          // if (usuario) resp.msg.push(usuario.message);
          // if (cpf) resp.msg.push(cpf.message);
          // if (permissao) resp.msg.push(permissao.message);
          // if (resp.msg.length == 0) resp.msg.push(msg.errorUpdate(this.type));

          return res.status(400).json(resp)
        })
    }

    public async delete (req, res): Promise<void> {
      let resp = { success: true, msg: [] }

      Funcionario.findByIdAndDelete(req.body._id)
        .then((funcionario): void => {
          if (!funcionario) {
            resp.success = false
            resp.msg.push(notFoundId(this.type))
            return res.status(400).json(resp)
          }

          resp.msg.push(successDelete(this.type))
          return res.status(200).json(resp)
        })
        .catch((): void => {
          resp.success = false
          resp.msg.push(errorDelete(this.type))
          return res.status(400).json(resp)
        })
    }
}

export default new FuncionarioController()
