const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const likes = blogs.map(b => b.likes)

  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((prev, current) => {
      return prev.likes > current.likes
        ? prev
        : current
    })    
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const blogsPerAuthor = _
      .chain(blogs)
      .groupBy('author')
      .map((value, key) => ({ author: key, blogs: value.length }))
      .value()

    return _.maxBy(blogsPerAuthor, 'blogs')
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const likesPerAuthor = _
      .chain(blogs)
      .groupBy('author')
      .map((value, key) => ({ author: key, likes: _.sumBy(value, 'likes') }))
      .value()

    return _.maxBy(likesPerAuthor, 'likes')
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}