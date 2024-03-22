import express from 'express'
import https from 'https'
import fs from 'fs'

const app = express()

const httpsOptions = {
  key: fs.readFileSync("./ssl/RootCA.key"),
  cert: fs.readFileSync("./ssl/RootCA.pem")
}

const server = https.createServer(httpsOptions, app)

server.listen(8000, () => {
  console.log("Server is Up")
})