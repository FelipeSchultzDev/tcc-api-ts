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
    const { cpf, celular, email }: ClienteInterface = req.body

    const validateList = {
      $or: [
        { celular: celular },
        { email: email },
        { cpf: cpf }
      ]
    }

    const validate = await Cliente.find(validateList)

    const errorList = []

    validate.forEach((cliente): void => {
      if (cliente.celular === celular) errorList.push(msg.alreadyInsert('Celular'))
      if (cliente.email === email) errorList.push(msg.alreadyInsert('email'))
      if (cliente.cpf === cpf) errorList.push(msg.alreadyInsert('cpf'))
    })

    if (errorList.length > 0) return res.status(400).json({ success: false, msg: errorList })

    const cliente = await Cliente.create(req.body)

    if (cliente) return res.status(200).json({ success: true, msg: msg.successInsert('Cliente') })

    return res.status(400).json({ success: false, msg: msg.errorInsert('Cliente') })
  }

  public async editar (req: Request, res: Response): Promise<Response> {
    const { _id, cpf, celular, email }: ClienteInterface = req.body

    const validateList = {
      $or: [
        { celular: celular },
        { email: email },
        { cpf: cpf }
      ]
    }
    const validate = await Cliente.find(validateList)

    const errorList = []

    for (let i = 0; i < validate.length; i++) {
      const cliente = validate[i]
      if (cliente.celular === celular && !(cliente._id === _id)) errorList.push(msg.alreadyInsert('Celular'))
      if (cliente.email === email && !(cliente._id === _id)) errorList.push(msg.alreadyInsert('email'))
      if (cliente.cpf === cpf && !(cliente._id === _id)) errorList.push(msg.alreadyInsert('cpf'))
    }

    if (errorList.length > 0) return res.status(400).json({ success: false, msg: errorList })

    const cliente = await Cliente.findOneAndUpdate({ _id: _id }, req.body)

    if (cliente) return res.status(200).json({ success: true, msg: msg.successUpdate('Cliente') })

    return res.status(400).json({ success: false, msg: msg.errorUpdate('Cliente') })
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
    const validate = await Cliente.findOne({ _id: req.body._id })

    if (validate && validate.compras.length > 0) return res.status(400).json({ success: false, msg: msg.cantDelete('Cliente') })

    await Cliente.findByIdAndDelete(req.body._id)

    return res.status(200).json({ success: true, msg: msg.successDelete('Cliente') })
  }
}
export default new ClienteController()
