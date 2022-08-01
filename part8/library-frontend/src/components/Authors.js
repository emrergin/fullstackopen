import { gql, useQuery,useMutation } from '@apollo/client'
import { useState,useRef } from 'react'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name,
    born
  }
}
`


const Authors = ({show,setError,token}) => {

  const [born, setBorn] = useState('')
  
  const [ changeYear ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS }, ],
    onError: (error)=>{
      setError(error.graphQLErrors[0].message)
    }
  })
  const authors = useQuery(ALL_AUTHORS);

  const selectName = useRef(null);


  const submit = (event) => {
    event.preventDefault()
  
    changeYear({ variables: { name:selectName.current.value, born:Number(born) } })
    setBorn('')
  }

  if (!show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }

  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token &&
      <>
        <h2>Set birthyear</h2>
        <div>
        <form onSubmit={submit}>
          <div>
            name
            <select
              ref={selectName}
            >
              {authors.data.allAuthors.map((a) => (
                  <option key={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            year
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
      </>
    }
    </div>
  )
}

export default Authors
