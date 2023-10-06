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

module.exports = {
    initialBlogs
}