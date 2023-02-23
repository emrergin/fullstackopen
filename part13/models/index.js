const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_list')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'users_reading' })

module.exports = {
  Blog,User,ReadingLists
}