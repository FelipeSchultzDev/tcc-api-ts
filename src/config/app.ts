import express from 'express'
import cors from 'cors'
import { connect, ConnectionOptions } from 'mongoose'
import bodyParser from 'body-parser'

import ColorCMD from '../util/ColorCMD'

import jwt from './../middlewares/authentication'

// // Rotas
import routes from '../routes/routes'
import loginRoutes from '../routes/login.routes'

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.database()
      this.middlewares()
      this.routes()
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
      connect('mongodb+srv://admin:0000@cluster0-d69u7.mongodb.net/test?retryWrites=true&w=majority', options)
        .then((): void => {
          ColorCMD('blue', '', '[mongoose] Conectado')
        })
        .catch((err): void => {
          ColorCMD('red', '', `Erro: ${err}`)
        })
    }

    private routes (): void {
      this.express.use('/login', loginRoutes)
      this.express.use('/', jwt, routes)
    }
}

export default new App().express
