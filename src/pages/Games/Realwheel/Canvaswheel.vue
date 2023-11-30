<template>

    <div name="thisdiv" style=" width: 100%; position: relative;   padding-bottom: 10px; aspect-ratio: 3/2.5;
     display: flex; flex-direction: column;">  


      <div style="user-select: none;" :style="{ margin: displaywidth ? '30px' : '15px' }"><h1 v-if="displaywidth">Wheel of Fortune Game!</h1>
        <h1 v-else>Wheel Game!</h1>
      </div>  


      <div style="display: flex; justify-content: center; align-items: center; margin: auto 0px;">
      <wheelsvg :style="wheelStyle" style="max-width: 450px; width: 100%;  margin: 0px 10px 0px 10px; position: relative;">
      </wheelsvg>
      <wheelpointersvg style="max-width: 60px; width: 20%; margin-right: 10px; ">
      </wheelpointersvg>
      </div>


      <div  class="bottomdiv">
        <GameAlert style="margin: 15px 0px; " v-if="showAlert" 
        :GameResult="GameResult" :errorMsg="errorMsg" />
        
      </div>
    </div>

</template>


<script>
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import GameAlert from '@/pages/Games/Realwheel/GameAlert.vue';
import wheelsvg from "@/assets/GameObjects/Originalwheel.vue";
import wheelpointersvg from "@/assets/GameObjects/Wheelpointer.vue";
export default {
    emits: ['betfal'],
    components: {
        GameAlert, wheelsvg, wheelpointersvg
    },
  
  props: {
    betInputValue: {
      type: Number,
      required: true
    },
    betButtonPressed: {
      type: Boolean,
      default: false,
    },
    displaywidth: {
      type: Boolean,
    }
  },
  setup(props, context) {
   
  const store = useStore();
  const axiosPrivateInstance = useApiPrivate(store);
  const betInput = ref(props.betInputValue); 
  const GameResult = ref(null);
  const errorMsg = ref('');
  const showAlert = ref(false);
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


  const circleRotation = ref(0);
  const wheelStyle = ref('');
  const handleCommonChecks = () => {
    if (!store.getters.isAuthenticated) {
      router.push('/auth/register');
      return false;
    }

    if (betInput.value < 0) {
      showAlert.value = true;
      errorMsg.value = 'The bet cannot be less than zero.';
      context.emit("betfal");
      return false;
    }

    if (store.getters.userDetail[store.getters.selectedCurrency] < betInput.value) {
      showAlert.value = true;
      errorMsg.value = 'Your balance is less than the bet amount';
      context.emit("betfal");
      return false;
    }

    return true;
  };


  const placeBet = async () => {
    errorMsg.value = '';
    store.commit('setGameInProgress', true);

     
    if (!handleCommonChecks()) {
      return;
    }

    isProcessing.value = true;
    showAlert.value = false;

  
 

      circleRotation.value = 0;
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
        circleRotation.value = rotation;
        setTimeout(() => {
       
          if (response.data.message === 'You won!') {
            GameResult.value = {
                won: true,
                wonMsg: betInput.value * 2,
                currency: currency
            };
          } else {
            GameResult.value = {
                lose: true,
            };
          }

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
   
  };


  return {
    placeBet,
    betInput,
    GameResult,
    errorMsg,
    isProcessing,
    showAlert,
    wheelStyle,
    message,
    circleRotation
  };
},

 

}
</script>

<style scoped>
@media (max-width: 800px) {
  .bottomdiv {
    min-height: none !important;


  }

}
@media (min-width: 800px) {
  .bottomdiv {
    min-height: 87.5px;


  } 

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