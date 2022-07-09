const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate(`user`,{ username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs);
      })
  })

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const comment = request.body.comment;
  
  let blogToBeUpdated = await Blog.findById(request.params.id)
  let commentList = blogToBeUpdated.comments ? blogToBeUpdated.comments : [];

  let updatedBlog = {
    ...blogToBeUpdated,
    comments: commentList.push(comment)
  }

  let responseUpdate = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })

  return response.status(200).json(responseUpdate)
  
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
      return response.status(401).json({ error: 'url and title are missing' })
      // next( new Error('url and title are missing'))
    }
})

blogsRouter.delete('/:id', middleware.userExtractor,async (request, response) => {
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
    user: body.user,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate(`user`,{ username: 1, name: 1 })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })
    .catch(error => next(error))
})



module.exports = blogsRouter