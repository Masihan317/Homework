const express = require("express")
const https = require("https")
const fs = require("fs")

const app = express()

const httpsOptions = {
  key: fs.readFileSync("./ssl/RootCA.key"),
  cert: fs.readFileSync("./ssl/RootCA.pem")
}

const server = https.createServer(httpsOptions, app)
app.use(express.json())

app.get("/", (req, res) => {
  res.send("It's working!!!")
})

app.get("/alive", (req, res) => {
  res.send("HTTPS-Web-Service is Alive!")
})

server.listen(8000, () => {
  console.log("server is up")
})

