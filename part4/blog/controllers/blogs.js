const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!body.likes) {
    body.likes = 0
  }

  if (!body.url || !body.title) {
   response.status(400).end() 
  }
  const blog = new Blog(body)
  
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
