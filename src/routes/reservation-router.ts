import { Router } from 'express'
import { ReservationsController } from '../controllers/reservations-controller'
import authenticateToken from '../middleware/authenticateToken'

export const ReservationRouter = Router()

ReservationRouter.get('/reservation', authenticateToken,ReservationsController.GET_RESERVATION)
ReservationRouter.post('/reservation', authenticateToken,ReservationsController.MAKE_RESERVATION)
