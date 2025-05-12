const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('response has an id field', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})

test.only('a new blog can be added', async () => {
  const newBlog = {
    title: 'Pedro',
    author: 'Nadie Nunca',
    url: 'https://falso.cl/nada/mentira.pdf',
    likes: 666,
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const savedBlog = await Blog.find({ title: newBlog.title })
  assert.strictEqual(savedBlog[0].author, newBlog.author)
})

test.only('if likes is missing defaults to 0', async () => {
  const newBlog = {
    title: 'Pedro',
    author: 'Nadie Nunca',
    url: 'https://falso.cl/nada/mentira.pdf',
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const savedBlog = await Blog.find({ title: newBlog.title })
  assert.strictEqual(savedBlog[0].likes, 0)
})

test.only('if title or url are missing respond with 400 bad request', async () => {
  const noTitleBlog = {
    author: 'Nadie Nunca',
    url: 'https://falso.cl/nada/mentira.pdf',
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const noUrlBlog = {
    title: 'a quien le importa',
    author: 'Nadie Nunca',
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)    
})

after(async () => {
  await mongoose.connection.close()
})
