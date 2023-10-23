const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    // let blogObject = new Blog(helper.initialBlogs[0])
    // await blogObject.save()

    // blogObject = new Blog(helper.initialBlogs[1])
    // await blogObject.save()


    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
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

    const blogsAtStart = helper.initialBlogs
    // console.log('blogsAtStart', blogsAtStart)

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

    const blogsAtEnd = await helper.blogsInDB()
    // console.log('blogsAtEnd', blogsAtEnd)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    // // Alternatively the following works as well
    // const blogsAtStart = await api.get('/api/blogs')
    // // Add new blog at this point.
    // const blogsAtEnd = await api.get('/api/blogs')
    // // console.log('blogsAtEnd.body', blogsAtEnd.body)
    // expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)
    // // Note the instances of "body" above.

    const titles = blogsAtEnd.map(n => n.title)

    expect(titles).toContain(
        'A new, third blog entry'
    )
})

test('likes of a new blog become 0 when not given a value', async () => {
    const noLikesFieldBlog =
    {
        title: 'Zero Likes Dilemma',
        author: 'Delta',
        url: '999.com',
    }

    await api
        .post('/api/blogs')
        .send(noLikesFieldBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

    // Returns blogs as JSON
    const blogsAtEnd = await helper.blogsInDB()
    // console.log('Blogs at zero likes', blogsAtEnd)
    expect(blogsAtEnd[2].likes).toBeDefined()
    expect(blogsAtEnd[2].likes).toBe(0)
})

test('a blog without a title is not added', async () => {
    const titlelessBlog =
    {
        author: 'Nameless',
        url: 'www.titles-are-useless.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(titlelessBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})