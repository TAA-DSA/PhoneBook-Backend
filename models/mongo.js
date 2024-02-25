const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config()

//add validation
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//Customize schema output using transform {mongoose}
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)
