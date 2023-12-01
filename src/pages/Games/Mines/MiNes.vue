<template>

  <div style=" width: 100%;  "  :style="{ 'margin-top': isWideScreen ? '40px' : '5px' }">
    <div class="mx-auto widFh" style="width: 1200px;  max-width: 90%; display: flex; flex-wrap: wrap; 
    justify-content: center;">
      <!-- v-card -->
      <div style="width: 300px; max-width: 300px; background-color: #1d2f3f; 
        border-radius: 7px 0px 0px 7px ;  "   :style="{ 'padding': isWideScreen ? '30px' : '10px' }" 
       class="bet-div">
       <div v-if="isWideScreen" style=" font-size: 25px; user-select: none;"><strong>Place your BET!</strong></div>
        <div class="bet-form">
       
          <toolip :showTooltip2="showTooltip2" style="width: 100%;
   " text="The bet cannot be more than your balance.">  
     </toolip>  

          <v-form ref="betForm" @submit.prevent="placeBet()"   style=" align-items: center;
           "> 


            <betInput v-model.number="betInputWithDefault" :invalid="isInputInvalid" :processing="isBetButtonPressed" />
      



            <div style="display: flex; flex-wrap: wrap;
             justify-content: center; margin: 10px 0px;" v-if="isBetButtonPressed">
    <div>
        Total profit:
    </div>

    <div style="display: flex; align-items: center; justify-content: center; margin: auto;">
       <strong>{{ betAmountwill }} </strong> 
        <img
            :src="currencyImage"
            style="width: 17px; height: 17px; margin-left: 5px;"
        /> 
    </div>

    <div>
      <strong> {{ profit }}x</strong> 
    </div>
</div>
                    




              <bet-btn v-if="!isBetButtonPressed" style="width: 100%; user-select: none;"  >BET
              </bet-btn>
              <bet-btn :style="{ opacity: CashButtonDisabled ? 0.2 : 1 }" :disabled="CashButtonDisabled" 
             @click="isCashoutButtonPressed = true" v-if="isBetButtonPressed" style="width: 100%;" >Cashout
              </bet-btn>
   

              <div v-if="!isBetButtonPressed" style=" margin: 15px 0px;">
              <div style="display: flex;" >
        Mines:
</div>
          
              <v-card elevation="5" style=" 
              border-radius: 8px; align-items: center;  display: flex;
               background-color: #bd323200">
   
   <font-awesome-icon style="color: #ffffff;position: absolute;
    height: 14px; margin-left: 10px; right: 10px;" :icon="['fas', 'chevron-down']" />

              <select :disabled="isBetButtonPressed" v-model="minesAmount" 
              style="width: 100%; height: 46px; padding: 0px 15px; background-color: #15212c; 
              color: #ffffff; border-radius: 8px; border: 2px solid #2e4659; border-color: #2e4659; outline: none; overflow: auto;">
    <option v-for="n in 24" :key="n" :value="n">{{ n }}</option>
    
  </select>
  
</v-card>
</div>

            </v-form>  

        
        </div> 

    </div>
      <div style="flex: 1; background-color: #15212c; border-radius: 0px 7px 7px 0px ;" class="betseto">
   
        <CanvasMines  @newbetamount="updateBetInput" @cashdisabled="cashdisabled" @betfal="Betfalse()"
         @cashoutfal="Cashfalse()" @setparentprofit="profit = $event" @setparentbet="betAmountwill = $event"
         @seturrencyImage="currencyImage = $event"
        :cashoutButtonPressed="isCashoutButtonPressed"
         @bettrue="placeBet()" :betInputValue="betInput"
         :betMines="minesAmount" :betButtonPressed="isBetButtonPressed"
        :displaywidth="isWideScreen"></CanvasMines>

      </div>
    </div>
  </div>
</template>







<script>
import toolip from '@/components/UI/Other/toolip.vue';
import CanvasMines from '@/pages/Games/Mines/CanvasMines.vue';
import store from '@/store'; // Adjust the path as needed

export default {
  components: {
    toolip, CanvasMines,
  },
  data() {
    return {
      betInput: 0,
      minesAmount: 15,
      profit: "1.00",
      betAmountwill: 0,
      currencyImage: null,
      isInputInvalid: false,
      showTooltip2: false,
      isBetButtonPressed: false, 
      CashButtonDisabled: false,
      isCashoutButtonPressed: false,
      isWideScreen: false, 
    };
  },
  watch: {
    betInput(newValue) {
      this.checkInputValidity(newValue);
    },
  },
  computed: {
    betInputWithDefault: {
      get() {
        return this.betInput; 
      },
      set(value) {
        this.betInput = value;
      },
    },

  },
  methods: {
    checkInputValidity(value) {
      if (value < 0 || store.getters.userDetail[store.getters.selectedCurrency] < value && !this.isBetButtonPressed) {
        this.isInputInvalid = true;
        this.showTooltip2 = true;
      } else {
        this.isInputInvalid = false;
        this.showTooltip2 = false;
      }
    },
    Betfalse() {
      this.isBetButtonPressed = false; 
      this.checkInputValidity(this.betInput);
    },
    Cashfalse() {
      this.isCashoutButtonPressed = false; 
      this.checkInputValidity(this.betInput);
    },
    cashdisabled(tof) {
        this.CashButtonDisabled = tof;     
    },
   
    placeBet() {
    // Other processing logic here
    if (!this.isBetButtonPressed) {
      this.isBetButtonPressed = true; 
      this.isCashoutButtonPressed = false;

    }
 
    },
    updateBetInput(newBetAmount) {
      this.betInput = newBetAmount;
      this.checkInputValidity(newBetAmount);
    },
    checkScreenWidth() {
      this.isWideScreen = window.innerWidth > 800; // Check screen width
    },
  },

  mounted() {
    this.checkScreenWidth(); // Call the function to check screen width on mount
    window.addEventListener('resize', this.checkScreenWidth); // Listen for screen resize
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth); // Clean up the event listener
  },
};
</script>



<style scoped>
@media (max-width: 800px) {
  .bet-div {
    width: 100% !important;
    order: 2; /* Change the order to make it appear below */
    border-radius: 0px 0px 7px 7px !important;
    max-width: 100% !important;
  }
  .betseto {
    order: 1; /* Change the order to make it appear above */
    border-radius: 7px 7px 0px 0px !important;
  }
  .bet-form {
    flex-direction: column;
    display: flex;

    align-items: center;

  }

  .widFh {
    max-width:95% !important; /* This will override the max-width: 90%; */
  }


}

::-webkit-scrollbar {
width: 5px;



}

</style>