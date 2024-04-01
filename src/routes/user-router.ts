import { Router } from 'express'
import { UserController } from '../controllers/user-controller'
import authenticateToken from '../middleware/authenticateToken'

export const UserRouter = Router()

UserRouter.get('/profile', authenticateToken,UserController.GETUSER)
