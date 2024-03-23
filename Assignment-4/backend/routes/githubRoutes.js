import express from 'express'
import axios from 'axios'
import { DATA_URL } from '../settings.js';
import { getLoggerInstance } from '../logger.js'

const logger = getLoggerInstance()

const githubRoutes = express.Router()

const findRecursively = (object, searchKey) => {
  if (object.hasOwnProperty(searchKey)) {
    return object[searchKey];
  }
  for (let key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      const result = findRecursively(object[key], searchKey);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
};

githubRoutes.post("/", async (req, res) => {
  try {
    const { searchQuery } = req.body
    const rawData = await axios.get(DATA_URL)
    const data = rawData.data
    const result = findRecursively(data, searchQuery)

    if (result === undefined) {
      res.status(404).json({ message: "Data not Found." })
    }

    res.status(200).json(result)
  } catch (err) {
    logger.error(err)
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
})

export default githubRoutes;