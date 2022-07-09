import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  if (notification.message === null) {
    return null;
  }
  console.log(notification.messageType, notification.message);
  // return <div className={notification.messageType}>{notification.message}</div>;
  return <Alert variant={notification.messageType === "success" ? "success" : "danger"}>{notification.message}</Alert>
};

export default Notification;
