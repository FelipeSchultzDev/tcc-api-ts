import { Request, Response } from 'express'

import * as msg from './../util/messages'
import Produto from '../models/produto-model'

class ProdutoController {
  public async ld (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    const validate = await Produto.findOne({ nome: req.body.nome })

    if (validate) return res.status(400).json({ success: false, msg: [msg.alreadyInsert('Produto')] })

    const produto = await Produto.create(req.body)

    if (produto) return res.status(200).json({ success: true, msg: [msg.successInsert('Produto')] })

    return res.status(400).json({ success: false, msg: msg.errorInsert('Produto') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async desativar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async ativar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async deletar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }
}

module.exports = new ProdutoController()
