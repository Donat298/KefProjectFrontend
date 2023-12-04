<template>
  <v-row justify="center" align="center" style="height: calc(100vh - 164px); background-color: #0c141b; width: 100%;">
    <div v-if="isLoading" style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
      <vproGressMini style="max-height: 66px; max-width: 118px;"/>  
    </div>
    <v-card elevation="0" class="chat-container pa-0" style="height: 100%; width: 100%; display: flex; justify-content: center;">
      <v-card-text style="background-color: #0c141b; align-items: center;" class="chat-messages">
        <div ref="messagesContainer" style="max-width: 100%; width: 100%; overflow-y: auto;">
          <div class="my-2 mx-auto" v-for="(message, index) in messages" :key="index" style="width: 800px; 
          max-width: 90%;">
            <div :class="`bubble-container ${message.username === user ? 'right' : 'left'}`">
              <div :class="`bubble ${message.username === user ? 'right' : 'left'}`">
                <div class="avatar-container">
                  <img :src="message.userAvatar ? message.userAvatar : require('@/assets/Kefdeflogo.svg')"
                   alt="User Avatar" class="user-avatar" />
                </div>
                <div class="message-content">
                  <div class="sender">{{ message.username }} </div>
                  <div class="text">{{ message.MessageText }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-row>
  <v-bottom-navigation style="background-color: #0c141b; z-index: 0;" height="100" v-model="value" color="teal" elevation="0" grow>
    <div style="width: 800px; max-width: 90%; min-height: 100px; background-color: rgba(255, 228, 196, 0); display: flex; align-items: center; justify-content: center;">
      <v-form style="display: flex;align-items: center; width: 100%; width: 842px;" ref="form" @submit.prevent="sendMessage">
       
        <input 
        :counter="200" 
         v-focus
         class=" inputbet" 
         @keyup.enter.exact="sendMessage"
         v-model="newMessage"
         style="padding: 0px 15px; font-size: 17px; "
         :style="{ borderColor: newMessage.length > 200 ? 'red' : '' }"
  >

        
          
          <button class="ml-2" 
        type="submit" style="background-color: rgb(30, 44, 56); min-width: 50px; border-radius: 50px; 
        display: flex; align-items: center; justify-content: center; 
        height: 50px; "
        :disabled="newMessage.length > 200 || isLoading" :style="{ opacity: newMessage.length > 200 ? 0.7 : 1 }"
>
<font-awesome-icon  style="color: #ffffff; height: 17px;margin-right: 2px;"  :icon="['fas', 'paper-plane']" />
</button>
          
      
      </v-form>
    </div>
  </v-bottom-navigation>
</template>
<font-awesome-icon  style="color: #ffffff; "  :icon="['fas', 'wallet']" />
<script>
import io from 'socket.io-client';
import { axiosInstance} from "../../utils/axios";
import vproGressMini from "../../components/ProgrammInterface/vproGressMini.vue"
export default {
  components: {
    vproGressMini
  },
  name: 'App',
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      user: '',  
      value: null,
      isLoading: true, // Add isLoading data property
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
      if (!this.newMessage || !this.user || this.newMessage.length > 200) {
        return; // Do not send if the message is empty or too long
      }

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
    },
    loadingComplete() {
      this.isLoading = false;
    },
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
      this.loadingComplete(); // Call loadingComplete when data is loaded
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

<style scoped>

  .bubble {
    display: flex;
    padding: 15px 15px;
    margin-bottom: 10px;
    border-radius: 10px;
    word-break: break-word;
    white-space: pre-wrap;
    max-width: 70%;
   
  }
  .bubble-container {
    display: flex;
    flex-direction: column;
  }

  .bubble.left .avatar-container {
    width: 54px;
    min-width: 54px;
    height: 54px;
    overflow: hidden;
    border-radius: 50%;
   margin-right: 10px;
  }

  .bubble.right .avatar-container {
    width: 54px;
    min-width: 54px;
    height: 54px;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 10px;
  }
  .inputbet {
  width: 100%;
  height: 62px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputbet:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}
  .bubble .message-content {
    flex-grow: 1; /* Allow message content to expand and fill the remaining space */
  }

  .bubble .sender {
    font-weight: bold;
    font-size: 20px;
    color: rgb(99, 254, 202);

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
    font-size: 17px;


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
    flex-direction: row-reverse; /* Mirror the messages on the right */
  }
  .v-card-text {
    display: flex;
    flex-direction: column;
    padding: 0px;
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
    width: 5px;
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
  .user-avatar {
    width: 100%;
    height: 100%;

  }
</style>