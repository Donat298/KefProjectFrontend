<template>
  <div>
    <div class="mx-auto" style="display: flex;
    overflow-x: auto; 
    ">
    <v-card elevation="0" class="mx-auto" style="display: flex;
    overflow-x: auto; background-color: #15212c00; padding: 10px; ">
    <v-menu style=" " location="bottom center" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <div
          class="rounded"
          style="flex: 1; margin-right: 10px; display: flex; justify-content: center; align-items: center;"
        >
          <v-card
            v-bind="props"
            :ripple="false"
            class="rounded pa-4"
            style="
              cursor: pointer;
              height: 48px;
              display: flex;
              align-items: center;
              background-color: #2e4659;
            "
            elevation="5"
          >
            <div
              style="
                color: #ffffff;
                display: flex;
                align-items: center;
                text-align: center;
              "
            >
              <span
                style="
                  max-width: 12ch;
                  line-height: 1.5;
                  font-size: var(--text-size-default);
                  font-weight: 600;
                  overflow: hidden;
                  margin: 0;
                  font: inherit;
                  vertical-align: baseline;
                  box-sizing: border-box;
                "
              >
                {{ $store.getters.userDetail[selectedCurrency] }}
              </span>
              <img
                style="margin-left: 10px; width: 22px;"
                :src="getCurrencyImagePath(selectedCurrency)"
              />
              <fa
                icon="fa-solid fa-chevron-down"
                style="color: #ffffff; height: 14px; margin-left: 10px;"
              ></fa>
            </div>
          </v-card>
        </div>
      </template>
      <v-list elevation="5" style="background-color: #15212c; color: #ffffff; min-width: 100px;     margin-top: 10px;">
        <!-- EUR -->
        <v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
          <div class="hhdd">
            {{ $store.getters.userDetail.balanceeur }}
            <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
              <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeur')" />
              <div class="ml-2" style="min-width: 60px;">EUR</div>
            </div>
          </div>
        </v-list-item>

        <!-- BTC -->
        <v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;" :ripple="false">
          <div class="hhdd">
            {{ $store.getters.userDetail.balancebtc }}
            <div class="ml-2 hhpp">
              <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balancebtc')" />
              <div class="ml-2" style="min-width: 60px;">BTC</div>
            </div>
          </div>
        </v-list-item>

        <!-- USDT -->
        <v-list-item @click="selectCurrency('balanceusdt')" style="height: 40px; align-items: center;" :ripple="false">
          <div class="hhdd">
            {{ $store.getters.userDetail.balanceusdt }}
            <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
              <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceusdt')" />
              <div class="ml-2" style="min-width: 60px;">USDT</div>
            </div>
          </div>
        </v-list-item>

        <!-- ETH -->
        <v-list-item @click="selectCurrency('balanceeth')" style="height: 40px; align-items: center;" :ripple="false">
          <div class="hhdd">
            {{ $store.getters.userDetail.balanceeth }}
            <div class="ml-2 hhpp">
              <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeth')" />
              <div class="ml-2" style="min-width: 60px;">ETH</div>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>


   <!-- USDT Address Selection (Conditional) -->

    <v-menu style="" v-if="selectedCurrency === 'balanceusdt'" location="bottom center" transition="slide-y-transition">

        <template v-slot:activator="{ props }">
          <div
            class="rounded"
            style="flex: 1; display: flex; justify-content: center; align-items: center;"
          >
            <v-card
              v-bind="props"
              :ripple="false"
              class="rounded pa-4"
              style="
                cursor: pointer;
                height: 48px;
                display: flex;
                align-items: center;
                background-color: #2e4659;
              "
              elevation="5"
            >
              <div
                style="
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  text-align: center;
                "
              >
                <span
                  style="
                    max-width: 12ch;
                    line-height: 1.5;
                    font-size: var(--text-size-default);
                    font-weight: 600;
                    overflow: hidden;
                    margin: 0;
                    font: inherit;
                    vertical-align: baseline;
                    box-sizing: border-box;
                  "
                >
                  {{ selectedCurrencyAddress }}
                </span>
                <fa
                  icon="fa-solid fa-chevron-down"
                  style="color: #ffffff; height: 14px; margin-left: 10px;"
                ></fa>
              </div>
            </v-card>
          </div>
        </template>
        <v-list elevation="5" style="background-color: #15212c; color: #ffffff; min-width: 100px; margin-top: 10px;">
          <v-list-item @click="selectUSDTAddress('usdtaddress1')" style="height: 40px; align-items: center;" :ripple="false">
            <div class="hhdd">
              USDT Address 1
            </div>
          </v-list-item>
          <v-list-item @click="selectUSDTAddress('usdtaddress2')" style="height: 40px; align-items: center;" :ripple="false">
            <div class="hhdd">
              USDT Address 2
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>
    </div>

    <div style="position: relative;" class="ma-7">
      <v-img class="mx-auto" style="max-width: 200px" :src="getCurrencyImagePath(selectedCurrency)" />
    </div>
    <div class="mx-auto" style="display: flex; padding: 10px;
    overflow-x: auto; 
    ">
      <v-card elevation="5" class="pa-2 pl-4 mx-auto" style="
        background-color: #2e4659;
        color: #ffffff;
        display: flex;
        
 
        height: 48px;
        
  
      ">

        <v-card  elevation="0" style="
          background-color: #2e4659;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          
        ">
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

    <DepositId></DepositId>
    </div>


