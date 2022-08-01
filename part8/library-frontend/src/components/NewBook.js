import { useState } from 'react'
import { gql, useMutation  } from '@apollo/client'
import { ALL_BOOKS } from './Books'
import { ALL_AUTHORS } from './Authors'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published:Int!,$genres:[String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    published,
    author{
      name
      born
      bookCount
    }
  }
}
`

const NewBook = ({show,setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK,{
    onError: (error)=>{
      setError(error.graphQLErrors[0]?.message)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addBook.author),
        }
      })
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({  variables: { title, author, published:Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('') 

  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
