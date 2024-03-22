import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'
import githubRoutes from './routes/githubRoutes.js'

const app = express()

const httpsOptions = {
  key: fs.readFileSync("./ssl/RootCA.key"),
  cert: fs.readFileSync("./ssl/RootCA.pem")
}

const server = https.createServer(httpsOptions, app)

app.use(cors())
app.use(express.json())
app.use("/", githubRoutes)

server.listen(8000, () => {
  console.log("Server is Up")
})