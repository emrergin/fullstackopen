import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteList = () => {
    const searchQuery = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter(a=> a.content.toUpperCase().indexOf(searchQuery.toUpperCase())!==-1))

    const dispatch = useDispatch()
  
    const vote= (anecdoteToChange) =>{

        const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1 
        }
        console.log(`You voted ${anecdoteToChange.content}`)
        dispatch(updateAnecdote(changedAnecdote));
        dispatch(setNotification(`You voted ${anecdoteToChange.content}.`,5))
    }
    return (         
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>    
     );
}
 
export default AnecdoteList;