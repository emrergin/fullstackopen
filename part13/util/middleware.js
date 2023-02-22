const { SECRET } = require('../util/config')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError' || error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if(error.name === "SequelizeDatabaseError"){
    return response.status(400).json({
      error: error.message
    })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}