const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
describe('total likes', () => {


  test('of empty list is zero', () =>{
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  const favoriteBlog = blogs.find(b => b._id === "5a422b3a1b54a676234d17f9");

  test('of empty list is undefined', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
  })

  test('singe blog in list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('of list with multiple entries', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), favoriteBlog)
  })
})

describe('most blogs', () => {
  test('of empty list of blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test('of single blog list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), { author: 'Edsger W. Dijkstra' , blogs: 1 })
  })

  test('of multiple entries list', () => {
    const mostBlogs = {
      author: "Robert C. Martin",
      blogs: 3
    }
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), mostBlogs)
  })
})

describe('most likes', () => {
  test('of empty list of blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), {})
  })

  test('of single blog list', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), { author: 'Edsger W. Dijkstra' , likes: 5 })
  })

  test('of multiple entries list', () => {
    const mostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    assert.deepStrictEqual(listHelper.mostLikes(blogs), mostLikes)
  })
})

