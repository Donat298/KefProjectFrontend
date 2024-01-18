<template>
    
 
    <div v-if="isLoading" class="canvasstyle" > 

    <div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
      <vproGressMini style="max-height: 66px; max-width: 118px;"/>  
    </div>
    
   </div>

 
    <div v-if="!isLoading" class="canvasstyle" > 



      
      <div  style="user-select: none; text-align: center;" :style="{ margin: displaywidth ? '20px' : '0.1px' }">
        <h1 v-if="displaywidth">Mines and hearts!</h1>
     
      </div>  
    
     <div class="inside"  :style="{ padding: displaywidth ? '0px 0px' : '3% 0px' }">
    <div  class="divinside" >

    <!-- rest of your code -->
    <button
  v-for="i in 25"
  :key="i"
  @click="selectsectormines(i)"
  class="sectormines"
>




<template v-if="enableTransition">
  <Transition name="bounceheart">
    <Serdsesvg v-if="showHeart[i] && !selectedMinesButtons.includes(i) && selectedButtons.includes(i)" :style="{

    }" class="sectorbtn"/>
    </Transition>

    <Transition name="bounceheart">
    <Mineob v-if="showMine[i] && selectedMinesButtons.includes(i)" :style="{

  }"  class="sectorbtn" />
     </Transition>
     <Transition name="bouncemines" @after-leave="() => afterLeave(i)">
      <Sectorsvg v-if="!selectedButtons.includes(i) && !selectedMinesButtons.includes(i)"
       class="sectorbtn" />
    </Transition>
     
</template>

<template v-if="!enableTransition">
  <Transition name="bounceheartfinal">
  <Serdsesvg v-if="showHeart[i] && !selectedMinesButtons.includes(i) && selectedButtons.includes(i)" :style="{
    'opacity': selectedButtonsOpticay.includes(i) ? 0.3 : 1,
  }" class="sectorbtn"/>
 </Transition>
 <Transition name="bounceheartfinal">
<Mineob v-if="showMine[i] && selectedMinesButtons.includes(i)" :style="{
    'opacity': selectedButtonsOpticay.includes(i) ? 0.3 : 1,
  }"  class="sectorbtn" />
      </Transition>
      <Transition name="bounceminesfinal" @after-leave="() => afterLeave(i)">
      <Sectorsvg v-if="!selectedButtons.includes(i) && !selectedMinesButtons.includes(i)"
       class="sectorbtn" />
    </Transition>

</template>


    
</button>



<!--v-if="showResult" -->

      <Transition name="bounce">
      <v-card rounded="lg" v-if="showResult" class="center-square">
 
        <h2>{{ profit }}x</h2>
     

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
    </div>

 

      <div style="" class="bottomdiv">
        <GameAlert v-if="showAlert"  style="margin: 15px 0px; " 
       :errorMsg="errorMsg" />
      </div>

    </div>
</template>


