import { Prisma } from '@prisma/client'
import { prisma } from '../db/prisma'
import { RoomQuery, RoomResponse } from '../model/room-model'
import { logger } from '../utils/logger'
import { pageAble, pagination } from '../model/pagination'
import dayjs from 'dayjs'

export const RoomService = {
  getAllRooms: async (query: RoomQuery): Promise<pageAble<RoomResponse>> => {
    const { roomType, capacity, roomNumber, page = 1, limit = 20 } = query
    try {
      const filters: Prisma.RoomWhereInput[] = []
      if (roomNumber)
        filters.push({
          roomNumber: {
            equals: roomNumber,
          },
        })
      if (capacity)
        filters.push({
          capacity: {
            gte: Number(capacity),
          },
        })
      if (roomType)
        filters.push({
          roomType: {
            equals: roomType,
          },
        })

      const totalData = await prisma.room.count({ where: { AND: filters } })
      const data = await prisma.room.findMany({
        where: { AND: filters },
        skip: (page - 1) * limit,
        take: Number(limit),
      })
      const pagination: pagination = {
        total_data: totalData,
        limit: Number(limit),
        current_page: Number(page),
        total_page: Math.ceil(totalData / limit),
      }
      return { data, pagination }
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to finding a room')
    } finally {
      await prisma.$disconnect()
    }
  },
  getRoomById: async (id: string): Promise<RoomResponse | null> => {
    try {
      const data = await prisma.room.findUnique({ where: { roomId: id } })
      return data
    } catch (error) {
      logger.error(error)
      return null
    }
  },
  getRoomAvailable: async (
    date: string,
    night: number
  ): Promise<RoomResponse[] | null> => {
    try {
      const startDate = new Date(date).toISOString()
      const endDate = dayjs(date).add(night, 'day').toDate().toISOString()
      const data = await prisma.room.findMany()

      const reservations = await prisma.reservation.findMany({
        where: {
          AND: [
            {
              checkinDate: {
                gte: startDate,
              },
            },
            {
              checkoutDate: {
                lte: endDate,
              },
            },
          ],
        },
      })

      const result = data.filter((item) => {
        return !reservations.some(
          (reservation) => reservation.roomId === item.roomId
        )
      })
      return result
    } catch (error) {
      logger.error(error)
      return null
    }
  },
}
