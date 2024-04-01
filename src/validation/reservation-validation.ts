import Joi from 'joi'
import { ReservationRequest } from '../model/reservation-model'

export const createReservationValidation = (data: ReservationRequest) => {
  const schema = Joi.object({
    roomId: Joi.string().min(5).required().trim(),
    checkinDate: Joi.date().required(),
    checkoutDate: Joi.date().required(),
    otherName: Joi.string().min(1).required().trim(),
    otherPhone: Joi.string().min(10).required().trim(),
    otherEmail: Joi.string().email()
  })

  return schema.validate(data)
}