<script>
//Vue frontend
import Sectorsvg from '@/assets/GameObjects/Minesobjects/sector.vue';
import Serdsesvg from '@/assets/GameObjects/Minesobjects/serdse.vue';
import Mineob from '@/assets/GameObjects/Minesobjects/mineob.vue';
import { balanceFieldsMap } from '@/store/constants';
import { onMounted } from 'vue';
import GameAlert from '@/pages/Games/Mines/GameAlertMines.vue';
import { useStore } from 'vuex';
import { useApiPrivate } from '@/utils/useApi';
import { ref, watch, computed, } from 'vue';
import { useRouter } from 'vue-router';
import vproGressMini from "@/components/ProgrammInterface/vproGressMini.vue"
import titleMixin from "@/components/UI/Other/document.title";
  export default {
    mixins: [titleMixin],
    title: "Kef: Mines",
    emits: ['betfal', 'bettrue', 'newbetamount', 'cashoutfal', 'cashdisabled', 'setparentprofit', 
    'setparentbet', 'seturrencyImage','betMineschange'],
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
    profit: {
      type: String,
      default: "1.00",
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
    const router = useRouter();
    const selectedButtons = ref([]);
    const selectedMinesButtons = ref([]);
    const selectedButtonsOpticay = ref([]);
    const profit = ref(props.profit); 
    const showAlert = ref(false);
    const showResult = ref(false);
    const currencyname = ref("");
    const cashresult = ref("");
    const countinuemines = ref(false);
    const showMine = ref(Array(25).fill(false));
    const showHeart = ref(Array(25).fill(false));
    const enableTransition = ref(false);
    const noBet = ref(false);
    function afterLeave(index) {
      showMine.value[index] = true;
      showHeart.value[index] = true;

    }
    



    const currencyImagetag = ref("");

      const selectedCurrencyImages = {
        balanceusdt: require('@/assets/Cryptologos/usdt.svg'),
        balanceeuroc: require('@/assets/Cryptologos/euro-logo.svg'),
        balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
        balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
        balanceltc: require('@/assets/Cryptologos/lite.svg'),
        balancebnb: require('@/assets/Cryptologos/bnb.svg'),
        balancedoge: require('@/assets/Cryptologos/doge.svg'),
        balanceusdc: require('@/assets/Cryptologos/usdc.svg'),
        balancebch: require('@/assets/Cryptologos/btccash.svg'),
        balanceada: require('@/assets/Cryptologos/ada.svg'),
        balancematic: require('@/assets/Cryptologos/matic.svg'),
        balancetrx: require('@/assets/Cryptologos/trx.svg'),
      };


    const currencyImage = computed(() => {
        const currencyKey = currencyImagetag.value;
        return selectedCurrencyImages[currencyKey];
    });
    context.emit("seturrencyImage", currencyImage);
   

  const roundBalance = (value) => {
    if (value > 100000000) {
      return 100000000;
    }
    return Math.round(value * 100000000) / 100000000;
  };


  onMounted(async () => {
      try {
        const response = await axiosPrivateInstance.get('/games/mines/get');
          context.emit("newbetamount", response.data.betAmount);
      
        currencyImagetag.value = `balance${response.data.currency}`;
  
        selectedButtons.value.push(...response.data.selectednum);


        response.data.selectednum.forEach(num => {
          showHeart.value[num] = true;
        });
    
   
        context.emit("setparentprofit", response.data.profit);

        context.emit("betMineschange", response.data.mines);
       
      context.emit("setparentbet", parseFloat((response.data.profit * response.data.betAmount).toFixed(5)).toString());


        countinuemines.value = true;
        enableTransition.value = true;
        noBet.value = true;
        context.emit("bettrue");
        if (response.data.selectednum.length === 0) {
       
            context.emit("cashdisabled", true);
        } else {
          context.emit("cashdisabled", false);
        }
    } catch (error) {
        console.error(error);
        // Handle errors if needed
    } finally {
        // This block will always execute, regardless of whether there was an error or not
        isLoading.value = false;
      }
    });





  const selectsectormines = async (buttonNumber) => {
    if (props.betButtonPressed && !selectedButtons.value.includes(buttonNumber)) {  
      try {
        const response = await axiosPrivateInstance.put('/games/mines/sel', {
          selectedsector: buttonNumber,
        });
        context.emit("cashdisabled", false);
        if (response.data.message == "Winmines") {
        selectedButtons.value.push(buttonNumber);

 
        context.emit("setparentprofit", response.data.profit);
      context.emit("setparentbet", parseFloat((response.data.profit * betInput.value).toFixed(5)).toString());

        console.log(response);
        } else if (response.data.message == "Losemines") {
       

        selectedMinesButtons.value.push(buttonNumber);
        context.emit("betfal");
        
       
        context.emit("setparentprofit", response.data.profit);
     
        setTimeout(() => {
        new Promise((resolve) => {
          enableTransition.value = false;
          resolve();
        }).then(() => {
  
            let availableNumbers = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
            availableNumbers = availableNumbers.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);

            const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1); 
            selectedButtonsOpticay.value = newSelectedButtons.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);
            selectedButtons.value = newSelectedButtons;
            for (let i = 0; i < response.data.mines - 1; i++) {
              const randomIndex = Math.floor(Math.random() * availableNumbers.length);
              selectedMinesButtons.value.push(availableNumbers[randomIndex]);

              availableNumbers.splice(randomIndex, 1); // remove the selected number from availableNumbers
            }
            setTimeout(() => {
              countinuemines.value = false;
            }, 500);
        });
        }, 500);
    
    
      }  else if (response.data.message == "WinF") {
          let timeoutId = null;
          const userWonFin = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] += response.data.winamount);
          store.dispatch('updateBalance', { currency: response.data.currency, amount: userWonFin });
          context.emit("betfal");
          selectedButtons.value.push(buttonNumber);
          
     
          currencyname.value = response.data.currency;
          cashresult.value = parseFloat((response.data.profit * betInput.value).toFixed(5)).toString();
          showResult.value = true;
   
         
        context.emit("setparentprofit", response.data.profit);
          setTimeout(() => {
            new Promise((resolve) => {
              enableTransition.value = false;
              resolve();
            }).then(() => {
              const newSelectedButtons = Array.from({ length: sectorsnum.value }, (_, index) => index + 1);
              const newSelectedMinesButtons = newSelectedButtons.filter(num => num !== buttonNumber && !selectedButtons.value.includes(num));
              selectedMinesButtons.value = newSelectedMinesButtons;
              selectedButtonsOpticay.value = newSelectedButtons.filter(num => !selectedButtons.value.includes(num) && num !== buttonNumber);
              selectedButtons.value = newSelectedButtons;

              context.emit("setparentbet", "0");
     
              setTimeout(() => {
                countinuemines.value = false;
              }, 500);
            });
          }, 500);

        }
      
  
      } catch (error) {
        console.error(error);
        // Handle errors if needed
      }
    }
  };
  watch(() => props.betInputValue, (newValue) => {
      betInput.value = newValue;

    });
  watch(() => props.cashoutButtonPressed, (newValue) => {
    context.emit("cashoutfal");

      if (countinuemines.value && !showResult.value) {
  
         cashOut(); 
      }
 
   }); 
   watch(() => props.profit, (newValue) => {
    if (countinuemines.value) {
      profit.value = newValue;
    }
   
  
   });

    watch(() => props.betMines, (newValue) => {
      mines.value = newValue;
  
    });

    watch(() => props.betButtonPressed, (newValue) => {
    if (!countinuemines.value) {
    
      placeBet();
    }
    else if (noBet.value) {
      noBet.value = false;
    }
    else {
      context.emit("betfal");
      noBet.value = false;
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

    if (!handleCommonChecks()) {
      return;
    }
   
    try {

      // Emit events after value changes
    
      enableTransition.value = false;
    
      // Dispatch updateBalance after value changes
      currencyImagetag.value = store.getters.selectedCurrency;
      context.emit("setparentprofit", "1.00");
      context.emit("setparentbet",  parseFloat((betInput.value).toFixed(5)).toString());
      context.emit("cashdisabled", true);
      const currency = balanceFieldsMap[store.getters.selectedCurrency];
      const responsebet = await axiosPrivateInstance.put('/games/mines/bet', {
        betAmount: betInput.value,
        currency: currency,
        sectorsnum: sectorsnum.value,
        mines: mines.value,
      });
    

      showAlert.value = false;
   
    

      
      errorMsg.value = '';
  

      countinuemines.value = true;
      showResult.value = false;
   
      const newAmount = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] - betInput.value);

      store.dispatch('updateBalance', { currency: currency, amount: newAmount });

      showMine.value = ref(Array(25).fill(false)); 
      showHeart.value = ref(Array(25).fill(false));
      selectedButtons.value = [],
      selectedButtonsOpticay.value = [],
      selectedMinesButtons.value = [],
   
      console.log(responsebet);

  
  


      enableTransition.value = true;
    
    } catch (error) {
     
      context.emit("betfal");
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg.value = error.response.data.message;
      } else {
        errorMsg.value = "An unknown error occurred.";
      }

  
      
   
    } 
  };


  const cashOut = async () => {

    try {
      const response = await axiosPrivateInstance.get('/games/mines/cash');
      
  
  
      enableTransition.value = false;
   
      if (response.data.message == "WinF") {
        const userWonFin = roundBalance(store.getters.userDetail[store.getters.selectedCurrency] += response.data.winamount);
        store.dispatch('updateBalance', { currency: response.data.currency, amount: userWonFin });
        currencyname.value = response.data.currency;
        cashresult.value = parseFloat((response.data.profit * betInput.value).toFixed(5)).toString();
        showResult.value = true;
        context.emit("betfal");
        
   
        setTimeout(() => {     

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
          console.log(response.data.winamount);
          setTimeout(() => {
          countinuemines.value = false;
   
          }, 500);
        }, 500);
        context.emit("cashoutfal");
  
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
    selectedButtons,
    selectsectormines,
    profit,

    isLoading,
    noBet,
    currencyImage,
    currencyImagetag,
    countinuemines,
    showAlert,
    selectedMinesButtons,
    selectedButtonsOpticay,
    mines,
    showResult,
    currencyname,
    cashresult,
    showHeart,
    showMine,
    afterLeave,
    enableTransition,

  };
  } ,
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
.Stybutton{
margin: 15px;
 width: 150px;
 height: 100px;
 background-color: rgb(47, 75, 100);
border-radius: 20px;
box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.218);


}

.canvasstyle{

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
    margin: auto;

}
.divinside{
  display: grid;
  position: relative;
  width: 100%;
  max-width: 560px;
  grid-template-columns: repeat(5,auto);
  margin: auto;
}


.bounceheartfinal-enter-active {
  animation: bouncefinal-in 0.25s;
}

.bounceminesfinal-leave-active {
  animation: bouncefinal-out 0.25s reverse;
}

@keyframes bouncefinal-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

@keyframes bouncefinal-out {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}




.bounceheart-enter-active {
  animation: bounceheart-in 0.25s;
}

.bouncemines-leave-active {
  animation: bouncemines-in 0.25s reverse;
}


@keyframes bounceheart-in {
  0% {
    transform: scale(0) rotate(180deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes bouncemines-in {
  0% {
    transform: scale(0) rotate(-180deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
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

