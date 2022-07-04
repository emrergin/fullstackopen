import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useSelector } from 'react-redux'


const App = () => {
  const notifications = useSelector(state => state.notifications.filter(a=> a.active))

  return (
    <div>
      {notifications.map(notification =>
      <div key={notification.id}>
        <Notification notification={notification.message}/>
      </div>
      )}
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App