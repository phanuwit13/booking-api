import { PrismaClient } from '@prisma/client'
import { uuidv7 } from 'uuidv7'

const prisma = new PrismaClient()

export const ReservationService = {
  isRoomAvailable: async (
    roomId: string,
    checkinDate: Date,
    checkoutDate: Date
  ): Promise<boolean> => {
    try {
      // เช็คว่าห้องว่างในช่วงเวลาที่กำหนดหรือไม่
      const reservationsInTimeRange = await prisma.reservation.findMany({
        where: {
          roomId: roomId,
          AND: [
            {
              checkinDate: {
                gte: new Date(checkinDate),
              },
            },
            {
              checkoutDate: {
                lte: new Date(checkoutDate),
              },
            },
          ],
        },
      })
      return reservationsInTimeRange.length === 0
    } catch (error) {
      console.error(`Error checking room availability: ${error}`)
      return false
    }
  },

  makeReservation: async (
    roomId: string,
    userId: string,
    checkinDate: Date,
    checkoutDate: Date,
    otherName: string,
    otherPhone: string,
    otherEmail: string
  ): Promise<any> => {
    try {
      // ทำการจองห้อง
      const reservation = await prisma.reservation.create({
        data: {
          roomId: roomId,
          userId: userId,
          checkinDate: checkinDate,
          checkoutDate: checkoutDate,
          createdAt: new Date(),
          reservationId: uuidv7(),
          otherName,
          otherPhone,
          otherEmail,
        },
      })
      return reservation
    } catch (error) {
      console.error(`Error making reservation: ${error}`)
      return null
    }
  },
  getReservation: async (userId: string): Promise<any> => {
    try {
      // ทำการจองห้อง
      const reservation = await prisma.reservation.findMany({
        where: {
          userId: userId,
        },
        include: {
          room: true,
        },
      })
      return reservation
    } catch (error) {
      console.error(`Error making reservation: ${error}`)
      return null
    }
  },
}
