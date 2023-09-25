<template>
    <div class="inputs" style="margin: 10px;">
        
      <select v-model="selectedCurrency" style="background-color: bisque;">
        <option value="usdt">USDT</option>
        <option value="btc">BTC</option>
        <option value="eth">ETH</option>
        <option value="eur">EUR</option>
      </select>

      

      <!-- Add a second select for network (BSC or ETH) -->
      <select v-if="selectedCurrency === 'usdt'" v-model="selectedNetwork" style="background-color: bisque;">
        <option value="bsc">BSC</option>
        <option value="eth">ETH</option>
        <option value="matic">POLYGON</option>
      </select>
      <select v-if="selectedCurrency === 'eth'" v-model="selectedNetwork" style="background-color: bisque;">
        <option value="bsc">BSC</option>
        <option value="eth">ETH</option>
      </select>
  

      <div>
      <div style="color: white" class="text-color-white d-flex align-center justify-space-between">
        Address
      </div>
  
      <input
        v-model="message1"
        class="inputwithdrawnumber"
        style="padding: 0px 15px; margin-bottom: 10px;"
      />
  
      <div style="color: white" class="text-color-white d-flex align-center justify-space-between">
        Amount
      </div>
  
      <input
        v-model="message2"
        class="inputadress"
        style="padding: 0px 15px; margin-bottom: 20px;"
        type="number"
        inputmode="numeric"
      />
    </div>
      <v-btn
        class="mx-auto"
        @click="sendSMS"
        color="blue"
        elevation="8"
        :ripple="false"
        style="background-color: #2e4659; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 17px;"
      >
        <span style="color: #ffffff; font-size: 13px;">Made a withdraw</span>
      </v-btn>
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
      const selectedNetwork = ref(''); // Initialize it with an empty string


      const userId = ref(store.getters.userDetail._id);
      const message1 = ref('');
      const message2 = ref('');
      const selectedCurrency = ref(''); // Selected currency

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
    const requestBody = {
      userId: userId.value,
      message1: message1.value,
      message2: message2.value,
      currency: selectedCurrency.value,
    };

    // Check if the selected currency supports a network
    if (selectedCurrency.value === 'usdt') {
      requestBody.selectedNetwork = selectedNetwork.value;
    }

    const response = await axiosPrivateInstance.post('/users/withdraw', requestBody);

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
        message1,
        message2,
        selectedCurrency,
        selectedNetwork,
      };
    },
  };
</script>









<style>
.inputadress {
  width: 100%;
  height: 42px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputadress:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}

.inputwithdrawnumber {
  width: 100%;
  height: 42px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputwithdrawnumber:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

</style>