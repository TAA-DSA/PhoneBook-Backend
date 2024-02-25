const { app, errorHandler } = require('./middleware/error.middleware.js')

const route = require('./routes/index.routes')

const connectToDatabase = require('./database/db.init.js')

connectToDatabase()

const PORT = process.env.PORT || 3000

app.use('/', route)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server 🚀 running on ${PORT}`)
})
