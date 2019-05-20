import { Request, Response } from 'express'
// import Cliente from './../models/Cliente-model'

class ClienteController {
  public async searchById (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async search (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async insert (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ response: true })
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }
}

module.exports = new ClienteController()
