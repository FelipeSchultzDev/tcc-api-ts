import { Request, Response } from 'express'

// import Venda from '../models/venda-model'

class VendaController {
  public async vender (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }
}

module.exports = new VendaController()
