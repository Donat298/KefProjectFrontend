<template>

  <div style=" width: 100%;  "  :style="{ 'margin-top': isWideScreen ? '40px' : '5px' }">
    <div class="mx-auto widFh" style="width: 1200px;  max-width: 90%; display: flex; flex-wrap: wrap; justify-content: center;">
      <!-- v-card -->
      <div style="width: 300px; max-width: 300px; background-color: #1d2f3f; padding: 15px;  border-radius: 7px 0px 0px 7px ;  "  
       class="bet-div">
       <div v-if="isWideScreen" style="margin: 20px; font-size: 25px;"><strong>Place your BET!</strong></div>
        <div class="bet-form">
          <toolip :showTooltip2="showTooltip2" style="  
   " text="The bet cannot be more than your balance.">
          <v-form ref="betForm" @submit.prevent="placeBet"   style=" align-items: center; "> 


            <betInput v-model.number="betInputWithDefault" :invalid="isInputInvalid" :processing="isBetButtonPressed" />


              <bet-btn  v-if="!isBetButtonPressed" style="width: 100%;"  >BET
              </bet-btn>
           
            </v-form>  
        
            <bet-btn :style="{ opacity: CashButtonDisabled ? 0.7 : 1 }" :disabled=" CashButtonDisabled" 
             @click="isCashoutButtonPressed = true" v-if="isBetButtonPressed" style="width: 100%;" >Cashout
              </bet-btn>
   
        </toolip>         
        </div> 

    </div>
      <div style="flex: 1; background-color: #15212c; border-radius: 0px 7px 7px 0px ;" class="betseto">
   
        <CanvasMines  @newbetamount="updateBetInput" @cashdisabled="cashdisabled" @betfal="Betfalse()" @cashoutfal="Cashfalse()"
        :cashoutButtonPressed="isCashoutButtonPressed"
         @bettrue="placeBet()" :betInputValue="betInput || 0" :betButtonPressed="isBetButtonPressed"
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
      betInput: null,
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
How make so that watch will be work only if isBetButtonPressed is false?



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
</style>