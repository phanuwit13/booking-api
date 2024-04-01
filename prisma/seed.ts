import { initialRooms } from './rooms'
import { initialUser } from './user'
import { reservation } from './reservation'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedRooms() {
  try {
    for (const room of initialRooms) {
      await prisma.room.create({
        data: {
          roomId: room.roomId,
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          capacity: room.capacity,
          pricePerNight: room.pricePerNight,
          description: room.description,
        },
      })
    }
    for (const user of initialUser) {
      await prisma.user.create({
        data: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          passwordHash: user.passwordHash,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
      })
    }
    for (const booking of reservation) {
      await prisma.reservation.create({
        data: {
          roomId: booking.roomId,
          userId: booking.userId,
          checkinDate: booking.checkinDate,
          checkoutDate: booking.checkoutDate,
          createdAt: booking.createdAt,
          reservationId: booking.reservationId,
          otherName: booking.otherName,
          otherPhone: booking.otherPhone,
          otherEmail: booking.otherEmail,
        },
      })
    }
    console.log('Rooms seeded successfully')
  } catch (error) {
    console.error('Error seeding rooms:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedRooms()
