<template>
  <v-row justify="center" align="center" style="height: calc(100vh - 64px); background-color: rgb(21, 33, 44);">
    <v-card elevation="0" class="chat-container" style="max-width:1250px; height: 100%;">
      <v-card-title>
        <span class="title">Kef Chat</span>
      </v-card-title>
      
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
      <v-card-actions>
        <div style="width: 100%; min-height: 100px; background-color: rgba(255, 228, 196, 0); display: flex; align-items: center; justify-content: center;">
  <v-form style="display: flex; width: 100%;" ref="form" @submit.prevent="sendMessage">
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
    <div class="d-flex align-center" style="height: 64px; margin-top: auto;">
      <v-btn class="ml-2 mr-5 align-center" style="height: 44px;" type="submit" append-icon="mdi-send" color="secondary">Send</v-btn>
    </div>
  </v-form>
</div>
 
       
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const messages = ref([
      { id: 1, sender: 'Bot', text: 'Hi there!' },
      { id: 2, sender: 'You', text: 'Hello!' },
    
      
      
     
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
  max-width: 60%;
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

</style>

