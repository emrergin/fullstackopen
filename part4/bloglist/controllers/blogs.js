const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs);
      })
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
    
    if (blog.title || blog.url){
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }else{
      response.status(400)
      next( new Error('url and title are missing'))
    }
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(204).json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter