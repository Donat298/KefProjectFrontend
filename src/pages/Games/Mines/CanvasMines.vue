<template>
    
 
    <div v-if="isLoading" class="canvasstyle" > 

    <div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
      <vproGressMini style="max-height: 66px; max-width: 118px;"/>  
    </div>
   </div>

 
    <div v-if="!isLoading" class="canvasstyle" > 



      
      <div style="user-select: none;" :style="{ margin: displaywidth ? '30px' : '5px' }">
        <h1 v-if="displaywidth">Mines and hearts!</h1>
     
      </div>  
    
     <div class="inside">
    <div class="divinside" >
  
        <button
        v-for="i in 25"
        :key="i"
        :style="{
          'opacity': selectedButtonsOpticay.includes(i) ? 0.3 : 1,
          'filter': selectedButtonsOpticay.includes(i) ? 'blur(2px) brightness(2)' : 'none'
        }"
        @click="selectsectormines(i)"
        class="sectormines"
      >
        <Mineob v-if="selectedMinesButtons.includes(i)" class="sectorbtn" />
        <Serdsesvg v-else-if="selectedButtons.includes(i)" class="sectorbtn"></Serdsesvg>
        <Sectorsvg v-else class="sectorbtn" />
      </button>

    </div>
    </div>


 




      <div style="" class="bottomdiv">
        <GameAlert v-if="showAlert"  style="margin: 15px 0px; " 
         :GameResult="GameResult" :errorMsg="errorMsg" />
      </div>

    </div>
</template>


<script>
//Vue frontend
import Sectorsvg from '@/assets/GameObjects/Minesobjects/sector.vue';
import Serdsesvg from '@/assets/GameObjects/Minesobjects/serdse.vue';
import Mineob from '@/assets/GameObjects/Minesobjects/mineob.vue';


import GameAlert from '@/pages/Games/Mines/GameAlertMines.vue';
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, watch, computed, } from 'vue';
import vproGressMini from "@/components/ProgrammInterface/vproGressMini.vue"
export default {
    emits: ['betfal', 'bettrue', 'newbetamount', 'cashoutfal', 'cashdisabled', 'setparentprofit', 'setparentbet', 'seturrencyImage'],
    components: {
      GameAlert, vproGressMini, Sectorsvg, Serdsesvg, Mineob
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
    },
    betMines: {
      type: Number,
    },
  },
  setup(props, context) {
    const store = useStore();
    const isLoading = ref(true);
    const axiosPrivateInstance = useApiPrivate(store);  
    const betInput = ref(props.betInputValue); 
    const sectorsnum = ref(25);
    const mines = ref(props.betMines);
    const errorMsg = ref(''); 
    const GameResult = ref(null);
    const selectedButtons = ref([]);
    const selectedMinesButtons = ref([]);
    const selectedButtonsOpticay = ref([]);
    const profit = ref("1.00"); 
    const showAlert = ref(false);
   
    const betAmountwill = ref(props.betInputValue);
    const countinuemines = ref(false);
    const cashdisabled = ref(true);



    const currencyImagetag = ref("");


      const selectedCurrencyImages = {
        balanceusdt: require('@/assets/Cryptologos/usdt.svg'),
        balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
        balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
        balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
      };


    const currencyImage = computed(() => {
      if (countinuemines.value) {
        const currencyKey = currencyImagetag.value;
        return selectedCurrencyImages[currencyKey];
      }
      else {
        const currencyKey = store.getters.selectedCurrency; // Assuming you have a getter for selectedCurrency
        return selectedCurrencyImages[currencyKey];
      }

    });
    context.emit("seturrencyImage", currencyImage);
   

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
 
        context.emit("newbetamount", response.data.betAmount);
      
        currencyImagetag.value = `balance${response.data.currency}`;
  
        selectedButtons.value.push(...response.data.selectednum);


        profit.value = response.data.profit
        context.emit("setparentprofit", response.data.profit);

        betAmountwill.value = parseFloat((response.data.profit * response.data.betAmount).toFixed(5)).toString();
        context.emit("setparentbet", parseFloat((response.data.profit * response.data.betAmount).toFixed(5)).toString());


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

        profit.value = response.data.profit
        context.emit("setparentprofit", response.data.profit);
        betAmountwill.value = parseFloat((response.data.profit * betInput.value).toFixed(5)).toString();
        context.emit("setparentbet", parseFloat((response.data.profit * betInput.value).toFixed(5)).toString());

        console.log(response);
        } else if (response.data.message == "Losemines") {
          betAmountwill.value = props.betInputValue;
          context.emit("setparentbet", "0");
          context.emit("setparentprofit", "1.00");
          response.data.mines

           selectedMinesButtons.value.push(buttonNumber);

           let availableNumbers = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          availableNumbers = availableNumbers.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);

          for (let i = 0; i < response.data.mines - 1; i++) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            selectedMinesButtons.value.push(availableNumbers[randomIndex]);
      
            availableNumbers.splice(randomIndex, 1); // remove the selected number from availableNumbers
          }



          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1); 
          selectedButtonsOpticay.value = newSelectedButtons.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);
          selectedButtons.value = newSelectedButtons;
       
          showAlert.value = true;
          GameResult.value = {
                lose: true,
          };
          countinuemines.value = false;
          context.emit("betfal");
       
        } else if (response.data.message == "WinF") {
          betAmountwill.value = props.betInputValue;


          const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
          const newSelectedMinesButtons = newSelectedButtons.filter(num => num !== buttonNumber && !selectedButtons.value.includes(num));
          selectedMinesButtons.value = newSelectedMinesButtons;
          selectedButtonsOpticay.value = newSelectedButtons.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);
          selectedButtons.value = newSelectedButtons;
          showAlert.value = true;
          profit.value = response.data.profit
        
          context.emit("setparentbet", "0");
          context.emit("setparentprofit", "1.00");
          GameResult.value = {
                won: true,
                wonMsg: parseFloat((response.data.profit * betInput.value).toFixed(5)).toString(),
                currency: response.data.currency,
          };
          store.dispatch('updateBalance', { currency: response.data.currency, amount: roundBalance(response.data.winamount) });
          countinuemines.value = false;
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
      if (newValue && countinuemines.value) {
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
    watch(() => props.betMines, (newValue) => {
      mines.value = newValue;
  
    });

   watch(() => props.betButtonPressed, (newValue) => {
    console.log("bet2");
    console.log(countinuemines.value);
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
    
    showAlert.value = false;
    if (!handleCommonChecks()) {
      return;
    }
      try {
        currencyImagetag.value = store.getters.selectedCurrency;
        GameResult.value = null;
        errorMsg.value = '';
        
        profit.value = "1.00"; 
        context.emit("setparentprofit", "1.00");
        context.emit("setparentbet", betInput.value);

        selectedButtons.value = []; 
        selectedMinesButtons.value = []; 
        selectedButtonsOpticay.value = [];
        cashdisabled.value = true;
        countinuemines.value = true;

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
        let availableNumbers = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
        availableNumbers = availableNumbers.filter(num => !selectedButtons.value.includes(num));

        for (let i = 0; i < response.data.mines; i++) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          selectedMinesButtons.value.push(availableNumbers[randomIndex]);
          availableNumbers.splice(randomIndex, 1); // remove the selected number from availableNumbers
        }

        const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
        selectedButtonsOpticay.value = newSelectedButtons.filter(num => !selectedButtons.value.includes(num));
        selectedButtons.value = newSelectedButtons;

        showAlert.value = true;
        context.emit("setparentbet", "0");
        context.emit("setparentprofit", "1.00");
        GameResult.value = {
          won: true,
          wonMsg: parseFloat((response.data.profit * betInput.value).toFixed(5)).toString(),
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
    isLoading,
    currencyImage,
    selectedCurrencyImages,
    currencyImagetag,
    countinuemines,
    showAlert,
    selectedMinesButtons,
    selectedButtonsOpticay,
    mines,
  };
  } ,
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
.Stybutton{
margin: 15px;
 width: 150px;
 height: 100px;
 background-color: rgb(47, 75, 100);
border-radius: 20px;
box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.218);


}

.canvasstyle{
  padding-bottom: 10px;
  width: 100%; position: relative; aspect-ratio: 3/2.5;
     display: flex; flex-direction: column;

}

.sectorbtn{
width: 100%; height: 100%;


}
.sectormines {
 margin: 4%;
}
button.sectormines {

  display: flex;
  align-items: center;
  justify-content: center;
}
.inside{
  width: 95%;
 
  display: flex;
  flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    user-select: none;
    position: relative;
    overflow: hidden;
    margin: 0 auto;

}

.divinside{
  display: grid;
  position: relative;
  width: 100%;
  max-width: 540px;
  grid-template-columns: repeat(5,auto);
  margin: auto;
}
</style>


