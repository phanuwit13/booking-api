import { Router } from 'express'
import { RoomController } from '../controllers/room-controller'

export const RoomRouter = Router()

RoomRouter.get('/rooms', RoomController.GET_ROOM)
RoomRouter.get('/rooms/:id', RoomController.GET_ROOM)
