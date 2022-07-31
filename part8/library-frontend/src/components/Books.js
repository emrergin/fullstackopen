import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author{
      name
    }
    published 
  }
}
`

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null
  }

  // const books = []
  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

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

export default Books
