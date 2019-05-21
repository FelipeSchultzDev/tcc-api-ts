import { Request, Response } from 'express'

// import Funcionario from './../models/funcionario-model'
// import { } from './../util/messages'

export class Resp {
    public success: boolean;
    public funcionarios: {};
    public msg: string[];
}

class FuncionarioController {
    public type = 'funcionario'

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

export default new FuncionarioController()
