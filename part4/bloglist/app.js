const config = require('./utils/config')
const http = require('http')
const express = require('express')
require('express-async-errors')

const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('connected to MongoDB in bloglist')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB in bloglist:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app