<template>
  <!-- Your existing template code -->
  <div style="margin: 10px; word-break: break-word; white-space: pre-wrap; color: #ffffff;">
    Be sure to click on the (Made a transaction) button after transferring crypto.
  </div>
  <div style="display: flex; flex-shrink: 0;">
    <div style="position: relative; flex-grow: 1; display: flex;">
      <v-btn
        @click="sendSMS"
        class="mx-auto"
        elevation="8"
        :ripple="false"
        style=" color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 17px;"
        :disabled="isButtonDisabled"
        :style="buttonStyle" 
      >
        <span style="color: #ffffff; font-size: 13px;">
          {{ buttonText }}
        </span>
      </v-btn>
    </div>
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
    const isButtonDisabled = ref(false);
    const buttonText = ref('Made a transaction');
    
    const buttonStyle = ref({
      backgroundColor: '#1E88E5', // Default background color
      opacity: 1, // Default opacity
    });

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
        const selectedCurrency = store.getters.selectedCurrency;
        const username = store.getters.userDetail.username;

        const formattedCurrency = selectedCurrency.replace(/^balance/, '');

        isButtonDisabled.value = true;
        buttonText.value = 'Sending...';

        // Update the button style to make it fade out
        buttonStyle.value = {
          ...buttonStyle.value,
          opacity: 0.5, // Adjust opacity for the fade-out effect
        };

        const response = await axiosPrivateInstance.post('/users/deposit', {
          userId: userId.value,
          currency: formattedCurrency,
          username: username,
        });

        // Handle the response as needed
        console.log(response.data);
        errorMsg.value = '';

        // Update the button text when the button is clicked
        buttonText.value = 'Transaction Sent!';
        
        // Reset the button text and enable the button after 10 seconds
        setTimeout(() => {
          isButtonDisabled.value = false;
          buttonText.value = 'Made a transaction';
          // Reset the button opacity
          buttonStyle.value = {
            ...buttonStyle.value,
            opacity: 1,
          };
        }, 10000); // 10 seconds
      } catch (error) {
        errorMsg.value = error.response.data.message;
        isButtonDisabled.value = false;
        buttonText.value = 'Made a transaction';
        // Reset the button opacity on error
        buttonStyle.value = {
          ...buttonStyle.value,
          opacity: 1,
        };
      }
    };

    return {
      sendSMS,
      errorMsg,
      isButtonDisabled,
      buttonText,
      buttonStyle,
    };
  },
};
</script>
