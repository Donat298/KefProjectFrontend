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
      
      <Transition name="bounce">
      <v-card rounded="lg" elevation="5" v-if="showResult" class="center-square">
 
        <h2>2x</h2>
     

 <div style="display: flex; align-items: center; justify-content: center;">
  <h4>{{ cashresult }} </h4>
        <img
          :src="currencyImage"
          style="width: 17px; height: 17px; margin: 0px 5px; "
        /> {{ currencyname }}
      </div>
      </v-card>
    </Transition>
      </div>


      <div  class="bottomdiv">
        <GameAlert style="margin: 15px 0px; " v-if="showAlert" 
       :errorMsg="errorMsg" />
        
      </div>
    </div>

</template>


<script>
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, watch, computed } from 'vue';
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
  const errorMsg = ref('');
  const showAlert = ref(false);
  const isProcessing = ref(false);
  const message = ref('');
  const router = useRouter();
  const showResult = ref(false);
  const cashresult = ref("");
  const currencyname = ref("");
  
  const currencyImagetag = ref("");


  const selectedCurrencyImages = {
    usdt: require('@/assets/Cryptologos/usdt.svg'),
    eur: require('@/assets/Cryptologos/euro-logo.svg'),
    btc: require('@/assets/Cryptologos/Currency=btc.svg'),
    eth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
  };


  const currencyImage = computed(() => {

    const currencyKey = currencyImagetag.value;
    return selectedCurrencyImages[currencyKey];



  });


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
        showResult.value = false;
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
            showResult.value = true;
            cashresult.value = parseFloat((betInput.value * 2).toFixed(5)).toString();
            currencyname.value = currency;
            currencyImagetag.value = currency;
        
          } else {
         
          }
         
          store.dispatch('updateBalance', { currency: currency, amount: roundBalance(response.data.balance) });
          isProcessing.value = false;
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
        context.emit("betfal");
      }
   
  };


  return {
    placeBet,
    betInput,
   
    errorMsg,
    isProcessing,
    showAlert,
    wheelStyle,
    message,
    circleRotation,
    cashresult,
    showResult,
    currencyname,
    currencyImage,
    currencyImagetag,
    selectedCurrencyImages,

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


.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}


@keyframes bounce-in {
  0% {
    transform: scale(0);

  }
  50% {
    transform: scale(1.25);

  }
  100% {
    transform: scale(1);

  }
}





.center-square {
  position: absolute;
  
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
 max-width: 90%;

  width: 200px;
  padding: 20px;
  color: #ffffff;
  background-color: #2e4659;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  background-image: linear-gradient(230deg, rgba(93, 93, 93, 0.03) 0%,
   rgba(93, 93, 93, 0.03) 50%, rgba(78, 78, 78, 0.03) 50%, rgba(78, 78, 78, 0.03) 100%),
linear-gradient(107deg, rgba(55, 55, 55, 0.01) 0%, rgba(55, 55, 55, 0.01) 50%,
    rgba(170, 170, 170, 0.01) 50%, rgba(170, 170, 170, 0.01) 100%),
     linear-gradient(278deg, rgba(16, 16, 16, 0.03) 0%, rgba(16, 16, 16, 0.03) 50%,
      rgba(24, 24, 24, 0.03) 50%, rgba(24, 24, 24, 0.03) 100%),
       linear-gradient(205deg, rgba(116, 116, 116, 0.03) 0%,
        rgba(116, 116, 116, 0.03) 50%, rgba(0, 0, 0, 0.03) 50%,
         rgba(0, 0, 0, 0.03) 100%), linear-gradient(150deg, rgba(5, 5, 5, 0.03) 0%,
          rgba(5, 5, 5, 0.03) 50%, rgba(80, 80, 80, 0.03) 50%,
           rgba(80, 80, 80, 0.03) 100%), linear-gradient(198deg, rgba(231, 231, 231, 0.03) 0%,
            rgba(231, 231, 231, 0.03) 50%, rgba(26, 26, 26, 0.03) 50%, rgba(26, 26, 26, 0.03) 100%),
             linear-gradient(278deg, rgba(89, 89, 89, 0.03) 0%, rgba(89, 89, 89, 0.03) 50%, rgba(26, 26, 26, 0.03) 50%, rgba(26, 26, 26, 0.03) 100%), linear-gradient(217deg, rgba(28, 28, 28, 0.03) 0%, rgba(28, 28, 28, 0.03) 50%, rgba(202, 202, 202, 0.03) 50%, rgba(202, 202, 202, 0.03) 100%), linear-gradient(129deg,
   rgba(23, 23, 23, 0.03) 0%, rgba(23, 23, 23, 0.03) 50%, rgba(244, 244, 244, 0.03) 50%,
     rgba(244, 244, 244, 0.03) 100%), linear-gradient(135deg,#2e4659, #15212c );

}


</style>