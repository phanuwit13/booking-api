// export type RoomRequest = {
//   name: string
//   description: string
//   price: number
//   category: string
// }
export type RoomResponse = {
  roomId: string
  roomNumber: string
  roomType: string
  capacity: number
  pricePerNight: number
  description: string
}

export type RoomQuery = {
  page?: number
  roomNumber?: string
  roomType?: string
  capacity?: string
  limit?: number
}
