import { Prisma } from '@prisma/client'
import { prisma } from '../db/prisma'
import { RoomQuery, RoomResponse } from '../model/room-model'
import { logger } from '../utils/logger'
import { pageAble, pagination } from '../model/pagination'

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
  // createProduct: async (data: ProductRequest): Promise<ProductResponse | null> => {
  //     try {
  //         const existingProduct = await prisma.product.findFirst({
  //             where: {
  //                 name: data.name,
  //             },
  //         });
  //         if (existingProduct) {
  //             return null;
  //         }
  //         const newProduct = await prisma.product.create({ data });
  //         return newProduct;
  //     } catch (error) {
  //         logger.error(error)
  //         return null
  //     } finally {
  //         await prisma.$disconnect();
  //     }
  // },
  // deleteProduct: async (id: string): Promise<ProductResponse | null> => {
  //     try {
  //         const product = await prisma.product.delete({
  //             where: { id: id },
  //         });
  //         return product;
  //     } catch (error) {
  //         logger.error(error)
  //         return null;
  //     } finally {
  //         await prisma.$disconnect();
  //     }
  // },
  // updateProduct: async (id: string, data: ProductRequest): Promise<ProductResponse | null> => {
  //     try {
  //         const existingProduct = await prisma.product.findFirst({ where: { name: data.name } });
  //         if (existingProduct && existingProduct.id !== id) return null;
  //         const productFromDb = await prisma.product.findUnique({ where: { id: id } });
  //         if (!productFromDb) return null;

  //         const updatedProduct = await prisma.product.update({
  //             where: { id: id },
  //             data: {
  //                 name: data.name || productFromDb.name,
  //                 description: data.description || productFromDb.description,
  //                 price: data.price || productFromDb.price,
  //                 category: data.category || productFromDb.category
  //             }
  //         });

  //         if (updatedProduct) {
  //             return updatedProduct;
  //         } else {
  //             return null;
  //         }
  //     } catch (error) {
  //         logger.error(error);
  //         return null;
  //     } finally {
  //         await prisma.$disconnect();
  //     }
  // }
  // ,
}
