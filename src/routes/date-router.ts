import { Router } from 'express'
import { DateController } from '../controllers/date-controller'

export const DateRouter = Router()

DateRouter.get('/date', DateController.GET_DATE)