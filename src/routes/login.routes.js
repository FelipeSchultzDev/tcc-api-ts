import { Router } from 'express'

import loginCtrl from '../controllers/login-controller'
import loginVal from '../validations/login-validation'

const router = Router()

// Login
router.post('/', loginVal.doLogin, loginCtrl.doLogin)
router.post('/validate', loginCtrl.validate)

export default router
