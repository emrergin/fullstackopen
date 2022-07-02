const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const requestLogger = (request, response, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:  ', request.path)
//   logger.info('Body:  ', request.body)
//   logger.info('---')
//   next()
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
        }
        return null
    }
    request.token = getTokenFrom(request);
    next();
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id);
    if (!request.user){
      return response.status(401).json({ error: 'token is invalid' })
    }
    next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}