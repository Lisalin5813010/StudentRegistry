<!--template>
  <div class="chat">
    <div class="messages">
      <div v-for="message in messages" :key="message.content" class="message">
        <strong>{{ message.sender }}:</strong> {{ message.content }}
      </div>
    </div>
    <input v-model="messageContent" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import WebSocketService from '@/services/WebSocketService';

export default {
  name: 'ChatView',
  setup() {
    const messageContent = ref('');
    const messages = ref([]);

    const sendMessage = () => {
      if (messageContent.value.trim() !== '') {
        WebSocketService.sendMessage({
          sender: 'User' + Math.floor(Math.random() * 1000),
          content: messageContent.value
        });
        messageContent.value = '';
      }
    };

    const onMessageReceived = (message) => {
      messages.value.push(message);
    };

    onMounted(() => {
      WebSocketService.connect(onMessageReceived);
    });

    return {
      messageContent,
      messages,
      sendMessage
    };
  }
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
}
.messages {
  flex: 1;
  overflow-y: auto;
}
.message {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
input {
  padding: 10px;
  border: 1px solid #ddd;
}
</style-->
