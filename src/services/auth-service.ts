import { uuidv7 } from 'uuidv7'
import { prisma } from '../db/prisma'
import { UserRequest } from '../model/user-model'
import { hashing } from '../utils/hashing'

export const AuthService = {
  register: async (data: UserRequest) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      })
      if (existingUser) {
        return null
      }
      const hashedPassword = hashing(data.passwordHash)
      const newUser = await prisma.user.create({
        data: {
          userId: uuidv7(),
          username: data.username,
          email: data.email,
          passwordHash: hashedPassword,
          name: data.name,
          phoneNumber: data.phoneNumber,
        },
      })
      return {
        data: {
          userId: newUser.userId,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
          phoneNumber: newUser.phoneNumber,
        },
      }
    } catch (error) {
      console.error('Error creating user:', error)
      return {
        success: false,
        statusCode: 500,
        message: 'Failed to create user',
      }
    }
  },
  login: async (username: string) => {
    return await prisma.user.findFirst({ where: { username } })
  },
}
