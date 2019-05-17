// import Cliente from './../models/Cliente-model'

class ClienteController {
  public async searchById (req, res): Promise<void> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async search (req, res): Promise<void> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async insert (req, res): Promise<void> {
    // let response = {
    //   success: true,
    //   msg: []
    // }
    // response.msg = await validation.postValidation(req)

    // if (!response.msg.length > 0) {
    //   await Cliente.create(req.body)
    //     .then((): void => {
    //       response.success = true
    //       response.msg = 'Cliente cadastrado com sucesso'
    //       return res.status(200).json(response)
    //     })
    //     .catch((err): void => {
    //       response.success = false
    //       response.msg = err.errors.cpf.message
    //       return res.status(400).json(response)
    //     })
    // } else {
    return res.status(400).json({ response: true })
    // }
  }

  public async update (req, res): Promise<void> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }

  public async delete (req, res): Promise<void> {
    return res.status(200).json({ success: false, msg: 'Serviço não criado' })
  }
}

module.exports = new ClienteController()
