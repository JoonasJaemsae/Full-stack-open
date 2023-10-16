const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('the correct number of blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have an id field', async () => {
    const response = await api.get('/api/blogs')

    // console.log('response.body[0]', response.body[0])
    // console.log('response.body[0].id', response.body[0].id)
    expect(response.body[0].id).toBeDefined()
})

test('a new blog can be added', async () => {

    const blogsAtStart = await api.get('/api/blogs')

    const newBlog =
    {
        title: 'A new, third blog entry',
        author: 'Jester',
        url: 'made-up-address.com',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    console.log('blogsAtEnd.body', blogsAtEnd.body)
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)
})
