const mongoose = require('mongoose')
//Add other validation
//Check if username is long enough
//username only contains the permitted character
//password is strong enough

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  password: String,
  contact: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    },
  ],
})

//customise mongoose output

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    //delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
