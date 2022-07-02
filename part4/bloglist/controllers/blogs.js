const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate(`user`,{ username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs);
      })
  })
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body;
    const currentUser = request.user;
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: currentUser
    })
    
    if (blog.title || blog.url){
      await blog.populate(`user`,{ username: 1, name: 1 });
      const savedBlog = await blog.save()
      currentUser.blogs=currentUser.blogs.concat(savedBlog._id);
      await currentUser.save();
      response.status(201).json(savedBlog)
    }else{
      response.status(400)
      next( new Error('url and title are missing'))
    }
})

blogsRouter.delete('/:id', middleware.userExtractor,async (request, response, next) => {
  const currentUser = request.user;
  const theBlogToDelete = await Blog.findOne({_id:request.params.id, user:currentUser });
  if (theBlogToDelete){
    theBlogToDelete.remove();
    response.status(204).end();
  }
  else{
    return response.status(401).json({ error: 'this user does not have such a blog' })
  }
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