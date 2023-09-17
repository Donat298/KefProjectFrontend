
<template>
  <div>
    <input v-model="message" type="text" placeholder="Enter your message" />
    <button @click="sendSMS">Send Message</button>
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
      const message = ref(''); // The message entered by the user

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
          const response = await axiosPrivateInstance.post('/users/withdraw', {
            userId: userId.value,
            message: message.value, // Send the message entered by the user
          });

          // Handle the response as needed
          console.log(response.data);
          errorMsg.value = '';
        } catch (error) {
          errorMsg.value = error.response.data.message;
        }
      };

      return {
        sendSMS,
        errorMsg,
        message,
      };
    },
  };
</script>
