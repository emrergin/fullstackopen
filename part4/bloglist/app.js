const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI);

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app