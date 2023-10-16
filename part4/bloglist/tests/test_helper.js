const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'This is the first blog',
        author: 'Joonas Jamsa',
        url: 'made-up-address.com',
        likes: 2
    },
    {
        title: 'Title of the second blog',
        author: 'Someone else',
        url: 'made-up-address.com',
        likes: 3
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}