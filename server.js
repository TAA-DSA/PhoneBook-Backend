const { app, errorHandler } = require('./middleware/error.middleware.js')
//const data = require("./data.json");
const route = require('./routes/index.routes')
//const Contact = require("./models/mongo.js");
const connectToDatabase = require('./database/db.init.js')
//const cors = require("cors");

connectToDatabase()

const PORT = process.env.PORT || 3000

app.use('/', route)

app.use(errorHandler)

app.listen(PORT, (req, res) => {
  console.log(`Server 🚀 running on ${PORT}`)
})
