const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "With hardships comes ease",
        author: "Ahmet Sel",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        likes : 5
    },
    {
        title: "Papatyalar",
        author: "Ozlem yildiz",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        likes : 7
    },
  ]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json and is the correct amount', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('the identifier named id exists', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((blog)=>
        {
            expect(blog.id).toBeDefined();
        })
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "My mercy encompasses all things",
            author: "Jonathan Brown",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            likes : 15
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(r => r.title)
    
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain(
        'My mercy encompasses all things'
        )
    })

    test('a blog without like will have 0 likes', async () => {
        const newBlog = {
            title: "It's not the eyes that are blind but the hearts",
            author: "Roger Garaudy",
            url: "https://zamzam.com/blog/ayat-in-quran/"
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
    
        const likeList = response.body.map(r => r.likes)
    
        expect(likeList[likeList.length-1]).toBe(0)
    })

    test('title or url should exist', async () => {
        const newBlog = {
            author: "Roger Garaudy",
        }  
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    },10000)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await Blog.find({})
  
      expect(blogsAtEnd).toHaveLength(
        initialBlogs.length - 1
      )
  
      const titles = blogsAtEnd.map(r => r.title)
  
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

describe('update of a blog', () => {
test('succeeds if id is valid', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
    const updateInfo = {
         ...blogsAtStart[0],likes: 99
    } 

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateInfo)
        .expect(204)

    const updatedBlog =  await Blog.findById(blogToUpdate.id);
    console.log(updatedBlog)
    expect(updatedBlog.likes).toBe(99);
})
})

afterAll(() => {
mongoose.connection.close()
})