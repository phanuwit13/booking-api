import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { UserResponse } from '../model/user-model'
import { RoomService } from '../services/room-service'

export const RoomController = {
  GET_ROOM: async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req
    const { query } = req
    try {
      if (id) {
        const data = await RoomService.getRoomById(id)
        if (data) {
          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Room found',
            data: data,
          })
        } else {
          return res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'Room not found',
          })
        }
      } else {
        const data = await RoomService.getAllRooms(query)
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'successfully finding a room',
          pagination: data?.pagination,
          data: data?.data,
        })
      }
    } catch (error) {
      logger.error(error)
      next(error)
    }
  },
}
