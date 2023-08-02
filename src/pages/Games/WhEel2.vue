<template>
  <v-card
    color="#213141"
    class="balance-card"
    elevation="0"
    rounded="0" >
    <p class="text-center">
      {{ tempBalance }} USDT
    </p>
    <img class="balance-icon" :src="require('@/assets/Tether.svg')" />
  </v-card>

  <div class="whwh" style="display: flex; justify-content: center; align-items: center;">
    <div style="min-width: 40px;"></div>
      <div class="wheel" id="wheel" :style="wheelStyle">
        <h3 class="half win">2x</h3>
        <h3 class="half lose">0x</h3>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; 
      height: 200px; margin-left: 10px;margin-top: 20px; ">
        <div style="transform: rotate(90deg); ">
          <v-icon icon="mdi-map-marker-outline"></v-icon>
        </div>
      </div>
    </div>

  <v-card title="Place your bet!" color="#455A64" elevation="0" class="bet-card mx-auto">
    <div class="bet-form">
      <v-form ref="betForm" @submit.prevent="placeBet" style="display: flex;">
        <v-text-field 
          :disabled="isProcessing" 
          type="number" 
          class="pl-5" 
          v-model="betInput"
          variant="solo"
          hide-details
          bg-color="secondary">
        </v-text-field>
        <div class="d-flex align-center">
          <v-btn 
            :disabled="isProcessing" 
            rounded="xl" 
            class="ml-4 mr-2 submit-button" 
            size="small"
            type="submit" 
            icon="mdi-check"> 
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
  <GameAlert 
    v-if="showAlert" 
    :gameResult="gameResult" 
    :errorMsg="errorMsg" />
</template>
<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'; 
import { useStore } from 'vuex';
import { useApiPrivate } from '../../utils/useApi';
import GameAlert from './GameAlert.vue';
export default {
  components: {
    GameAlert
  },
  setup() {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const betInput = ref('');
    const gameResult = ref(null);
    const errorMsg = ref('');    
    const showAlert = ref(true);
    const isProcessing = ref(false);
    const tempBalance = computed(() => {
      return isProcessing.value ? store.getters.userDetail.balance - betInput.value : store.getters.userDetail.balance;
    });
    const wheelStyle = ref(''); // Add this new ref
    const placeBet = async () => {
  errorMsg.value = '';
  if (betInput.value <= 0) {
    errorMsg.value = 'The bet amount must be more than 0';
    return;
  }
  if (store.getters.userDetail.balance < betInput.value) {
    errorMsg.value = 'Your balance is less than the bet amount';
    return;
  }
  isProcessing.value = true;
  showAlert.value = false; // Hide the alert

  // Reset the wheel to the original position instantly
  wheelStyle.value = `transform: rotate(0deg); transition: none;`;

  // Use setTimeout to allow the changes to take effect
  setTimeout(async () => {
    try {
      const response = await axiosPrivateInstance.put('/games/wheel2', {
        betAmount: betInput.value
      });
      let rotation = '0';
      let baseRotation = Math.random() * 180;
      if (response.data.message === 'You won!') {
        rotation = baseRotation + 3600; // This will cause the wheel to spin 10 times and land in the "win" area
      } else {
        rotation = baseRotation + 3600 + 180; // This will also cause the wheel to spin 10 times, but will land in the "lose" area
      }

      // Apply the transition and start spinning
      wheelStyle.value = `transform: rotate(${rotation}deg); transition: transform 7s cubic-bezier(0,1,.9,1)`;

      setTimeout(() => {  
        gameResult.value = {
          won: response.data.message === 'You won!',
          balance: response.data.balance
        };
        store.commit('setUserBalance', response.data.balance);
        isProcessing.value = false;
        showAlert.value = true; // Show the alert again after 5 seconds
      }, 7500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg.value = error.response.data.message;
      } else {
        errorMsg.value = "An unknown error occurred.";
      }
      isProcessing.value = false;
      showAlert.value = true; // Show the alert immediately if an error occurred
    }
  }, 0); // This timeout is for letting the reset operation take effect before starting the new spin
};


    /* 
    I decided to return to this option.
     The only thing I want to ask is whether it is possible to make this animation with some kind of exponential deceleration,
     that is, the slower the wheel starts spinning, the slower it starts to slow down.
    */
    const enterListener = (event) => {
      if (event.key === 'Enter') {
        if (isProcessing.value) {
          // if a bet is being processed, don't place a new bet
          return;
        }
        // if no bet is being processed, place a new bet
        placeBet();
      }
    };
    onMounted(() => {
      window.addEventListener('keydown', enterListener);
    });
    onUnmounted(() => {
      window.removeEventListener('keydown', enterListener);
    });
    return {
      placeBet,
      betInput,
      gameResult,
      errorMsg,
      isProcessing,
      tempBalance,
      showAlert,
      wheelStyle,

    };
  },
};
</script>
<style scoped>
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
  width: 1000px; 
  max-width: 90%; 
  flex-direction: column;
  margin-top: 30px;
  justify-content: center; 
  align-items: center;
}
.bet-form {
  width: 100%; 
  min-height: 100px; 
  background-color: rgba(255, 228, 196, 0); 
  display: flex; 
  align-items: center;  
  justify-content: center;
}
.submit-button {
  height: 50px; 
  width: 50px; 
  color: aquamarine; 
  background-color: #15212c;
}
.wheel {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  transition: transform 5s ease-out;
  margin-top: 20px;
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

</style>


