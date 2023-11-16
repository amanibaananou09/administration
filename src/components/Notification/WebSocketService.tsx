import webstomp, { Client, Frame } from 'webstomp-client';

const WebSocketService = (onNotificationReceived: (notification: string) => void): Client => {
  let stompClient: Client | null = null;

  const connect = () => {
    const socket = new WebSocket("ws://localhost:8083/api/websocket-endpoint");
    stompClient = webstomp.over(socket);

    stompClient.connect({}, () => {
      console.log('WebSocket connected');
      stompClient?.subscribe('/topic/alerts', (message: Frame) => {
        const notification: string = message.body || '';
        onNotificationReceived(notification);
      });
    }, (error: any) => {
      console.error('WebSocket connection error:', error);
      setTimeout(connect, 2000); // Reconnect every 2 seconds (adjust as needed)
    });
  };

  const reconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('Disconnected. Attempting to reconnect...');
        connect();
      });
    } else {
      connect();
    }
  };

  const setupConnection = () => {
    if (!stompClient) {
      connect();
    }

    if (stompClient) {
      stompClient.ws.onclose = () => {
        console.log('WebSocket connection closed');
        reconnect();
      };
    }
  };

  setupConnection();

  if (stompClient) {
    return stompClient;
  } else {
    throw new Error('WebSocket connection initialization failed');
  }
};

export default WebSocketService;
