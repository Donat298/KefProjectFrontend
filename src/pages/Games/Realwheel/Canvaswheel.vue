<template>
    <div>

    <div style="margin: 30px;"><h1>Wheel of Fortune Game</h1></div>      
        <div class="whwh" style="display: flex; justify-content: center; align-items: center;">
          <div style="min-width: 40px;"></div>
          <div class="wheel" id="wheel" :style="wheelStyle">
            <h3 class="half win">2x</h3>
            <h3 class="half lose">0x</h3>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; margin-left: 10px;">
            <div style="transform: rotate(90deg);"> 
              <v-icon icon="mdi-map-marker-outline"></v-icon>
            </div>
          </div>
        </div>
        <div style="min-height: 60px; margin-bottom: 20px; margin-top: 30px;">
          <GameAlert v-if="showAlert" :gameResult="gameResult" :errorMsg="errorMsg" />
        </div>
    </div>

</template>


<script>
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, onMounted, onUnmounted, watch } from 'vue'; 
import { useRouter } from 'vue-router'; 
import GameAlert from '@/pages/Games/Realwheel/GameAlert.vue';
export default {
    emits: ['betfal'],
  
    components: {
        GameAlert 
    },
  props: {
    betInputValue: {
      type: Number,
      required: true
    },
    betButtonPressed: {
      // Define the prop for button press
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
   
  const store = useStore();
  const axiosPrivateInstance = useApiPrivate(store);
  const betInput = ref(props.betInputValue); 
  const gameResult = ref(null);
  const errorMsg = ref('');
  const showAlert = ref(true);
  const isProcessing = ref(false);
  const message = ref('');
  const router = useRouter();

  watch(() => props.betInputValue, (newValue) => {
      betInput.value = newValue;
    });

    watch(() => props.betButtonPressed, (newValue) => {
    if (newValue) {
      placeBet();
    }



  });
  const roundBalance = (value) => {
    if (value > 100000000) {
      return 100000000;
    }
    return Math.round(value * 100000000) / 100000000;
  };



  const wheelStyle = ref('');



  const placeBet = async () => {
    errorMsg.value = '';
    store.commit('setGameInProgress', true);
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

  

    setTimeout(async () => {
      wheelStyle.value = `transform: rotate(0deg); transition: none;`;
      try {
        const balanceFieldsMap = {
          'balanceusdt': 'usdt',
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
        store.dispatch('updateBalance', { currency: currency, amount: newAmount });

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

          store.dispatch('updateBalance', { currency: currency, amount: roundBalance(response.data.balance) });
          isProcessing.value = false;
          showAlert.value = true;
          context.emit("betfal");
          store.commit('setGameInProgress', false);

          // Call checkInputValidity after the game ends
       
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
        context.emit("betfal");
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
    showAlert,
    wheelStyle,
    message,
  };
},

 

}
</script>


<style scoped>

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