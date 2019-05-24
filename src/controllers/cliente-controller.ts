import { ClienteInterface } from './../class/interface'
import { Request, Response } from 'express'

import Cliente from './../models/cliente-model'
import * as msg from './../util/messages'

class ClienteController {
  public async ld (req: Request, res: Response): Promise<Response> {
    const clientes = await Cliente.find({ status: false }).select('-__v -updatedAt')

    if (clientes && clientes.length > 0) return res.status(200).json({ success: true, clientes: clientes })
    else if (clientes && !(clientes.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Cliente') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Cliente') })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    const clientes = await Cliente.find({ status: true }).select('-__v -updatedAt')

    if (clientes && clientes.length > 0) return res.status(200).json({ success: true, clientes: clientes })
    else if (clientes && !(clientes.length > 0)) return res.status(400).json({ success: false, msg: msg.notFound('Cliente') })
    else return res.status(400).json({ success: false, msg: msg.errorGet('Cliente') })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    const data: ClienteInterface = { ...req.body }
    const validate = await Cliente.findOne({ cpf: data.cpf })

    if (validate) return res.status(400).json({ success: false, msg: msg.alreadyInsert('Cliente') })

    const cliente = await Cliente.create(data)

    if (cliente) return res.status(200).json({ success: true, msg: msg.successInsert('Cliente') })

    return res.status(400).json({ success: false, msg: msg.errorInsert('Cliente') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async desativar (req: Request, res: Response): Promise<void> {
    Cliente.findByIdAndUpdate(req.body._id, { status: false })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.disabled('Cliente') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async ativar (req: Request, res: Response): Promise<void> {
    Cliente.findByIdAndUpdate(req.body._id, { status: true })
      .then((): Response => {
        return res.status(200).json({ success: true, msg: msg.enabled('Cliente') })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: 'Erro ao desativar' })
      })
  }

  public async deletar (req: Request, res: Response): Promise<Response> {
    // const produto = await Produto.findOne({ produto: req.body._id })

    // if (produto) return res.status(400).json({ success: false, msg: msg.cantDelete('Marca') })

    // Produto.findByIdAndDelete(req.body._id)

    return res.status(200).json({ success: true, msg: msg.successDelete('Marca') })
  }
}
export default new ClienteController()
