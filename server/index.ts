import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import routes from './routes'

import {createServer} from 'http'
import { Socket,Server } from 'socket.io'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.use(cors({
    origin: `${process.env.BASE_URL}`,
    credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())

const http = createServer(app)
export const io = new Server(http, {
    cors: {
        origin: `${process.env.BASE_URL}`,
        credentials: true
    }
})
import { SocketSever} from './config/socket'

io.on("connection", (socket: Socket) => {
        SocketSever(socket)
})

app.use('/api', routes)
app.get('/', (req, res) => {
    res.json({
      msg: 'Welcome'
    })
})
import './config/database'

const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})