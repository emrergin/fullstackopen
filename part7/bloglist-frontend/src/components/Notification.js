import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  if (notification.message === null) {
    return null;
  }
  console.log(notification.messageType, notification.message);
  return <div className={notification.messageType}>{notification.message}</div>;
};

export default Notification;
