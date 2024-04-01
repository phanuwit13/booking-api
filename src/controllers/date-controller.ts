import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { RoomService } from '../services/room-service'
import { DateService } from '../services/date-service'

export const DateController = {
  GET_DATE: async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req
    try {
      const data = await DateService.getAllDate(query)
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'successfully finding a date',
        data: data,
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  },
}
