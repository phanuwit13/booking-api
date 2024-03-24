import Joi from 'joi'
import { ReservationRequest } from '../model/reservation-model'

export const createReservationValidation = (data: ReservationRequest) => {
  const schema = Joi.object({
    roomId: Joi.string().min(5).required().trim(),
    userId: Joi.string().min(5).required().trim(),
    checkinDate: Joi.date().required(),
    checkoutDate: Joi.date().required(),
  })

  return schema.validate(data)
}
