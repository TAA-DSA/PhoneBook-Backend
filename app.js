const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const route = require('./routes/index.routes')
const connectToDatabase = require('./database/db.init')
const { requestLogger, errorHandler } = require('./middleware/error.middleware')

connectToDatabase()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

morgan.token('reqBody', function (req) {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqBody'
  )
)

app.use('/', route)

app.use(errorHandler)
app.use(requestLogger)

module.exports = app
