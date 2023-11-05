<template>
  <div style=" width: 100%; margin-top: 40px; ">
    <div class="mx-auto widFh" style="width: 1200px;  max-width: 90%; display: flex; flex-wrap: wrap; justify-content: center;">
      <!-- v-card -->
      <div style="width: 300px; max-width: 300px; background-color: #1d2f3f; padding: 15px;  border-radius: 7px 0px 0px 7px ;  "  
       class="bet-div">
       <div style="margin: 20px; font-size: 25px;"><strong>Place your BET!</strong></div>
        <div class="bet-form">
          <toolip :showTooltip2="showTooltip2" style="  
   " text="The bet cannot be more than your balance.">
          <v-form ref="betForm" @submit.prevent="placeBet"   style=" align-items: center; "> 


            <betInput v-model.number="betInputWithDefault" :invalid="isInputInvalid" :processing="isBetButtonPressed" />
              <bet-btn  style="width: 100%;" type="submit"
                  :disabled="isBetButtonPressed"
                  :style="{ opacity: isBetButtonPressed ? 0.5 : 1 }"
                  >  
              </bet-btn> 

              
          </v-form>  
        </toolip>         
        </div>

    </div>
      <!-- Content below v-card -->
      <div style="flex: 1; background-color: #15212c; border-radius: 0px 7px 7px 0px ;" class="betseto">
   
        <Canvaswheel @betfal="Betfalse()" :betInputValue="betInput || 0" :betButtonPressed="isBetButtonPressed"></Canvaswheel>

      </div>
    </div>
  </div>
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
      if (value < 0 || store.getters.userDetail[store.getters.selectedCurrency] < value) {
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
  },
};
</script>

Can you do so that if I press enter on my keyboard isBetButtonPressed will call.

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
      /* Center align form elements */
  }
  
  /* Add a rule to remove max-width on .mx-auto when screen width is less than 800px */
  .widFh {
    max-width:95% !important; /* This will override the max-width: 90%; */
  }
}
.balance-card {
  height: 70px;
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.text-center {
  color: #ffffff; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.balance-icon {
  width: 25px; 
  margin-left: 5px;
}
.bet-card {
  display: flex; 
  color: #ffffff; 


  flex-direction: column;
  
  justify-content: center; 
  align-items: center;
  
}

.inputbet {
  width: 100%;
  height: 48px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputbet:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}
.bet-form {
  width: 100%; 
  
  min-height: 100px; 
  background-color: rgba(255, 228, 196, 0); 
  display: flex; 
  align-items: center;  
  justify-content: center;
}


/* Hide the number input spinners */

</style>