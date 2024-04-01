import { Prisma } from '@prisma/client'
import { prisma } from '../db/prisma'
import { UserResponse } from '../model/user-model'
import { logger } from '../utils/logger'
import { pageAble, pagination } from '../model/pagination'
import { exclude } from '../utils/user'



export const UserService = {
  getUserById: async (id: string): Promise<UserResponse | null> => {
    try {
      let result = null
      const data = await prisma.user.findUnique({ where: { userId: id } })
      if (data) result = exclude(data, ['passwordHash']) as UserResponse 
      return result
    } catch (error) {
      logger.error(`UserService.getUserById : error is ${error}`)
      return null
    }
  },
}
