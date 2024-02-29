const logger = require('../utils/logger')
const mongoose = require('mongoose')

require('dotenv').config()

const status = process.env.STATUS
logger.info('Status :', status)

const url = process.env.URI

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url)
    logger.info('Connected to mongoDB')
  } catch (error) {
    logger.error('Error connecting to mongoDB', error)
  }
}

module.exports = connectToDatabase
