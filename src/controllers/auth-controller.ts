import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth-service'
import { createUserValidation } from '../validation/user-validation'
import { loginValidation } from '../validation/auth-validation'
import { logger } from '../utils/logger'
import { signJwt } from '../utils/jwt'
import { compare } from 'bcrypt'

export const AuthController = {
  REGISTER: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createUserValidation(req.body)
    if (error) {
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
      })
    }

    try {
      const user = await AuthService.register(value)
      if (user) {
        return res.status(201).json({
          success: true,
          statusCode: 201,
          message: 'User created successfully',
          data: user.data,
        })
      } else {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Username or email already exists',
        })
      }
    } catch (error) {
      next(error)
    }
  },
  LOGIN: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = loginValidation(req.body)
    if (error) {
      logger.error(error.details[0].message)
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
      })
    }
    try {
      const user = await AuthService.login(value.username)
      if (!user) {
        return res
          .status(401)
          .json({
            success: false,
            statusCode: 401,
            message: 'Invalid credentials',
          })
      }
      const isValid = compare(value.password, user.passwordHash)
      if (!isValid) {
        return res
          .status(401)
          .json({
            success: false,
            statusCode: 401,
            message: 'Invalid credentials',
          })
      }
      const userResponse = {
        ...user,
        passwordHash: undefined,
      }
      const accesToken = signJwt({ ...userResponse }, { expiresIn: '1d' })
      return res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: 'Login successful',
          data: { accesToken },
        })
    } catch (error) {
      next(error)
    }
  },
}
