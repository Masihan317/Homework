import axios from 'axios'
import { IP2LOCATION_API_KEY } from "../settings.js"
import { getLoggerInstance } from '../logger.js'

const logger = getLoggerInstance()

const getInfo = async (userIP) => {
  const url = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIP}`
  try {
    let res = await axios.get(url)
    return res.data
  } catch (err) {
    logger.error(err)
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
}

export default getInfo