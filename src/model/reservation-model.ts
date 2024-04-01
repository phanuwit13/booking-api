export type ReservationResponse = {
  reservationId: string
  roomId: string
  userId: string
  checkinDate: Date
  checkoutDate: Date
  createdAt: Date
  otherName: string
  otherPhone: string
  otherEmail: string
}

export type ReservationRequest = {
  reservationId: string
  roomId: string
  userId: string
  checkinDate: Date
  checkoutDate: Date
  createdAt: Date
  otherName: string
  otherPhone: string
  otherEmail: string
}

export type DateResponse = {
  start: string
  count: number
  isFull: boolean
}
