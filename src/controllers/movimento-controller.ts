import { Request, Response } from 'express'

import Movimento from '../models/movimento-model'
import { errorGet } from '../util/messages'

class MovimentoController {
  public async listar (req: Request, res: Response): Promise<void> {
    Movimento.find().populate('tipo produto', 'nome -_id')
      .then((result): Response => {
        return res.status(200).json({ success: true, movimentos: result })
      })
      .catch((): Response => {
        return res.status(200).json({ success: false, msg: errorGet('Movimento') })
      })
  }
}

export default new MovimentoController()
