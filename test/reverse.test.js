const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('./list_helper')

console.log('Test Started...')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
  ]
  console.log(blogs[0].likes)

  test('of empty list is zero', () => {
    const lengthList = listHelper.totalLikes(blogs)
    console.log(lengthList)
    assert.strictEqual(lengthList, 1)
  })

  test('when list has only one blog equals the likes of that blog ', () => {
    const returnLike = listHelper.totalLikes(blogs)
    console.log(returnLike)
    assert.strictEqual(returnLike, 7)
  })

  test('of a bigger list is calculated right', () => {
    const total = listHelper.totalLikes(blogs)
    assert.strictEqual(total, 36)
  })
})
