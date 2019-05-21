import { Request, Response } from 'express'

// import Movimento from '../models/movimento-model'

class MovimentoController {
  public async listar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }
}

export default new MovimentoController()
