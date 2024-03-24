export type ReservationResponse = {
  reservationId: string
  roomId: string
  userId: string
  checkinDate: Date
  checkoutDate: Date
  createdAt: Date
}

export type ReservationRequest = {
  reservationId: string
  roomId: string
  userId: string
  checkinDate: Date
  checkoutDate: Date
  createdAt: Date
}