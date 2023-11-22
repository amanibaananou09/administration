import React, { useEffect, useState } from 'react';
import NotificationPopup from './NotificationPopup';
import WebSocketService from './WebSocketService';
import { ToastContainer } from 'react-toastify';
import { useESSContext } from "store/ESSContext";
const NotificationPopupContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const { isAdminMode } = useESSContext();
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
        {!isAdminMode && (
          <>
            {notifications.length > 0 && (
              <NotificationPopup notification={notifications[notifications.length - 1]} />
            )}
            <ToastContainer />
          </>
        )}
      </div>
    );
  };

export default NotificationPopupContainer;
