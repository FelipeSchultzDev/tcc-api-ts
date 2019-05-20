import { Request, Response } from 'express'

// import Marca from './../models/marca-model'

class MarcaController {
  public async searchById (req: Request, res: Response): Promise<Response> {
    return res.status(500).json({ success: true })
  }

  public async search (req: Request, res: Response): Promise<Response> {
    return res.status(500).json({ success: true })
  }

  public async insert (req: Request, res: Response): Promise<Response> {
    return res.status(500).json({ success: true })
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(500).json({ success: true })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(500).json({ success: true })
  }
}

module.exports = new MarcaController()
