import { createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { addNotification,deactivateNotification } from '../reducers/notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote = (event) =>{
    event.preventDefault()
    const notificationId= getId()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(addNotification({message:`You created ${event.target.anecdote.value}.`, id:notificationId}))
    event.target.anecdote.value=``;
    setTimeout(() => {
      dispatch(deactivateNotification(notificationId))
    }, 5000)
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