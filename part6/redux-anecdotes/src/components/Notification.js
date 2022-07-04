import { connect } from 'react-redux'
const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
    {props.notifications.map(notification =>
      <div key={notification.id} style={style}>
        {notification.message}
      </div>
    )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.filter(a=> a.active)
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification