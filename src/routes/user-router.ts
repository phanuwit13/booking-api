import { Router } from 'express'
import { UserController } from '../controllers/user-controller'

export const UserRouter = Router()

// UserRouter.get('/users', UserController.GETUSER)
UserRouter.get('/users/:id', UserController.GETUSER)
// UserRouter.delete('/users/:id', UserController.DELETEUSER)
// UserRouter.put('/users/:id', UserController.UPDATEUSER)
