import { gql, useQuery } from '@apollo/client'
import {useState} from 'react'


export const ALL_BOOKS = gql`
query getBooks($genre: String){
  allBooks(genre:$genre) { 
    title 
    author{
      name
    }
    published 
    genres
  }
}
`

const ALL_GENRES = gql`
query{
  allBooks { 
    genres
  }
}
`

const Books = (props) => {
  
  const [genre,setGenre]=useState(null);
  const books = useQuery(ALL_BOOKS,{  variables: { genre } });
  const genres= useQuery(ALL_GENRES);


  if (!props.show) {
    return null
  }

  // const books = []
  if (books.loading) {
    return <div>loading...</div>
  }
  const genreList = Array.from(new Set(genres.data.allBooks.flatMap(a=>a.genres)));

  return (
    <div>
      <h2>books</h2>
      {genre&& <p>In genre <b>{genre}</b></p> }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genreList.map(
        genre=> <button key={genre} onClick={()=>setGenre(genre)}>{genre}</button>
      )}
      </div>
    </div>
  )
}

export default Books
