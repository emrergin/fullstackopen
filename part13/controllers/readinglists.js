const router = require('express').Router()


const { ReadingLists} = require('../models')
// const { sequelize } = require('../util/db');
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const blogId =  req.body.blogId;
  const userId =  req.body.userId;
  const newToRead = await ReadingLists.create({blogId, userId})
  return res.json(newToRead);
})

router.put('/:id', tokenExtractor,async (req, res) => {
  const readItem = await ReadingLists.findByPk(req.params.id);
  if (readItem) {
    if(readItem.userId===req.decodedToken.id){
      const bool =  req.body.read;
      readItem.read = bool;
      await readItem.save();
      res.json(readItem)
    }
    else{
        return res.status(401).json({ error: 'this reading list item belongs to someone else' })
    }

} else {
    res.status(404).end()
}



  console.log(req.body)
  const blogId =  req.body.blogId;
  const userId =  req.body.userId;
  const newToRead = await ReadingLists.create({blogId, userId})
  return res.json(newToRead);
})

module.exports = router