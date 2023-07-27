
<template>

<v-row justify="center" align="center" style="height: calc(100vh - 164px); background-color: rgb(21, 33, 44); 
  width:100%; ">
    <v-card  elevation="0" class="chat-container " style="height: 100%; display: flex; justify-content: center;">
      <v-card-text style="background-color: rgb(21, 33, 44);  align-items: center;" class="chat-messages" >
        <div style="max-width: 100%; width: 800px;  ">
          <div class="my-2 " v-for="(message, index) in messages" :key="index">
  <div :class="`bubble-container ${message.sender === user ? 'right' : 'left'}`">
    <!-- Add these debug lines -->
   

    <div :class="`bubble ${message.sender === user ? 'right' : 'left'}`">
      <div class="sender">{{ message.sender }}</div>
      <div class="text">{{ message.MessageText }}</div>
    </div>
  </div>
</div>
      </div>
      </v-card-text>
    </v-card>
</v-row>

  <v-bottom-navigation style="background-color: rgb(21, 33, 44); z-index: 0;"
      height="100"
      v-model="value"
      color="teal"
      elevation="0"
      grow
    >
    <div style="width: 100%; min-height: 100px; background-color: rgba(255, 228, 196, 0); display: flex; align-items: center; justify-content: center;">
      <v-form style="display: flex; width: 100%; max-width:800px; " ref="form" @submit.prevent="sendMessage">
        <v-textarea  class="pl-5"  
          variant="solo"
          single-line
          hide-details
          v-model="newMessage"
          label="Message"
          rows="1"
          max-rows="4"
          bg-color="secondary"
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

export default {
  name: 'App',
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      user: ''
    };
  },
  methods: {
    sendMessage() {
      if (!this.newMessage) return;

      // Sending message and username to server
      this.socket.emit('chat message', {
        sender: this.$store.getters.userDetail.username,
        MessageText: this.newMessage
      });

      this.newMessage = '';
    }
  },
  created() {
    this.user = this.$store.getters.userDetail.username;
    console.log("Current user: ", this.user); // log the current user

    // connect to the socket
    console.log("connecting to socket...");
    this.socket = io('https://kef.onrender.com', { path: '/chat' });
    console.log("connected to socket...");

    // Listen for 'all chat messages' event from the server
    this.socket.on('all chat messages', (msgs) => {
      console.log("getting chat messages from socket...");
      msgs.forEach(msg => this.messages.push(msg));
    });

    // Listen for 'new chat message' event from the server
    this.socket.on('new chat message', (msg) => {
      console.log("Received new chat message...");
      this.messages.push(msg);
    });
  }
};
</script>

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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 10px;
  
  
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

</style>




<!--template>
 
  <v-row justify="center" align="center" style="height: calc(100vh - 64px); background-color: rgb(21, 33, 44);">
    <v-card elevation="0" class="chat-container" style="max-width:800px; height: 100%;">
     
      
      <v-card-text class="chat-messages" >
        
    <div class="my-2" v-for="message in messages" :key="message.id">
      <div :class="`bubble-container ${message.sender === 'You' ? 'right' : 'left'}`">
        <div :class="`bubble ${message.sender === 'You' ? 'right' : 'left'}`">
          <div class="sender">{{ message.sender }}</div>
          <div class="text">{{ message.text }}</div>
        </div>
      </div>
    </div>
  </v-card-text>
      
    </v-card>
  </v-row>
  
  <v-bottom-navigation style="background-color: rgb(21, 33, 44); z-index: 0;"
      height="100"
      v-model="value"
      color="teal"
      elevation="0"
      grow
    >
    <div style="width: 100%; min-height: 100px; background-color: rgba(255, 228, 196, 0); display: flex; align-items: center; justify-content: center;">
  <v-form style="display: flex; width: 100%; max-width:800px; " ref="form" @submit.prevent="sendMessage">
    <v-textarea  class="pl-5"  style="overflow-y: visible;"
      variant="solo"
      single-line
      hide-details
      v-model="newMessage"   
      label="Message"
      rows="1"
      max-rows="4"
      bg-color="secondary"
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
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const messages = ref([

      { id: 1, sender: 'Bot', text: 'Hi there!' },
      { id: 2, sender: 'You', text: 'Hello!' },{ id: 3, sender: 'Bot', text: 'Did you know I was programmed to appreciate the Fibonacci sequence?' },

   
      
      
     
    ]);

    const newMessage = ref('');
    const form = ref(null);

    const sendMessage = () => {
      if (!newMessage.value) return;

      messages.value.push({
        id: messages.value.length + 1,
        sender: 'You', // this should be replaced with the actual sender
        text: newMessage.value
      });

      newMessage.value = '';
      form.value.reset();
    };

    return {
      messages,
      newMessage,
      form,
      sendMessage
    };
  }
}
</script>

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
}
.title {
  color: white;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Add this */
  max-height: 100vh; 
  overflow: auto;
}

</style-->

