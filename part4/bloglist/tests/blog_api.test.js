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

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    // console.log('response.body.length', response.body.length)
    // console.log('helper.initialBlogs.length', helper.initialBlogs.length)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have an id field', async () => {
    const response = await api.get('/api/blogs')

    // console.log('response.body[0]', response.body[0])
    // console.log('response.body[0].id', response.body[0].id)
    expect(response.body[0].id).toBeDefined()
})