import React, { useEffect, useState } from 'react';
import NotificationPopup from './NotificationPopup';
import WebSocketService from './WebSocketService';
import { ToastContainer } from 'react-toastify';
const NotificationPopupContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const stompClient = WebSocketService((notification) => {
     console.log('Notification received:', notification);
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      {notifications.length > 0 && (
        <NotificationPopup notification={notifications[notifications.length - 1]} />
      )}
      <ToastContainer />
    </div>
  );
};

export default NotificationPopupContainer;
