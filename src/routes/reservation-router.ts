import { Router } from 'express'
import { ReservationsController } from '../controllers/reservations-controller'

export const ReservationRouter = Router()

ReservationRouter.post('/reservation/create', ReservationsController.MAKE_RESERVATION)
