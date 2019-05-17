import express from 'express'
import cors from 'cors'
import { connect, ConnectionOptions } from 'mongoose'
import bodyParser from 'body-parser'

import ColorCMD from '../util/ColorCMD'

import jwt from './../middlewares/authentication'

// // Rotas
import Cliente from '../routes/cliente-routes'
import Funcionario from '../routes/funcionario-routes'
import Marca from '../routes/marca-routes'
import Movimento from '../routes/movimento-routes'
import Produto from '../routes/produto-routes'
import Venda from '../routes/venda-routes'
import login from '../routes/login-routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
    }

    private middlewares (): void {
      this.express.use(cors())
      this.express.use(bodyParser.urlencoded({ extended: true }))
      this.express.use(express.json())
    }

    private database (): void {
      const options: ConnectionOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
      connect('mongodb://localhost/tcc', options)
        .then((): void => {
          ColorCMD('blue', '', '[mongoose] Conectado')
        })
        .catch((err): void => {
          ColorCMD('red', '', `Erro: ${err}`)
        })
    }

    private routes (): void {
      this.express.use('/api/login', login)
      this.express.use(jwt)
      this.express.use('/api/cliente', Cliente)
      this.express.use('/api/funcionario', Funcionario)
      this.express.use('/api/marca', Marca)
      this.express.use('/api/movimento', Movimento)
      this.express.use('/api/produto', Produto)
      this.express.use('/api/venda', Venda)
    }
}

export default new App().express
