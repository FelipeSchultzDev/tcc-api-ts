import { Router } from 'express'

import loginCtrl from '../controllers/login-controller'
import loginVal from '../validations/login-validation'

const router = Router()

// Login
router.post('/', loginVal.doLogin, loginCtrl.doLogin)

export default router
