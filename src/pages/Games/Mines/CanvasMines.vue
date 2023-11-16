<template>
    

 
    <div  name="thisdiv" style=" width: 100%; position: relative; aspect-ratio: 3/2;
     display: flex; flex-direction: column;"> 

<div v-if="isLoading" style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
      <vproGressMini style="max-height: 66px; max-width: 118px;"/>  
    </div>

    
     <div v-if="!isLoading" style="margin: auto;">
  
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
    <div style="min-height: 50px;">
 <h4> {{ profit }}x</h4> 
 <h4 >{{ betAmountwill }} </h4>
  </div>





  </div>
  <div v-if="!isLoading" class="bottomdiv">
        <GameAlert style="" :GameResult="GameResult" :errorMsg="errorMsg" />
      </div>

    </div>
 
</template>


<script>
//Vue frontend
import GameAlert from '@/pages/Games/Mines/GameAlertMines.vue';
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, watch } from 'vue';
import vproGressMini from "@/components/ProgrammInterface/vproGressMini.vue"
export default {
    emits: ['betfal', 'bettrue', 'newbetamount', 'cashoutfal', 'cashdisabled'],
    components: {
      GameAlert, vproGressMini
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
    cashoutButtonPressed: {
      type: Boolean,
      default: false,
    },
    displaywidth: {
      type: Boolean,
    }
  },
  setup(props, context) {
    const store = useStore();
    const isLoading = ref(true);
    const axiosPrivateInstance = useApiPrivate(store);  
    const betInput = ref(props.betInputValue); 
    const sectorsnum = ref(9);
    const mines = ref(1);
    const errorMsg = ref('');
    const GameResult = ref(null);
    const selectedButtons = ref([]);
    const profit = ref("1.00"); 
    const betAmountwill = ref(props.betInputValue);
    const countinuemines = ref(false);
    const cashdisabled = ref(true);
  const roundBalance = (value) => {
    if (value > 100000000) {
      return 100000000;
    }
    return Math.round(value * 100000000) / 100000000;
  };

  const beforeCreate = async () => {
    try {
        // Send an initial request before the component is created
        const response = await axiosPrivateInstance.get('/games/mines/get');
        console.log(response.data.profit, response.data.betAmount, response.data.selectednum);
        console.log(betAmountwill.value);
        context.emit("newbetamount", response.data.betAmount);

        selectedButtons.value.push(...response.data.selectednum);
        profit.value = parseFloat(response.data.profit).toFixed(2);
        betAmountwill.value = parseFloat(response.data.profit * response.data.betAmount).toFixed(2);
        countinuemines.value = true;
        context.emit("bettrue");
        if (response.data.selectednum.length === 0) {
            cashdisabled.value = true;
            context.emit("cashdisabled", cashdisabled.value);
        }
    } catch (error) {
        console.error(error);
        // Handle errors if needed
    } finally {
        // This block will always execute, regardless of whether there was an error or not
        isLoading.value = false;
    }
};

beforeCreate();


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
          GameResult.value = {
                lose: true,
          };
          context.emit("betfal");
        } else if (response.data.message == "WinF") {
          betAmountwill.value = props.betInputValue;
          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          selectedButtons.value = newSelectedButtons;
          GameResult.value = {
                won: true,
                wonMsg: parseFloat(response.data.profit * betInput.value).toFixed(2) ,
                currency: response.data.currency,
          };
          store.dispatch('updateBalance', { currency: response.data.currency, amount: roundBalance(response.data.winamount) });
          context.emit("betfal");
        }
        cashdisabled.value = false;
        context.emit("cashdisabled", cashdisabled.value);




      } catch (error) {
        console.error(error);
        // Handle errors if needed
      }
    }
  };
  watch(() => props.cashoutButtonPressed, (newValue) => {

    console.log(newValue);
    console.log(props.cashoutButtonPressed);
      if (newValue) {
        console.log("cashout2");
         cashOut(); 
      }
 
   }); 
  watch(() => props.betInputValue, (newValue) => {
      betInput.value = newValue;
      if (!countinuemines.value) {
        betAmountwill.value = newValue;
      }
  
    });

   watch(() => props.betButtonPressed, (newValue) => {
      if (newValue && !countinuemines.value) {
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
   
  
    if (!handleCommonChecks()) {
      return;
    }
      try {
        GameResult.value = null;
        errorMsg.value = '';
        profit.value = "1.00"; 
        selectedButtons.value = []; 
        cashdisabled.value = true;
        context.emit("cashdisabled", cashdisabled.value);
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

  const cashOut = async () => {
    console.log("cashout");
    context.emit("cashoutfal");
    try {
      const response = await axiosPrivateInstance.get('/games/mines/cash');
      countinuemines.value = false;
      if (response.data.message == "WinF") {
          betAmountwill.value = props.betInputValue;
          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          selectedButtons.value = newSelectedButtons;
          GameResult.value = {
                won: true,
                wonMsg: parseFloat(response.data.profit * betInput.value).toFixed(2) ,
                currency: response.data.currency,
          };
          store.dispatch('updateBalance', { currency: response.data.currency, amount: roundBalance(response.data.winamount) });
          console.log(response.data.winamount);
        
          context.emit("betfal");
          
        }
    } catch (error) {
        console.error(error);
        // Handle errors if needed
      }

  }
  return {
    placeBet,
    betInput,
    errorMsg,
    GameResult,
    selectedButtons,
    selectsectormines,
    profit,
    betAmountwill,
    cashdisabled,
    isLoading
  };
  } ,
}
</script>





 


<style scoped>
@media (max-width: 800px) {
  .bottomdiv {
    min-height: none !important;
    margin-top: auto;
    margin-bottom: 10px;
  }

}
@media (min-width: 800px) {
  .bottomdiv {
    min-height: 60px;
  margin-top: auto;
  margin-bottom: 20px;
  }

}
.Stybutton{
margin: 15px;
 width: 150px;
 height: 100px;
 background-color: rgb(47, 75, 100);
border-radius: 20px;
box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.218);


}

</style>


