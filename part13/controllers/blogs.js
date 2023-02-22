const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const blogs =  await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body);
    return res.json(blog);
})

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        await blog.destroy()
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

router.put('/:id',async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes;
        await blog.save()
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router