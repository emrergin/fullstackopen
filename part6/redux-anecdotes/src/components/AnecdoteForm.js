import { createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

// const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created ${content}.`,5))
    event.target.anecdote.value=``;
  }

    return (       
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form> 
        </div>
    );
}
 
export default AnecdoteForm;