import { prisma } from '../db/prisma'
import { DateQuery } from '../model/room-model'
import dayjs from 'dayjs'
import { DateResponse } from '../model/reservation-model'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const DateService = {
  getAllDate: async (query: DateQuery): Promise<Array<DateResponse>> => {
    dayjs.extend(isSameOrAfter)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const { year = dayjs().tz('Asia/Bangkok').year() } = query
    try {
      // ดึงข้อมูลห้องทั้งหมดจากฐานข้อมูล
      const totalRooms = await prisma.room.count()
      const startDate = dayjs()
        .year(year)
        .month(0)
        .startOf('month')
        .toISOString()
      const endDate = dayjs().year(year).month(11).endOf('month').toISOString()

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
      // สร้างตัวแปรสำหรับเก็บข้อมูลการจองที่แปลงเป็นรูปแบบที่ต้องการ
      const formattedReservations: any[] = []
      let currentDate = dayjs(startDate).tz('Asia/Bangkok')
      while (
        currentDate.isBefore(endDate, 'day') ||
        currentDate.isSame(endDate, 'day')
      ) {
        const reservationsOnDate = reservations.filter((reservation) => {
          const checkinDate = dayjs(reservation.checkinDate)
          const checkoutDate = dayjs(reservation.checkoutDate)
          return (
            currentDate.isSameOrAfter(checkinDate, 'day') &&
            currentDate.isBefore(checkoutDate, 'day')
          )
        })
        const isFull = reservationsOnDate.length >= totalRooms
        const formattedReservation = {
          start: currentDate,
          count: reservationsOnDate.length,
          isFull: isFull,
        }
        if (formattedReservation.count) {
          formattedReservations.push(formattedReservation)
        }

        currentDate = currentDate.add(1, 'day')
      }
      return formattedReservations
    } catch (error) {
      console.error(`Error fetching reservations for ${year}: ${error}`)
      return []
    } finally {
      await prisma.$disconnect()
    }
  },
}
