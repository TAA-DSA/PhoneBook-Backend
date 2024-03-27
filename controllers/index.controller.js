const bcrypt = require('bcryptjs')
const User = require('./../models/user')
const Contact = require('./../models/mongo')
const logger = require('../utils/logger')
require('express-async-errors')

const indexPage = async (req, res) => {
  const numberOfContact = await Contact.countDocuments()
  const date = new Date(Date.now())
  const showDate = date.toString()
  const openingMessage = `<h2>Phonebook has ${numberOfContact} people</h2>`
  const currDate = `<p>${showDate}</p>`
  const message = openingMessage + currDate
  res.send(message)
}

const createContact = async (req, res) => {
  const body = req.body

  //adding user to post
  const user = await User.findById(body.userId)

  const contactObj = new Contact({
    name: body.name,
    number: body.number,
    user: user.id,
  })

  const allRecords = await Contact.find({})
  //console.log("all records", allRecords);

  const isDuplicate = allRecords.some(
    (elements) => elements.name.toLowerCase() === contactObj.name.toLowerCase()
  )

  if (!contactObj.name || !contactObj.number || isDuplicate) {
    let errorMessage = ''
    if (!contactObj.name || !contactObj.number) {
      errorMessage = 'name or number cannot be empty'
    } else {
      errorMessage = 'name should be unique'
    }
    res.status(400).json({ error: errorMessage })
  } else {
    const savedContact = await contactObj.save()
    user.contact = user.contact.concat(savedContact._id)
    await user.save()
    res.status(201).json(savedContact)
  }
  //data.push(contactObj);
  // fs.writeFileSync("./data.json", JSON.stringify(data));
}

const updateNumberOnly = async (req, res) => {
  const id = req.params.id
  console.log('id from put request', id)
  const newNumber = { number: req.body.number }
  logger.info('newNumber :', newNumber)
  const opts = { runValidators: true }
  const updateNumber = await Contact.findByIdAndUpdate(id, newNumber, opts)
  res.send(updateNumber)
}

const getAllContact = async (req, res) => {
  const contact = await Contact.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(contact)
  //console.log('All saved contact are sent to Front-end')
}

const getContactById = async (req, res) => {
  const id = req.params.id
  console.log('Requested ID:', id)

  const contact = await Contact.findById(id)
  logger.info('Hurray Id found', contact)

  if (!contact) {
    logger.info('Contact not found')
    return res.status(404).end()
  }

  res.json(contact)
}

const deleteAllContact = async (req, res) => {
  const id = req.params.id
  //console.log("req.params.id: ", id);
  await Contact.findByIdAndDelete(id)
  res.status(204).end()
  // logger.info('Look for id:', contact)
  // res.send('Contact deleted Successfully')
}

//User Route

const userPath = async (req, res) => {
  //res.json('Hello Users, Please register')
  const { username, name, password } = req.body
  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
}

//Get all save users

const getUsers = async (req, res) => {
  const response = await User.find({}).populate('contact')
  console.log(response)
  res.json(response)
}

//Delete user

const deleteUser = async (req, res) => {
  const username = req.params.username

  const user = await User.findOne({ username })

  if (user) {
    await User.deleteOne({ user })
    return res.json({ msg: `${username} deleted` })
  }
  return res.json({ error: `${username} not found` })
}

module.exports = {
  createContact,
  updateNumberOnly,
  indexPage,
  getAllContact,
  getContactById,
  deleteAllContact,
  userPath,
  getUsers,
  deleteUser,
}
