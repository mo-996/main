import express from 'express'
import authController from '../controllers/authController'
import {validRegister} from '../middleware/valid'
import auth from '../middleware/auth'

const router = express.Router()

    router.post('/register', authController.register)
    router.post('/active', authController.activeAccount)

    router.post('/login', authController.login)
    router.post('/logout', auth, authController.logout)

    router.get('/refresh_token', authController.refreshToken)
    router.post('/google_login', authController.googleLogin)

export default router;