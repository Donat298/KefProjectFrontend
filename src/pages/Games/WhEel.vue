<template>
 <div style=" margin-top: 50px;"><h1>Wheel of Fortune Game</h1></div>
    <div class="text-center" style="height: 70px; display: flex; align-items: center;
     justify-content: center; background-color: rgba(4, 3, 3, 0);">
      <p  v-html="message"></p>
    </div>
  <div class="whwh" style="display: flex; justify-content: center; align-items: center;">
    <div style="min-width: 40px;"></div>
      <div class="wheel" id="wheel" :style="wheelStyle">
        <h3 class="half win">2x</h3>
        <h3 class="half lose">0x</h3>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; 
      margin-left: 10px;">
        <div style="transform: rotate(90deg); ">
          <v-icon icon="mdi-map-marker-outline"></v-icon>
        </div>
      </div>
    </div>
  <v-card title="Place your bet!" color="#2e4659" elevation="0" width="1200" class="bet-card mx-auto">
    <div class="bet-form">
      <v-form ref="betForm" @submit.prevent="placeBet" style="display: flex;">
        <v-text-field       
          :disabled="isProcessing" 
          type="number" 
          class="pl-5" 
          v-model="betInput"
          variant="solo"       
          bg-color="secondary" 
          label="Your bet"
          single-line
          hide-details>
        </v-text-field>
        <div class="d-flex align-center">
          <v-btn 
            :disabled="isProcessing" 
            rounded="xl" 
            class="ml-4 mr-2 submit-button" 
            size="small"
            type="submit" 
            icon="mdi-check"> 
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
  <GameAlert 
    v-if="showAlert" 
    :gameResult="gameResult" 
    :errorMsg="errorMsg" />
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'; 
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
import { useApiPrivate } from '../../utils/useApi';
import GameAlert from './GameAlert.vue';

export default {
  components: {
    GameAlert
  },
  setup() {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const betInput = ref('');
    const gameResult = ref(null);
    const errorMsg = ref('');    
    const showAlert = ref(true);
    const isProcessing = ref(false);
    const message = ref('');
    const router = useRouter(); 

    const roundBalance = (value) => {
 
      if (value > 10000000) {
        return 10000000;
      }

      return Math.round(value * 10000000) / 10000000;
    };

    const tempBalance = computed(() => {
      const currentBalance = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] - parseFloat(betInput.value));
      return isProcessing.value ? currentBalance : roundBalance(store.getters.userDetail[store.getters.selectedCurrency]);
    });

    const wheelStyle = ref(''); 

    const placeBet = async () => {
      errorMsg.value = '';
      betInput.value = roundBalance(parseFloat(betInput.value)); 

      if (!store.getters.isAuthenticated) {
        router.push('/auth/register'); 
        return;
      }

      if (betInput.value < 0) {
        errorMsg.value = 'The bet cannot be less than zero.';
        return;
      }

      if (store.getters.userDetail[store.getters.selectedCurrency] < betInput.value) {
        errorMsg.value = 'Your balance is less than the bet amount';
        return;
      }

      isProcessing.value = true;
      showAlert.value = false; 

      wheelStyle.value = `transform: rotate(0deg); transition: none;`;

      setTimeout(async () => {
        try {
          const balanceFieldsMap = {
            'balance': 'trc', 
            'balanceeur': 'eur',
            'balancebtc': 'btc',
            'balanceeth': 'eth',
          };

          const currency = balanceFieldsMap[store.getters.selectedCurrency];

          const response = await axiosPrivateInstance.put('/games/wheel2', {
            betAmount: betInput.value,
            currency: currency
          });

          const newAmount = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] - betInput.value);
          store.dispatch('updateBalance', {currency: currency, amount: newAmount});

          let rotation = '0';
          let baseRotation = Math.random() * 180;

          if (response.data.message === 'You won!') {
            rotation = baseRotation + 3600; 
          } else {
            rotation = baseRotation + 3600 + 180; 
          }

          wheelStyle.value = `transform: rotate(${rotation}deg); transition: transform 4s cubic-bezier(0,1,.9,1)`;
          
          setTimeout(() => {  
            gameResult.value = {
              won: response.data.message === 'You won!',
              balance: roundBalance(response.data.balance)
            };

            store.dispatch('updateBalance', {currency: currency, amount: roundBalance(response.data.balance) });
            isProcessing.value = false;
            showAlert.value = true;
          }, 4400);
        } catch (error) {
          console.log(error);

          if (error.response && error.response.data && error.response.data.message) {
            errorMsg.value = error.response.data.message;
          } else {
            errorMsg.value = "An unknown error occurred.";
          }

          isProcessing.value = false;
          showAlert.value = true; 
        }
      }, 0); 
    };

    const enterListener = (event) => {
      if (event.key === 'Enter') {
        if (isProcessing.value) {
          return;
        }
        placeBet();
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', enterListener);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', enterListener);
    });

    return {
      placeBet,
      betInput,
      gameResult,
      errorMsg,
      isProcessing,
      tempBalance,
      showAlert,
      wheelStyle,
      message,
    };
  },
};
</script>

     

<!--

-->

<style scoped>
.balance-card {
  height: 70px;
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.text-center {
  color: #ffffff; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.balance-icon {
  width: 25px; 
  margin-left: 5px;
}
.bet-card {
  display: flex; 
  color: #ffffff; 
  width: 1000px; 
  max-width: 90%; 
  flex-direction: column;
  margin-top: 30px;
  justify-content: center; 
  align-items: center;
  
}
.bet-form {
  width: 100%; 
  min-height: 100px; 
  background-color: rgba(255, 228, 196, 0); 
  display: flex; 
  align-items: center;  
  justify-content: center;
}
.submit-button {
  height: 50px; 
  width: 50px; 
  color: aquamarine; 
  background-color: #15212c;
}
.wheel {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  transition: transform 5s ease-out;
 
}
.half {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
.win {
  background: green;
}
.lose {
  background: red;
}

</style>


