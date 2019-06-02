import { Request, Response } from 'express'

import Movimento from '../models/movimento-model'
import { errorGet, notFound } from '../util/messages'

class MovimentoController {
  public async listar (req: Request, res: Response): Promise<void> {
    Movimento.find()
      .then((result): Response => {
        if (result.length <= 0) return res.status(400).json({ success: false, movimentos: notFound('Movimento') })
        else return res.status(200).json({ success: true, movimentos: result })
      })
      .catch((): Response => {
        return res.status(400).json({ success: false, msg: errorGet('Movimento') })
      })
  }
}

export default new MovimentoController()
