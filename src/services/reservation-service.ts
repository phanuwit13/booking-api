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
                lt: checkinDate,
              },
            },
            {
              checkoutDate: {
                gt: checkoutDate,
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
    checkoutDate: Date 
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
        },
      })
      return reservation
    } catch (error) {
      console.error(`Error making reservation: ${error}`)
      return null
    }
  },
}
