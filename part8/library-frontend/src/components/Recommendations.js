import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './Books'

const ME=gql`
query{
  me{    
    favouriteGenre
  }
}
`

const Recommendations = ({show}) => {
  const me = useQuery(ME);
  const genre= me?.data?.me.favouriteGenre;
  const books = useQuery(ALL_BOOKS,{  variables: { genre } });


  if (!show) {
    return null
  }

  if ( genre.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books from your favourite genre, <b>{genre}</b></p>
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
    </div>
  )
}

export default Recommendations
