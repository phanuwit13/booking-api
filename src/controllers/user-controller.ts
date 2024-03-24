import { Response, Request, NextFunction } from 'express'
import { UserService } from '../services/user-service'
import { updateUserValidation } from '../validation/user-validation'
import { logger } from '../utils/logger'

export const UserController = {
  GETUSER: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req
    // const { query } = req
    try {
      if (id) {
        const user = await UserService.getUserById(id)
        if (user) {
          return res.status(200).json({
            success: true,
            statusCode: 200,
            data: user,
          })
        } else {
          return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'User not found',
          })
        }
      } else {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'User not found',
        })
      }
    } catch (error) {
      next(error)
    }
  },
}
