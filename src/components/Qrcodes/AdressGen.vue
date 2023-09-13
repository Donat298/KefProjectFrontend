<template>
    <div
      style="height: 120px; display: flex; align-items: center; justify-content: center; background-color:#1d2f3f"
      elevation="0"
    >
      <v-card elevation="5" class="pa-2 pl-4" style="
      background-color: #2e4659; color:#ffffff; display: flex; align-items: center; 
      justify-content: center; height: 48px;">
        <!-- Display the selectedCurrencyAddress -->
        <v-card elevation="0" style="background-color: #2e4659; color:#ffffff; display: flex; align-items: center; justify-content: center;">
          {{ selectedCurrencyAddress }}
        </v-card>
        <button
          @click="copyAddress"
          :disabled="showTooltip"
          class="copied-button ml-2"
          :class="{ 'copied-icon': showTooltip }"
          :style="{ backgroundColor: showTooltip ? '#2e4659' : '#2e4659' }"
          style="min-width: 40px; border-top-left-radius: 0px; border-bottom-left-radius: 0px; min-width: 40px;"
        >
          <fa :icon="showTooltip ? 'check' : 'copy'" class="mx-auto" style="color: #ffffff;"></fa>
        </button>
      </v-card>
    </div>
    <div class="crname">{{ selectedCurrencyName }}</div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  
  import { ref, computed, watch } from 'vue';
  
  export default {
    setup() {
      const store = useStore();
      const balanceInput = ref(0);
      const errorMsg = ref('');
      const router = useRouter();
      const userId = ref(store.getters.userDetail._id);
      const showTooltip = ref(false);
  
      // Create a reactive variable for selectedCurrency
      const selectedCurrency = ref(store.getters.selectedCurrency);
  
      // Define a computed property to get the selected currency name
      const selectedCurrencyName = computed(() => {
        switch (selectedCurrency.value) {
          case 'balanceusdt':
            return 'Usdt';
          case 'balanceeur':
            return 'Euro';
          case 'balanceusdt2':
            return 'Usdt2';
          case 'balancebtc':
            return 'Bitcoin';
          case 'balanceeth':
            return 'Ethereum';
          default:
            return ''; // Handle other currencies or defaults as needed
        }
      });
  
      // Update selectedCurrencyAddress whenever selectedCurrency changes
      const selectedCurrencyAddress = computed(() => {
        switch (selectedCurrency.value) {
          case 'balanceusdt':
            return 'Usdt address';
          case 'balanceeur':
            return 'Euro address';
             case 'balanceusdt2':
            return 'Usdt2';
          case 'balancebtc':
            return 'Btc address';
          case 'balanceeth':
            return 'Etc address';
          default:
            return ''; // Handle other currencies or defaults as needed
        }
      });
  
      // Function to copy the address to the clipboard
      const copyAddress = () => {
        const address = selectedCurrencyAddress.value;
  
        // Create a temporary text area element to hold the text to copy
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
  
        // Select and copy the text
        textArea.select();
        document.execCommand('copy');
  
        // Remove the temporary element
        document.body.removeChild(textArea);
  
        // Show the copied tooltip
        showCopiedTooltip();
      };
  
      // Function to show the copied tooltip
      const showCopiedTooltip = () => {
        showTooltip.value = true;
        setTimeout(() => {
          showTooltip.value = false;
        }, 1000); // Hide the tooltip after 1 second
      };
  
      // Watch for changes in selectedCurrency and update selectedCurrencyAddress
      watch(selectedCurrency, () => {
        // Handle changes to selectedCurrency here, if needed
      });
  
      return {
        copyAddress,
        showTooltip,
        selectedCurrencyAddress,
        selectedCurrencyName, // Add the selectedCurrencyName to the returned object
      };
    },
  };
  </script>
  
  <style>
  
  </style>
  