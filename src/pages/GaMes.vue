<template>
  <div v-if="$store.getters.isAuthenticated" style="justify-content: center;">
    <h1>Wheel of Fortune Game</h1>
    <div style="background-color: #15212c;">
      <form @submit.prevent="spinWheel">
        <p>Balance: ${{ balance }}</p>
        <p>Bet: </p>
        <v-card class="pt-4 pa-4 mt-4" style="margin: auto; width: 115px; background-color: #273d53; color: rgb(255, 255, 255);">
          <v-radio-group v-model="bet">
            <v-radio label="$1" value="1"></v-radio>
            <v-radio label="$5" value="5"></v-radio>
            <v-radio label="$10" value="10"></v-radio>
            <v-radio label="$20" value="20"></v-radio>
          </v-radio-group>
        </v-card>
        <v-btn class="mt-4 mb-4" type="submit" :disabled="spinning" style="color: black; 
     background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));">
      Spin Wheel
    </v-btn>
  </form>
      
      
    
    </div>
     <div  style="display: flex; justify-content: center; align-items: center;">
      <div style="min-width: 40px;"></div>
      <div style=" ; " id="wheel" :style="wheelStyle">
        <div class="half win">WIN</div>
        <div class="half lose">LOSE</div>
        
      </div>
      <div style="display: flex; align-items: center; justify-content: center; height: 200px; margin-left: 10px;">
        <div style="transform: rotate(90deg);">
          <v-icon icon="mdi-map-marker-outline"></v-icon>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <p>{{ message }}</p>
    </div>
  </div>
  <IfnotAuth v-if="!$store.getters.isAuthenticated"></IfnotAuth>
</template>

<script>
import IfnotAuth from "@/components/IfnotAuth/IfnotAuth.vue";
import { ref, computed } from 'vue';

export default {
  components: {
    IfnotAuth
  },
  setup() {
    const balance = ref(20);
    const bet = ref(1);
    const message = ref('');
    const startDegree = ref(0);
    const totalSpin = ref(0);
    const spinning = ref(false);

    const wheelStyle = computed(() => ({
      transform: `rotate(${totalSpin.value}deg)`,
      animation: totalSpin.value !== startDegree.value ? `spin-${startDegree.value} 5s ease-out forwards` : '',
    }));

    function spinWheel() {
      if (bet.value > balance.value || spinning.value) {
        message.value = "You don't have enough money to make that bet or the wheel is still spinning.";
        return;
      }
      balance.value -= bet.value;
      spinning.value = true;

      startDegree.value = Math.floor(Math.random() * 360); // Random starting position
      const spinAmount = 2800; // Always spin 1440 degrees
      totalSpin.value = startDegree.value + spinAmount;

      // Create a new stylesheet for our dynamic animation
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerText = `
        @keyframes spin-${startDegree.value} {
          from {
            transform: rotate(${startDegree.value}deg);
          }
          to {
            transform: rotate(${totalSpin.value}deg);
          }
        }
      `;
      document.head.appendChild(styleSheet);

      setTimeout(() => {
        const spinResult = (totalSpin.value % 360) < 180;

        if (spinResult) {
          const winnings = bet.value * 2;
          balance.value += winnings;
          message.value = `Congratulations! The wheel was in your favor. You won $${winnings}!`;
        } else {
          message.value = `Sorry, the wheel was not in your favor. Better luck next time.`;
        }

        // Clean up the stylesheet to prevent buildup
        document.head.removeChild(styleSheet);
        spinning.value = false;
      }, 5000);
    }

    return { balance, bet, message, spinWheel, wheelStyle, spinning };
  }
};
</script>

<style>
 

.centered-content {

  justify-content: center;

}
#wheel {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  border: 2px solid #000;
}

.half {
  width: 200px;
  height: 100px;
  position: absolute;
  text-align: center;
  line-height: 100px;
  font-size: 24px;
  color: #fff;
}

.win {
  background: green;
  top: 0;
}

.lose {
  background: red;
  bottom: 0;
}
</style>
Make it so that when the wheel is spinning, the button does not work.