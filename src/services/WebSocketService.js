/*import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';

const SOCKET_URL = 'http://localhost:8081/chat-websocket';

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  connect(onMessageReceived) {
    const socket = new SockJS(SOCKET_URL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/messages', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    }, (error) => {
      console.error('Error connecting to WebSocket:', error);
    });
  }

  sendMessage(message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/chat', {}, JSON.stringify(message));
    }
  }
}

export default new WebSocketService();*/
