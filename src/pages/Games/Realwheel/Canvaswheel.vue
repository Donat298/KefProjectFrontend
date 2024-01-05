<template>

    <div name="thisdiv" style=" width: 100%; position: relative;   aspect-ratio: 3/2.5;
     display: flex; flex-direction: column;">  


      <div v-if="displaywidth" style="user-select: none;   text-align: center; margin: 20px;" ><h1>Wheel of Fortune Game!</h1>
     
      </div>  


      <div style="display: flex; justify-content: center; align-items: center; margin: auto 5%;">
      <wheelsvg :style="wheelStyle" style="max-width: 500px;
       width: 100%;  margin: 0px 10px 0px 10px; position: relative;">
      </wheelsvg>
      <wheelpointersvg style="max-width: 60px; width: 20%; margin-right: 10px; ">
      </wheelpointersvg>
      
      <Transition name="bounce">
      <v-card rounded="lg" v-if="showResult" class="center-square">
 
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
import { balanceFieldsMap } from '@/store/constants';
import GameAlert from '@/pages/Games/Realwheel/GameAlert.vue';
import wheelsvg from "@/assets/GameObjects/Originalwheel.vue";
import wheelpointersvg from "@/assets/GameObjects/Wheelpointer.vue";
import titleMixin from "@/components/UI/Other/document.title";
  export default {
    mixins: [titleMixin],
    title: "Kef: Wheel",
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
    euroc: require('@/assets/Cryptologos/euro-logo.svg'),
    btc: require('@/assets/Cryptologos/Currency=btc.svg'),
    eth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
    ltc: require('@/assets/Cryptologos/lite.svg'),
    bnb: require('@/assets/Cryptologos/bnb.svg'),
    doge: require('@/assets/Cryptologos/doge.svg'),
    usdc: require('@/assets/Cryptologos/usdc.svg'),
    bch: require('@/assets/Cryptologos/btccash.svg'),
    ada: require('@/assets/Cryptologos/ada.svg'),
    matic: require('@/assets/Cryptologos/matic.svg'),
    trx: require('@/assets/Cryptologos/trx.svg'),
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
     

        const currency = balanceFieldsMap[store.getters.selectedCurrency];

        const response = await axiosPrivateInstance.put('/games/wheel2', {
          betAmount: betInput.value,
          currency: currency
        });

        const newAmount = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] - response.data.betAmount);
        store.dispatch('updateBalance', { currency: currency, amount: newAmount });

        let rotation = '0';
        let baseRotation = Math.random() * 180;

        if (response.data.message === 'You won!') {
          rotation = baseRotation + 2520;
        } else {
          rotation = baseRotation + 2520 + 180;
        }

        wheelStyle.value = `transform: rotate(${rotation}deg); transition: transform 2s cubic-bezier(0,1,.9,1)`;
        circleRotation.value = rotation;
        setTimeout(async () => {
       
          if (response.data.message === 'You won!') {
            showResult.value = true;
            cashresult.value = parseFloat((betInput.value * 2).toFixed(5)).toString();
            currencyname.value = currency;
            currencyImagetag.value = currency;
            const userWonFin = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] += response.data.balance);

          // Wait for the dispatch to complete before proceeding
            await store.dispatch('updateBalance', { currency: currency, amount: userWonFin, });
          } else {
                  
          }
          
          isProcessing.value = false;
          context.emit("betfal");
          store.commit('setGameInProgress', false);

          // Call checkInputValidity after the game ends
       
        }, 2200);
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
 
  };
},

 

}
</script>

<style scoped>
@media (max-width: 802px) {
  .bottomdiv {
    min-height: none !important;


  }

}
@media (min-width: 802px) {
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
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}


@keyframes bounce-in {
  0% {
    transform: scale(0);

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
text-align: center;
  width: 200px;
  padding: 20px;
  color: rgb(255, 255, 255);
 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  box-shadow: 0px 0px 40px 10px #ffffff;

  background-image: 
  linear-gradient(120deg,  #29445b 20%, rgba(0, 0, 0, 0) 20%),
  linear-gradient(110deg,#1d2f3f, #15212c);
}



</style>