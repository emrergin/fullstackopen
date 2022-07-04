import { createAnecdote} from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteForm = (props) => {

  const addAnecdote = async (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value;
    props.createAnecdote(content)
    props.setNotification(`You created ${content}.`,5)
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

const mapDispatchToProps = {
  createAnecdote,setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm