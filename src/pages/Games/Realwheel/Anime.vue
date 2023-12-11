<template>

<div style="width: 100%;"
 :style="{ 'margin-top': isWideScreen ? '40px' : '5px', 'margin-bottom': isWideScreen ? '80px' : '10px' }">
   <div class="mx-auto widFh" style="width: 1200px;  max-width: 90%; display: flex; flex-wrap: wrap; 
    justify-content: center;">
      <!-- v-card -->
      <div style="width: 300px; max-width: 300px; background-color: #1d2f3f; 
        border-radius: 7px 0px 0px 7px ;  "   :style="{ 'padding': isWideScreen ? '30px' : '20px' }" 
       class="bet-div">
 <div class="bet-form">
   

          <toolip :showTooltip2="showTooltip2" style="width: 100%;
   " text="The bet cannot be more than your balance.">  
     </toolip>  
  
           <v-form ref="betForm" @submit.prevent="placeBet()"   style=" align-items: center;
           "> 

<div style="display: flex;" >
 <strong>Bet amount:</strong>  
</div>
            <betInput v-model.number="betInputWithDefault" :invalid="isInputInvalid" :processing="isBetButtonPressed" />


            <bet-btn  style="width: 100%; user-select: none;"
                  :disabled="isBetButtonPressed"
                  :style="{ opacity: isBetButtonPressed ? 0.5 : 1 }"
                  >BET
              </bet-btn> 
           





           
            </v-form>  
            
        </div>

    </div>
      <!-- Content below v-card -->
      <div style="flex: 1; background-color: #15212c; border-radius: 0px 7px 7px 0px ;" class="betseto">
   
        <Canvaswheel @betfal="Betfalse()" :betInputValue="betInput || 0" :betButtonPressed="isBetButtonPressed"
        :displaywidth="isWideScreen"></Canvaswheel>

      </div>
    </div>
  </div>
  <bottom-info></bottom-info>
</template> 

<script>
import toolip from '@/components/UI/Other/toolip.vue';
import Canvaswheel from '@/pages/Games/Realwheel/Canvaswheel.vue';
import store from '@/store'; // Adjust the path as needed

export default {
  components: {
    toolip, Canvaswheel,
  },
  data() {
    return {
      betInput: null,
      isInputInvalid: false,
      showTooltip2: false,
      isBetButtonPressed: false, 
      isWideScreen: false, 
    };
  },
  watch: {
    betInput(newValue) {
      this.checkInputValidity(newValue);
    },
    '$store.getters.selectedCurrency': {
      handler() {
        this.checkInputValidity(this.betInput);
      },
      deep: true,
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
    placeBet() {
    // Other processing logic here
    if (!this.isBetButtonPressed) {
      this.isBetButtonPressed = true; 
      
    }
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

.bet-form {

flex-direction: column;
  display: flex;



}
</style>