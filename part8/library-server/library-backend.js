require('dotenv').config()

const { ApolloServer, UserInputError,AuthenticationError,gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { v1: uuid } = require('uuid')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type Author{
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Book{
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type User {
      username: String!
      favouriteGenre: String!
      id: ID!
    }    
    type Token {
      value: String!
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author:String, genre:String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
    type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
        ): Book!
        editAuthor(
            name: String!
            setBornTo: Int!
          ): Author
        createUser(
          username: String!
          favouriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root,args) => {
      if (args?.genre){
        return Book.find({  genres: args.genre }).populate(`author`,{ name: 1});
      }
      return Book.find({ }).populate(`author`,{ name: 1 });
    },
    allAuthors:async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author:{
    bookCount: (root)=> books.filter(b=>b.author===root.name).length
  },
  Mutation: {
    addBook: async (root, args,context) => {
      let book;
      const currentUser = context.currentUser
      if (!currentUser){
        throw new AuthenticationError("not authenticated")
      }
      try{
        let authorOfTheBook= await Author.findOne({name: args.author});
        if (authorOfTheBook===null){
          authorOfTheBook = new Author({name:args.author});
          await authorOfTheBook.save();
        }
        book = new Book({ ...args, author: authorOfTheBook})
        await book.save();
      }catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book;
    },
    editAuthor: async(root,args,context)=>{
      let authorToBeUpdated;
      const currentUser = context.currentUser
      try{
        if (!currentUser){
          throw new AuthenticationError("not authenticated")
        }
        authorToBeUpdated= await Author.findOne({name: args.name});
        if (!authorToBeUpdated){return null;}
        authorToBeUpdated.born=args.setBornTo;
        await authorToBeUpdated.save();
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return authorToBeUpdated
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})