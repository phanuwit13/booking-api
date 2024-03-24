import Joi from 'joi'
import { UserResponse } from '../model/user-model'

export const createUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required().trim(),
    email: Joi.string().email().required(),
    passwordHash: Joi.string().min(5).required(),
    name: Joi.string().required().trim(),
    phoneNumber: Joi.string().required().trim(),
  })

  return schema.validate(data)
}

export const updateUserValidation = (data: UserResponse) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required().trim(),
    email: Joi.string().email().required(),
    passwordHash: Joi.string().min(5).required(),
    name: Joi.string().required().trim(),
    phoneNumber: Joi.string().required().trim(),
  })

  return schema.validate(data)
}
