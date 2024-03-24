import { Prisma } from '@prisma/client'
import { prisma } from '../db/prisma'
import { UserResponse } from '../model/user-model'
import { logger } from '../utils/logger'
import { pageAble, pagination } from '../model/pagination'

export const UserService = {
  getUserById: async (id: string): Promise<UserResponse | null> => {
    try {
      const data = await prisma.user.findUnique({ where: { userId: id } })
      return data
    } catch (error) {
      logger.error(`UserService.getUserById : error is ${error}`)
      return null
    }
  },
}
