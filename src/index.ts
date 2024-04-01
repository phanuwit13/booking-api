import express, { Request, Response } from 'express'
import { UserRouter } from './routes/user-router'
import { errorMiddleware } from './middleware/error-middleware'
import bodyParser from 'body-parser'
import { logMiddleware } from './middleware/log-middleware'
import { logger } from './utils/logger'
import { AuthRouter } from './routes/auth-router'
import { RoomRouter } from './routes/room-router'
import { ReservationRouter } from './routes/reservation-router'
import { DateRouter } from './routes/date-router'
const cors = require('cors');

export const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

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
app.use('/api', RoomRouter)
app.use('/api', DateRouter)
app.use('/api', AuthRouter)
app.use('/api', UserRouter)
app.use('/api', ReservationRouter)
app.use('*', errorMiddleware)

// import { logger } from "./utils/logger";
const port = 8080
app.listen(port, () => logger.info(`Server is listening on port ${port}`))
