const Notification = ({message,messageType}) => {

    if (message === null) {
        return null
    }    
    console.log(messageType,message);
    return (
    <div className={messageType}>
        {message}
    </div>
    )
    }
export default Notification;