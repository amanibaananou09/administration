import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationPopupProps {
  notification: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ notification }) => {
console.log('Notification popup:', notification);
  toast.error(notification, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return null;
};


export default NotificationPopup;
