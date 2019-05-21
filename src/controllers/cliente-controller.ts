import { Request, Response } from 'express'
// import Cliente from './../models/Cliente-model'

class ClienteController {
  public async ld (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async listar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
  }

  public async cadastrar (req: Request, res: Response): Promise<Response> {
    return res.status(400).json({ success: false, msg: 'Serviço não criado' })
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
export default new ClienteController()
