import { REFRESHER_TOPIC } from "common/api/WebSocketTopics";
import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";

const useRefresher = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  useSubscription(REFRESHER_TOPIC, () => {
    setRefresh((prev) => !prev);
  });

  return {
    refresh,
  };
};

export default useRefresher;
