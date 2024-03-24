import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
import { logger } from '../utils/logger'

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')

    if (!accessToken) {
      return res.status(401).json({ message: 'Access token not provided' })
    }

    const { decoded, expired } = await verifyJwt(accessToken)

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    if (expired) {
      return res.status(401).json({ message: 'Token expired' })
    }

    res.locals.user = decoded
    next()
  } catch (error) {
    logger.error('Error authenticating token:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default authenticateToken
