import { Request, Response, NextFunction } from 'express'

import util from './../util/util'
import { FieldOptions } from '../class/class'
import { noAuth } from '../util/messages'

class ProdutoValidation {
  public async listar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (util.verifyAuth(res.locals.user.permissao, { admin: true, financeiro: true })) next()
    else return res.status(203).json({ success: false, msg: ['Sem autorização para utilizar este recurso'] })
  }

  public async cadastrar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const options: FieldOptions = {
      nome: true,
      valorVenda: true,
      marca: true,
      unidadeMedida: true,
      qtd: true,
      descricao: true,
      qtdMinima: true,
      model: 'Produto'
    }

    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async editar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const options: FieldOptions = {
      _id: true,
      nome: true,
      valorVenda: true,
      marca: true,
      unidadeMedida: true,
      qtd: true,
      descricao: true,
      qtdMinima: true,
      model: 'Produto'
    }
    const { msg, data } = await util.verifyFields(req.body, options)
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async desativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async ativar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }

  public async deletar (req: Request, res: Response, next: NextFunction): Promise<Response> {
    if (!util.verifyAuth(res.locals.user.permissao, { admin: true })) return res.status(203).json({ success: false, msg: noAuth() })

    const { msg, data } = await util.verifyFields(req.body, { _id: true, model: 'Produto' })
    req.body = data

    if (!(msg.length > 0)) next()
    else return res.status(400).json({ success: false, msg: msg })
  }
}

export default new ProdutoValidation()
