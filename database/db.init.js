const logger = require('../utils/logger')
const mongoose = require('mongoose')
const { STATUS, MONGODB_URI } = require('../utils/config')

require('dotenv').config()

//const status = process.env.STATUS
logger.info('Status :', STATUS)

const url = MONGODB_URI

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url)
    logger.info('Connected to mongoDB')
  } catch (error) {
    logger.error('Error connecting to mongoDB', error)
  }
}

module.exports = connectToDatabase
