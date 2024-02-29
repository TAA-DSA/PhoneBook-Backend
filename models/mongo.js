const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config()

//add validation
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => {
        return /^\d{3}-\d{5}$/.test(v)
      },
      message: 'Number must be in the format XXX-XXXXXXX',
    },
  },
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
