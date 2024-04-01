import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { ReservationService } from '../services/reservation-service'
import { createReservationValidation } from '../validation/reservation-validation'

export const ReservationsController = {
  MAKE_RESERVATION: async (req: Request, res: Response, next: NextFunction) => {
    const {
      locals: { user },
    } = res
    const userId = user.userId
    const { error, value } = createReservationValidation(req.body)

    if (error) {
      return res.status(422).json({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
      })
    }

    const {
      roomId,
      checkinDate,
      checkoutDate,
      otherName,
      otherPhone,
      otherEmail,
    } = value
    try {
      // ตรวจสอบว่าห้องว่างหรือไม่
      const isRoomAvailable = await ReservationService.isRoomAvailable(
        roomId,
        checkinDate,
        checkoutDate
      )

      if (!isRoomAvailable) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Room is not available for the specified time period',
        })
      }

      // ทำการจองห้อง
      const reservation = await ReservationService.makeReservation(
        roomId,
        userId,
        checkinDate,
        checkoutDate,
        otherName,
        otherPhone,
        otherEmail
      )

      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Room reservation created successfully',
        reservation: reservation,
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  },
  GET_RESERVATION: async (req: Request, res: Response, next: NextFunction) => {
    const {
      locals: { user },
    } = res
    const userId = user.userId

    try {
      const reservation = await ReservationService.getReservation(userId)
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Room reservation found successfully',
        reservation: reservation,
      })
    } catch (error) {
      logger.error(error)
      next(error)
    }
  },
}
