const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: "Patron",
        name: "Barack Obama",
        password: "638"
    },
    {
        username: "Death",
        name: "George",
        password: "121212"
    }
]

const tokenGetter = async () => {
    await User.deleteMany({})
    const newUser = {
        username: "JBoy",
        name: "Jonathan Brown",
        password: "1299"}
    await api
        .post('/api/users')
        .send(newUser)
    const tokenSender = await api
        .post('/api/login')
        .send(newUser)
    return tokenSender.body.token;
  };

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  },10000)
describe('tests related with blogs.' ,() => {
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
            const token = await tokenGetter();
            const newBlog = {
                title: "My mercy encompasses all things",
                author: "Jonathan Brown",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                likes : 15
            }
        
            await api
                .post('/api/blogs')
                .set('Authorization','bearer '+token)
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
            const token = await tokenGetter();
            await api
            .post('/api/blogs')
            .set('Authorization','bearer '+token)
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
            const token = await tokenGetter();
            await api
            .post('/api/blogs')
            .set('Authorization','bearer '+token)
            .send(newBlog)
            .expect(400)
        },10000)
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const newBlog = {
                title: "Everything is in vain",
                author: "Some Loser",
                url: "https://zamzam.com/blog/ayat-in-quran/"
            }
        const token = await tokenGetter();
        const toBeDeleted = await api
                                .post(`/api/blogs/`)
                                .send(newBlog)
                                .set('Authorization','bearer '+token)
        blogToDelete = toBeDeleted.body;
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization','bearer '+token)
            .expect(204)
    
        const blogsAtEnd = await Blog.find({})
    
        expect(blogsAtEnd).toHaveLength(
            initialBlogs.length
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
})

describe('tests related with users', ()=>{
    describe('new user sign up', () => {
        test('succeeds if data is valid', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                username: "JBoy",
                name: "Jonathan Brown",
                password: "1299"
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/users')
        
            const usernames = response.body.map(r => r.username)
        
            expect(response.body).toHaveLength(usersAtStart.length + 1)
            expect(usernames).toContain(
            'JBoy'
            )
        })
        test('does not succeed if password is missing', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                username: "JBoy",
                name: "Jonathan Brown"
            }
            const result =await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('Password is required.')
            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toEqual(usersAtStart)
        })
        test('does not succeed if password is too short', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                username: "JBoy",
                name: "Jonathan Brown",
                password: "4"
            }
            const result =await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('Password is too short.')
            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toEqual(usersAtStart)
        })
        test('does not succeed if username is missing', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                name: "Jonathan Brown",
                password:"asasasasas"
            }
            const result =await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('Username is required.')
            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toEqual(usersAtStart)
        })
        test('does not succeed if username is too short', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                username: "J",
                name: "Jonathan Brown",
                password: "41212121212"
            }
            const result =await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('Username is too short.')
            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toEqual(usersAtStart)
        })
        test('does not succeed if username is not unique', async () => {
            const usersAtStart = await User.find({});

            const newUser = {
                username: "root",
                name: "Jonathan Brown",
                password: "41212121212"
            }
            const result =await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('Username is taken.')
            const usersAtEnd = await User.find({})
            expect(usersAtEnd).toEqual(usersAtStart)
        })
    })
})

afterAll(() => {
mongoose.connection.close()
})