import express from 'express'
import https from 'https'
import fs from 'fs'
import 'dotenv/config'
import cors from 'cors'
import githubRoutes from './routes/githubRoutes.js'
import infoRoutes from './routes/infoRoutes.js'
import { getLoggerInstance } from './logger.js'

const logger = getLoggerInstance()

const app = express()

const httpsOptions = {
  key: fs.readFileSync("./ssl/RootCA.key"),
  cert: fs.readFileSync("./ssl/RootCA.pem")
}

const server = https.createServer(httpsOptions, app)

app.use(cors())
app.use(express.json())
app.use("/", githubRoutes)
app.use("/info", infoRoutes)

server.listen(8000, () => {
  logger.info("Server is Up")
})