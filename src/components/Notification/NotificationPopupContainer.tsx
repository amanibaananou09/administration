import { ALERTS_TOPIC } from "common/api/WebSocketTopics";
import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { useESSContext } from "store/ESSContext";
import NotificationPopup from "./NotificationPopup";

const NotificationPopupContainer = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const { isAdminMode } = useESSContext();

  useSubscription(ALERTS_TOPIC, (message) => {
    const notification: string = message.body || "";
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  });

  return (
    <div>
      {!isAdminMode && (
        <>
          {notifications.length > 0 && (
            <NotificationPopup
              notification={notifications[notifications.length - 1]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NotificationPopupContainer;
