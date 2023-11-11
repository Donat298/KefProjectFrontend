<template>
  <div>
    <div name="thisdiv" style="margin-bottom: 20px; width: 100%; position: relative; aspect-ratio: 3/2;
     display: flex; flex-direction: column;"> 
     <div style="margin: auto;">
      <div>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(1) ? 0.5 : 1 }" @click="selectsectormines(1)">1</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(2) ? 0.5 : 1 }" @click="selectsectormines(2)">2</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(3) ? 0.5 : 1 }" @click="selectsectormines(3)">3</button>
      </div>
      <div>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(4) ? 0.5 : 1 }" @click="selectsectormines(4)">4</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(5) ? 0.5 : 1 }" @click="selectsectormines(5)">5</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(6) ? 0.5 : 1 }" @click="selectsectormines(6)">6</button>
      </div>
      <div>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(7) ? 0.5 : 1 }" @click="selectsectormines(7)">7</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(8) ? 0.5 : 1 }" @click="selectsectormines(8)">8</button>
        <button class="Stybutton" :style="{ 'opacity': selectedButtons.includes(9) ? 0.5 : 1 }" @click="selectsectormines(9)">9</button>
      </div>
  
  <div v-if="errorMsg"
         class="text-color-white align-center justify-space-between"
         style="color: red; font-size: 17px; text-align: center;">{{ errorMsg }}
    </div>
    <div style="min-height: 60px;">
 <h4 v-if="betButtonPressed"> {{ profit }}x</h4> 
 <h4 v-if="betButtonPressed" >{{ betAmountwill }}</h4>
</div>
  </div>
    </div>
  </div>
</template>


<script>
//Vue frontend
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, onMounted, onUnmounted, watch } from 'vue';

export default {
    emits: ['betfal'],
    components: {
      
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
    const sectorsnum = ref(9);
    const mines = ref(1);
    const errorMsg = ref('');
    const selectedButtons = ref([]);
    const profit = ref("1.00"); 
    const betAmountwill = ref(props.betInputValue);
   
  const roundBalance = (value) => {
    if (value > 100000000) {
      return 100000000;
    }
    return Math.round(value * 100000000) / 100000000;
  };
  const selectsectormines = async (buttonNumber) => {
    if (props.betButtonPressed && !selectedButtons.value.includes(buttonNumber)) {
     
      
      try {
        const response = await axiosPrivateInstance.put('/games/mines/sel', {
          selectedsector: buttonNumber,
        });
  
        if (response.data.message == "Winmines") {
        selectedButtons.value.push(buttonNumber);
        profit.value = parseFloat(response.data.profit).toFixed(2);
        betAmountwill.value = parseFloat(response.data.profit * betInput.value).toFixed(2);
        console.log(response);
        } else if (response.data.message == "Losemines") {
          betAmountwill.value = props.betInputValue;
          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          selectedButtons.value = newSelectedButtons;
          errorMsg.value = 'User lose'
          context.emit("betfal");
        } else if (response.data.message == "WinF") {
          betAmountwill.value = props.betInputValue;
          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          selectedButtons.value = newSelectedButtons;
          errorMsg.value = 'User won'
          store.dispatch('updateBalance', { currency: response.data.currency, amount: roundBalance(response.data.winamount) });
          context.emit("betfal");
        }






      } catch (error) {
        console.error(error);
        // Handle errors if needed
      }
    }
  };
  
  watch(() => props.betInputValue, (newValue) => {
      betInput.value = newValue;
      betAmountwill.value = newValue;
    });

   watch(() => props.betButtonPressed, (newValue) => {
      if (newValue) {
         placeBet();
      }
   }); 
   const handleCommonChecks = () => {
    if (!store.getters.isAuthenticated) {
      router.push('/auth/register');
      return false;
    }

    if (betInput.value < 0) {
      errorMsg.value = 'The bet cannot be less than zero.';
      context.emit("betfal");
      return false;
    }
    if (betInput.value == 0) {
      errorMsg.value = 'Invalid bet amount.';
      context.emit("betfal");
      return false;
    }
    if (store.getters.userDetail[store.getters.selectedCurrency] < betInput.value) {
      errorMsg.value = 'Your balance is less than the bet amount';
      context.emit("betfal");
      return false;
    }

    return true;
  };

   const placeBet = async () => {
    errorMsg.value = '';
    profit.value = "1.00"; 
    selectedButtons.value = []; 
  
    if (!handleCommonChecks()) {
      return;
    }
      try {
    
        const balanceFieldsMap = {
          'balanceusdt': 'usdt',
          'balanceeur': 'eur',
          'balancebtc': 'btc',
          'balanceeth': 'eth',
        };

        const currency = balanceFieldsMap[store.getters.selectedCurrency];
        console.log(currency);
        const newAmount = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] - betInput.value);
        store.dispatch('updateBalance', { currency: currency, amount: newAmount });

        
        const responsebet = await axiosPrivateInstance.put('/games/mines/bet', {
          betAmount: betInput.value,
          currency: currency,
          sectorsnum: sectorsnum.value,
          mines: mines.value,
        });
        console.log(responsebet);
   
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data && error.response.data.message) {
          errorMsg.value = error.response.data.message;
        } else {
          errorMsg.value = "An unknown error occurred.";
        }
        context.emit("betfal");
      }
  };
  return {
    placeBet,
    betInput,
    errorMsg,
    selectedButtons,
    selectsectormines,
    profit,
    betAmountwill
  };
  } ,
}
</script>








<style scoped>

.Stybutton{
margin: 15px;
 width: 150px;
 height: 100px;
 background-color: rgb(47, 75, 100);
border-radius: 20px;
box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.218);


}

</style>


