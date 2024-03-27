const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Contact = require('../models/mongo')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const helper = require('./list_helper')

require('express-async-errors')

console.log('Running Integration Test')

const initialContact = [
  {
    name: 'Nina Aziz',
    number: '908-78797',
  },
  {
    name: 'Pretty Eyes',
    number: '908-89909',
  },
]

beforeEach(async () => {
  await Contact.deleteMany({})

  let contactObject = initialContact.map((items) => new Contact(items))

  const promiseArr = contactObject.map((contacts) => contacts.save())

  await Promise.all(promiseArr)
})

// use this to run only one test { only: true }

describe('Node test cases', () => {
  test('contacts are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, 2)
  })

  test('first contact name starts with N', async () => {
    const response = await api.get('/api/persons')

    const contents = response.body.map((e) => e.name)
    console.log('content name :', contents)
    assert.strictEqual(contents.includes('Nina Aziz'), true)
  })

  test('a valid contact can be added ', async () => {
    const newContact = {
      name: 'Mary Brown',
      number: '898-90909',
    }

    await api.post('/api/persons').send(newContact).expect(201)

    const response = await api.get('/api/persons')

    const contents = response.body.map((r) => r.name)

    assert.strictEqual(response.body.length, initialContact.length + 1)

    assert(contents.includes('Nina Patel'))
  })

  test('note without content is not added', async () => {
    const newContact = {
      name: '',
      number: '',
    }

    await api.post('/api/persons').send(newContact).expect(400)

    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, initialContact.length)
  })
})

//This test fails fix it
// describe('test api get request', () => {
//   test('fails with status code 404 if contact does not exsist', async (req, res) => {
//     const id = req.params.id
//     await api.get(`/api/persons/${id}`).expect(404)
//   })
// })
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await mongoose.connection.close()
})
