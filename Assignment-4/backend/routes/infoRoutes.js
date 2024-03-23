import express from 'express'
import axios from 'axios'
import { getLoggerInstance } from '../logger.js'
import getInfo from '../controller/getInfo.js'

const logger = getLoggerInstance()

const infoRoutes = express.Router()

infoRoutes.get("/", async (req, res) => {
  try {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const data = await getInfo(userIP)
    res.status(200).json(data)
  } catch (err) {
    logger.error(err)
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
})

export default infoRoutes