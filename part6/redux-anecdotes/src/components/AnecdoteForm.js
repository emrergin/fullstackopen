import { createAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { addNotification,deactivateNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const notificationId= getId()
    const content = event.target.anecdote.value;
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
    // console.log(newNote)
    // dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(addNotification({message:`You created ${newNote.content}.`, id:notificationId}))
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