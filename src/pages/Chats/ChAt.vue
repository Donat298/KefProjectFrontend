<template>
<v-row justify="center" align="center" style="height: calc(100vh - 164px); background-color: #0c141b; width:100%; ">
    <v-card  elevation="0" class="chat-container pa-0" style="height: 100%; display: flex; justify-content: center;">
      <v-card-text style="background-color: #0c141b; align-items: center;" class="chat-messages">
        <div ref="messagesContainer" style="max-width: 90%; width: 800px; overflow-y: auto;">
          <div class="my-2 " v-for="(message, index) in messages" :key="index">
  <div :class="`bubble-container ${message.username === user ? 'right' : 'left'}`">
    <div :class="`bubble ${message.username === user ? 'right' : 'left'}`">
      <div class="sender">{{ message.username }}</div>
      <div class="text">{{ message.MessageText }}</div>
    </div>
  </div>
</div>
      </div>
      </v-card-text>
    </v-card>
</v-row>
  <v-bottom-navigation style="background-color: #0c141b; z-index: 0;"
      height="100"
      v-model="value"
      color="teal"
      elevation="0"
      grow
    >
    <div   style="width: 720px;max-width: 90%; min-height: 100px; background-color: rgba(255, 228, 196, 0); display: flex; align-items: center; justify-content: center;">
      <v-form  style="display: flex; width: 100%;   width: 842px;" ref="form" @submit.prevent="sendMessage">
        <v-textarea  class="mr-0 pl-0"  
          variant="solo"
          single-line
          hide-details
          v-model="newMessage"
          label="Message"
          rows="1"
          max-rows="4"
          bg-color="secondary"
          @keyup.enter.exact="sendMessage"
        ></v-textarea>
        <div class="d-flex align-center" style="height: 64px; margin-top: auto; display: flex;">
          <v-btn rounded="xl"  class="ml-2 mr-2" size="small"
          type="submit" style="height: 50px; width: 44px; color: aquamarine;"  icon="mdi-send"> </v-btn>
        </div>
      </v-form>
    </div>
  </v-bottom-navigation>
</template>
<script>
import io from 'socket.io-client';
import { axiosInstance} from "../../utils/axios";
export default {
  name: 'App',
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      user: '',  
      value: null,
    };
  },
  methods: {
    sendMessage() {
      // Check if the user is authenticated
      if (!this.$store.getters.isAuthenticated) {
        // If not authenticated, redirect to the register page
        this.$router.push('/auth/register'); // Assuming `/auth/register` is your registration route.
        return;
      }

      // If authenticated, proceed to send the message
      if (!this.newMessage || !this.user) return;

      this.socket.emit('chat message', {
        sender: this.user,  
        MessageText: this.newMessage
      });

      this.newMessage = '';
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    removeMessageById(messageId) {
      this.messages = this.messages.filter(msg => msg._id !== messageId);
    }
  },
  created() {
    // The username might be empty if the user is unauthorized
    this.user = this.$store.getters.userDetail ? this.$store.getters.userDetail.username : '';

    console.log("connecting to socket...");
    this.socket = io(axiosInstance.defaults.baseURL, { path: '/chat', query: 'token=' + this.$store.getters.accessToken });
    console.log("Socket.IO base URL %s", axiosInstance.defaults.baseURL);
    console.log("connected to socket...");

    // Listen for 'all chat messages' event from the server
    this.socket.on('all chat messages', (msgs) => {
      console.log("getting chat messages from socket...");
      msgs.forEach(msg => this.messages.push(msg));
      this.scrollToBottom();
    });
    // Listen for 'new chat message' event from the server
    this.socket.on('new chat message', (msg) => {
      console.log("Received new chat message...");
      this.messages.push(msg);
      this.scrollToBottom();
    });
    // Listen for 'remove chat message' event from the server
    this.socket.on('remove chat message', (messageId) => {
      console.log("Received instruction to remove chat message with ID: ", messageId);
      this.removeMessageById(messageId);
    });
    this.socket.on('remove chat message', (msgId) => {
  this.messages = this.messages.filter(msg => msg._id !== msgId);
}); 
  },
};
</script>
These are 2 files, one is on the back end and 2 is on the client. You can do this and change the code so that when the user,
 even if he is not authorized, he can still see the messages. Please write out the changed code, in full without skipping.


<style scoped>
.bubble {
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: inline-block;
  flex-direction: column;
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 70%;
}
.bubble-container {
  display: flex;
  flex-direction: column;
}
.bubble-container.right {
  align-items: flex-end;
}
.bubble-container.left {
  align-items: flex-start;
}
.bubble .sender {
  font-weight: bold;
  color: white;
}
.bubble.right .sender {
  text-align: right;
}
.bubble.left .sender {
  text-align: left;
}
.bubble .text {
  margin-top: 5px;
  color: white;
}
.bubble.left {
  background-color: rgb(30, 44, 56);
  align-self: flex-start;
  text-align: left;
}
.bubble.right {
  background-color: rgb(36, 52, 65);
  align-self: flex-end;
  text-align: left;
}
.v-card-text {
  display: flex;
  flex-direction: column;
  padding: 0rem;
}
.v-card-actions {
  margin-top: auto;
  background-color: rgb(21, 33, 44);
}
.chat-messages {
  overflow-y: auto;
  flex: 1 1 auto;
  background-color: rgb(21, 33, 44);


}
.chat-container {
  background-color: rgb(21, 33, 44);
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
  overflow: auto;

}
::-webkit-scrollbar {
  width: 0px;
  
  
}

/* Track */
::-webkit-scrollbar-track {
  background: #15212c;
  border-radius: 30px;  
  margin-block: 10px;
  
  
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c4257;
  border-radius: 30px;
}
.v-row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
     margin: 0px !important;  
}

</style>
