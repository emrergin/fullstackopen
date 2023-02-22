const express = require('express')
require('express-async-errors')
const app = express()

const middleware = require('./util/middleware')


const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start();




// const { Sequelize, Model, DataTypes } = require('sequelize')
// const express = require('express')
// const app = express()

// app.use(express.json())

// const sequelize = new Sequelize(process.env.DATABASE_URL)







// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
