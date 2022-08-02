const { UserInputError,AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET

const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root,args) => {
        let searchQuery = args?.genre? {genres: args.genre}:{};
        if(args?.author) {searchQuery.author=args.author}
        return Book.find(searchQuery).populate(`author`,{ name: 1,born:1 });
      },
      allAuthors:async () => {
        let Books = await Book.find({}).populate('author',{ name: 1,born:1 });
        let Authors= Books .reduce((a,b)=>{
          let index= a.findIndex(a=>a._id===b.author._id);
          if( index===-1){
            b.author.bookCount=1;
            a.push(b.author);
          }
          else{
            a[index].bookCount++;
          }
          return a
        }          
        ,[]
        )
        return Authors
      },      
      me: (root, args, context) => {
        return context.currentUser
      }
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

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
    
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
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
      },
  }

  module.exports = resolvers