export type UserResponse = {
  userId: string
  username: string
  name: string
  email: string
  phoneNumber: string
}

export type UserRequest = {
  userId: string
  email: string
  username: string
  passwordHash: string
  name: string
  phoneNumber: string
}
