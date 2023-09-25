<template>
  
  <div style="margin: 10px; word-break: break-word; white-space: pre-wrap; color: #ffffff;">
    Be sure to click on the (Made a transaction) button after transferring crypto.
  </div>
  <div style=" display: flex; flex-shrink: 0;">
    <div style="position: relative; flex-grow: 1;  display: flex;">
      <v-btn
      @click="sendSMS"
      class="mx-auto"
      color="blue"
        elevation="8"
        :ripple="false"
        style="background-color: #2e4659; color: #ffffff; display: flex; align-items: center;
         justify-content: center; font-size: 17px;"
      >
        <span style="color: #ffffff; font-size: 13px;">Made a transaction</span>
      </v-btn>
     
        
    </div>
  </div>
  <div style="margin: 10px; word-break: break-word; white-space: pre-wrap; color: #00ff00;">
    {{ message }}
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useApiPrivate } from '../../utils/useApi';

export default {
  setup() {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const errorMsg = ref('');
    const router = useRouter();
    const userId = ref(store.getters.userDetail._id);
    const message = ref(''); // Add a reactive variable for the message

    const checkAuthentication = () => {
      if (!store.getters.isAuthenticated) {
        router.push('/auth/register');
        return false;
      }
      return true;
    };

    const sendSMS = async () => {
      if (!checkAuthentication()) return;

      try {
        const selectedCurrency = store.getters.selectedCurrency; // Get the selected currency from Vuex
        const username = store.getters.userDetail.username; // Get the username from Vuex

        // Remove 'balance' from the selected currency if it's present
        const formattedCurrency = selectedCurrency.replace(/^balance/, '');

        const response = await axiosPrivateInstance.post('/users/deposit', {
          userId: userId.value,
          currency: formattedCurrency, // Send the selected currency without 'balance'
          username: username, // Send the username
        });

        // Handle the response as needed
        console.log(response.data);
        errorMsg.value = '';

        // Update the message when the button is clicked
        message.value = 'Now wait for your balance to be replenished';
      } catch (error) {
        errorMsg.value = error.response.data.message;
      }
    };

    return {
      sendSMS,
      errorMsg,
      message, // Return the message variable
    };
  },
};
</script> 
