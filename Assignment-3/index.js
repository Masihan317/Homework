const express = require("express")
const https = require("https")
const fs = require("fs")
const studentInformation = require("./routes/studentInformation")

const app = express()

const httpsOptions = {
  key: fs.readFileSync("./ssl/RootCA.key"),
  cert: fs.readFileSync("./ssl/RootCA.pem")
}

const server = https.createServer(httpsOptions, app)
app.use(express.json())
app.use("/", studentInformation)

server.listen(8000, () => {
  console.log("Server Running")
})