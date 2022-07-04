import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification,deactivateNotification } from '../reducers/notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteList = () => {
    const searchQuery = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter(a=>a.content.toUpperCase().indexOf(searchQuery.toUpperCase())!==-1))

    const dispatch = useDispatch()
  
    const vote= (id,text) =>{
        console.log(`You voted ${text}`)
        dispatch(addVote(id));
        const notificationId= getId()
        dispatch(addNotification({message:`You voted ${text}` , id: notificationId}))
        setTimeout(() => {
            dispatch(deactivateNotification(notificationId))
          }, 5000)
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
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
            )}
        </div>    
     );
}
 
export default AnecdoteList;