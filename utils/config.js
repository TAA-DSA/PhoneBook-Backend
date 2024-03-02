require('dotenv').config()

const STATUS = process.env.STATUS

const PORT = process.env.PORT || 3000

//const MONGODB_URI = process.env.URI

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { PORT, STATUS, MONGODB_URI }
