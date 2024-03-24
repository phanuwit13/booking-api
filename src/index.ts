import express, { Request, Response } from 'express'
import { UserRouter } from './routes/user-router'
import authenticateToken from './middleware/authenticateToken'
import { errorMiddleware } from './middleware/error-middleware'
import bodyParser from 'body-parser'
import { logMiddleware } from './middleware/log-middleware'
import { logger } from './utils/logger'
import { AuthRouter } from './routes/auth-router'
import { RoomRouter } from './routes/room-router'
import { ReservationRouter } from './routes/reservation-router'

export const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('api is running')
})

app.use(logMiddleware)
app.use('/api', AuthRouter)
app.use('/api', authenticateToken, UserRouter)
app.use('/api', authenticateToken, RoomRouter)
app.use('/api', authenticateToken, ReservationRouter)
app.use('*', errorMiddleware)

// import { logger } from "./utils/logger";
const port = 8080
app.listen(port, () => logger.info(`Server is listening on port ${port}`))
