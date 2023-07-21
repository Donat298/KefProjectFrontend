<template>
    <v-app>
      <v-main>
        <v-container>
          <div id="chat-window" style="height: 500px; overflow-y: auto;">
            <v-card v-for="(message, i) in messages" :key="i" class="pa-2 my-2" :class="message.sender">
              <v-card-text>{{ message.text }}</v-card-text>
            </v-card>
          </div>
          <div>
            <v-textarea v-model="newMessage" label="Type your message here" outlined rows="1" auto-grow></v-textarea>
            <v-btn @click="sendMessage">Send</v-btn>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        messages: [
          { text: 'Hello', sender: 'me' },
          { text: 'Hi', sender: 'other' },
          // Add more messages here
        ]
      }
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          this.messages.push({ text: this.newMessage, sender: 'me' });
          this.newMessage = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  #chat-window {
    border: 1px solid #b0b0b0;
    border-radius: 5px;
  }
  .me {
    background-color: #f0f0f0;
  }
  .other {
    background-color: #b0b0b0;
  }
  </style>
  