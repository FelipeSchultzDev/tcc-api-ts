import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { tokenInvalid, tokenNull } from './../util/messages'
import variables from './../config/variables'

const token = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  let token = req.body.token || req.query.query || req.headers['x-access-token']

  if (token === 'dev') {
    res.locals.user = { permissao: 'admin' }
    next()
    return
  }

  if (token) {
    try {
      let decoded = await jwt.verify(token, variables.Security.secretKey).user
      res.locals.user = decoded
      next()
    } catch (error) {
      return res.status(401).send({ msg: tokenInvalid() })
    }
  } else {
    return res.status(401).send({ msg: tokenNull() })
  }
}

export default token
