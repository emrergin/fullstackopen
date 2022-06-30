const Notification = ({message,messageType}) => {

    if (message === null) {
        return null
    }    
    console.log(messageType,message);
    // console.log(messageType);
    return (
    <div className={messageType}>
        {message}
    </div>
    )
    }
export default Notification;