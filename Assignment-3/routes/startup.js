const express = require("express")

const startup = express.Router()

startup.get("/", (req, res) => {
  res.send("It's working!!!")
})

startup.get("/alive", (req, res) => {
  res.send("HTTPS-Web-Service is Alive!")
})

module.exports = startup