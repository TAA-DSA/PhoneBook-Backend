const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Contact = require('../models/mongo')
const api = supertest(app)

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
  let contactObject = new Contact(initialContact[0])
  await contactObject.save()
  contactObject = new Contact(initialContact[1])
  await contactObject.save()
})

describe('Node test cases', () => {
  test('contacts are returned as json', { only: true }, async () => {
    await api
      .get('/api/persons')
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('there are five notes', async () => {
    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, 2)
  })

  test('first contact name starts with T', async () => {
    const response = await api.get('/api/persons')

    const contents = response.body.map((e) => e.name)
    assert.strictEqual(contents.includes('Tasdeed'), true)
  })

  //   test('a valid contact can be added ', async () => {
  //     const newContact = {
  //       content: 'Nina Patel',
  //       number: '898-90909',
  //     }

  //     await api.post('/api/persons').send(newContact).expect(201)

  //     const response = await api.get('/api/persons')

  //     const contents = response.body.map((r) => r.name)

  //     assert.strictEqual(response.body.length, initialContact.length + 1)

  //     assert(contents.includes('Nina Patel'))
  //   })

  test('note without content is not added', async () => {
    const newContact = {
      number: '908-12345',
    }

    await api.post('/api/persons').send(newContact).expect(400)

    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, initialContact.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