</template>
<script>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import DepositId from '@/components/DepositComp/DepositId.vue';

export default {
  components: {
    DepositId,
  },
  setup() {
    const store = useStore();
    const selectedCurrency = ref(localStorage.getItem('selectedCurrency') || 'balanceusdt');
    const showTooltip = ref(false);
  
    const selectedCurrencyName = computed(() => {
      switch (selectedCurrency.value) {
        case 'balanceusdt':
          return 'Usdt';
        case 'balanceeur':
          return 'Euro';
        case 'balancebtc':
          return 'Bitcoin';
        case 'balanceeth':
          return 'Ethereum';
        default:
          return '';
      }
    });

    // Fixed the computed property for selectedCurrencyAddress
    const selectedCurrencyAddress = computed(() => {
      // Check if the selected currency is USDT
      if (selectedCurrency.value === 'balanceusdt') {
        // If USDT, update selectedCurrencyAddress with the selected USDT address
        return selectedUSDTAddress.value;
      } else {
        // For other currencies, update selectedCurrencyAddress based on the currency
        return getCurrencyAddress(selectedCurrency.value);
      }
    });

    const selectedUSDTAddress = ref(localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1');

    // Function to get the default USDT address
    

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
    watch(selectedCurrency, (newCurrency) => {
  if (newCurrency === 'balanceusdt') {
    // If USDT, update selectedUSDTAddress with the selected USDT address
    selectedUSDTAddress.value = localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1';
  } else {
    // For other currencies, update selectedUSDTAddress based on the currency
    selectedUSDTAddress.value = getCurrencyAddress(newCurrency);
  }

  // Store the selected currency in localStorage
  localStorage.setItem('selectedCurrency', newCurrency);
  // This line is not needed: selectedCurrencyAddress.value = selectedUSDTAddress.value;
});

    // Function to select a currency
    const selectCurrency = (currencyKey) => { 
      selectedCurrency.value = currencyKey;
      // Update the selected currency in the Vuex store
      store.commit('setSelectedCurrency', currencyKey);
    };

    // Function to select a USDT address
    const selectUSDTAddress = (addressKey) => {
      selectedUSDTAddress.value = addressKey;

      // Store the selected USDT address in localStorage
      localStorage.setItem('selectedUSDTAddress', addressKey);
    };

    // Images for different currencies
    const selectedCurrencyImages = {
      balanceusdt: require('@/assets/Cryptologos/tether-usdt-logo.svg'),
      balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
      balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
      balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
    };

    // Function to get the image path for the selected currency
    const getCurrencyImagePath = (currencyKey) => {
      return selectedCurrencyImages[currencyKey];
    };

    // Function to get the address for each currency
    const getCurrencyAddress = (currencyKey) => {
      switch (currencyKey) {
        case 'balanceusdt':
          return selectedUSDTAddress.value; // Use the selected USDT address
        case 'balanceeur':
          return 'Euro address';
        case 'balancebtc':
          return 'Btc address 1';
        case 'balanceeth':
          return 'Etc address';
        default:
          return '';
      }
    };

    return {
      selectedCurrency,
      selectedCurrencyName,
      selectedCurrencyAddress,
      selectedUSDTAddress,
      showTooltip,
      copyAddress,
      getCurrencyImagePath,
      selectCurrency,
      selectUSDTAddress,
    };
  },
};
</script>


