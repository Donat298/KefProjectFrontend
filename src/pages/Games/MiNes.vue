
<template>
  <div>
    <input v-model="betAmount" type="number" placeholder="Enter bet amount" />
    <v-btn style="background-color: #342d26;" @click="placeBet">Confirm Bet</v-btn>
    <v-btn style="background-color: #342d26;" @click="calculateGameOutcome">Calculate</v-btn>
  </div>
</template>

<script>
import { useApiPrivate } from '../../utils/useApi';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const betAmount = ref(0);
    const currency = computed(() => {
      const balanceFieldsMap = {
        'balance': 'trc', 
        'balanceeur': 'eur',
        'balancebtc': 'btc',
        'balanceeth': 'eth',
      };
      return balanceFieldsMap[store.getters.selectedCurrency];
    });

    const gameResult = ref(null); // Define gameResult as a ref variable

    const placeBet = async () => {
      try {
        // Subtract the bet amount from the balance
        const currentBalance = store.getters.userDetail[store.getters.selectedCurrency];
        const newBalance = currentBalance - betAmount.value;
        store.dispatch('updateBalance', {
          currency: currency.value,
          amount: newBalance,
        });

        // Make the API call to place the bet
        const response = await axiosPrivateInstance.put('/games/mines/bet', {
          betAmount: betAmount.value,
          currency: currency.value,
        });

        // Handle the response and update gameResult
        gameResult.value = {
          message: response.data.message,
          balance: response.data.balance,
        };

      } catch (error) {
        console.error('Error placing bet:', error);
      }
    };

    const calculateGameOutcome = async () => {
  try {
    // Simulate the game outcome by making the API call
    const response = await axiosPrivateInstance.post('/games/mines/game', {
      currency: currency.value,
      betAmount: betAmount.value,
    });

    // Handle the response and update gameResult
    gameResult.value = {
      message: response.data.message,
      balance: response.data.balance,
    };

    // If you win, update the balance to the new balance received from the backend
    if (response.data.message === 'You won!') {
      const newBalance = response.data.balance;
      store.dispatch('updateBalance', {
        currency: currency.value,
        amount: newBalance,
      });
    }

  } catch (error) {
    console.error('Error calculating game outcome:', error);
  }
};


    const enterListener = (event) => {
      if (event.key === 'Enter') {
        if (!isProcessing.value) {
          placeBet();
        }
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', enterListener);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', enterListener);
    });

    return {
      betAmount,
      placeBet,
      calculateGameOutcome,
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>