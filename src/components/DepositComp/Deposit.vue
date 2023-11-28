<template>
  <div>
    <!-- Currency Selector -->
    <div class="mx-auto" style="display: flex; overflow-x: auto;">
      <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto; background-color: #15212c00; padding: 10px;">
        <v-menu style="" location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
            <div class="rounded" style="flex: 1;  margin: 5px;  display: flex; justify-content: center; align-items: center;">
              <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; flex: 1; 
               height: 48px; display: flex;  align-items: center; background-color: #2e4659;" elevation="5">
          
             
                   <p style=" font-size: 15px; color: #ffffff;">
                    {{ selectedCurrencyName }}
                  </p>
             
                  <img style="margin-left: 10px; width: 22px;" :src="getCurrencyImagePath(selectedCurrency)" />
                  <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

          
              </v-card>
            </div>
          </template>
          <!-- Currency List -->
          <v-list elevation="7" style="background-color: #15212c;  border: 2px solid #2e4659;  color: #ffffff; min-width: 100px; margin-top: 10px;">
            <!-- EUR -->
            <v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
              <div class="hhdd">
             
                  <img style="display: flex; align-items: center; width: 22px; max-height:  22px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeur')" />
                  <div class="ml-2" style="min-width: 60px; font-size: 15px;">EUR</div>
          
              </div>
            </v-list-item>
            <!-- BTC -->
            <v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;" :ripple="false">
              <div class="hhdd">
           
       
                  <img style="display: flex; align-items: center; width: 22px; max-height:  22px; margin-left: 15px;" :src="getCurrencyImagePath('balancebtc')" />
                  <div class="ml-2" style="min-width: 60px; font-size: 15px;">BTC</div>
      
              </div>
            </v-list-item>
            <!-- USDT -->
            <v-list-item @click="selectCurrency('balanceusdt')" style="height: 40px; align-items: center;" :ripple="false">
              <div class="hhdd">
           
             
                  <img style="display: flex; align-items: center; width: 22px; max-height:  22px; margin-left: 15px;" :src="getCurrencyImagePath('balanceusdt')" />
                  <div class="ml-2" style="min-width: 60px; font-size: 15px;">USDT</div>
           
              </div>
            </v-list-item>
            <!-- ETH -->
            <v-list-item @click="selectCurrency('balanceeth')" style="height: 40px; align-items: center;" :ripple="false">
              <div class="hhdd">
            
 
                  <img style="display: flex; align-items: center; width: 22px; max-height:  22px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeth')" />
                  <div class="ml-2" style="min-width: 60px; font-size: 15px;">ETH</div>
      
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- USDT Address Selection (Conditional) -->
        <v-menu style="" v-if="selectedCurrency === 'balanceusdt'" location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
            <div class="rounded" style="flex: 1; margin: 5px;  display: flex; justify-content: center; align-items: center;">
              <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; height: 48px; display: flex; align-items: center; background-color: #2e4659;" elevation="5">
             
                
                  <div style=" font-size: 15px; color: #ffffff;">
                    {{ selectedUSDTAddressName }}
                  </div>
           
                  <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

               
              </v-card>
            </div>
          </template>
          <!-- USDT Address List -->
          <v-list elevation="5" style="background-color: #15212c;  border: 2px solid #2e4659;  color: #ffffff; min-width: 100px;
           margin-top: 10px;">
            <v-list-item @click="selectUSDTAddress('usdtaddress1')" style="height: 40px; align-items: 
            center;" :ripple="false">
          <p style="  font-size: 15px;">
                ETH - Ethereum (ERC20)
              </p>
            </v-list-item>
            <v-list-item @click="selectUSDTAddress('usdtaddress2')" style="height: 40px; align-items: center;" :ripple="false">
             
               <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
         
            </v-list-item>
            <v-list-item @click="selectUSDTAddress('usdtaddress3')" style="height: 40px; align-items: center;" :ripple="false">
             
             <p style="  font-size: 15px;">POLYGON - Matic</p>
       
          </v-list-item>
          </v-list>
        </v-menu>

        <v-menu style="" v-if="selectedCurrency === 'balanceeth'" location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
            <div class="rounded" style="flex: 1; margin: 5px;  display: flex; justify-content: center; align-items: center;">
              <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; height: 48px; display: flex; align-items: center; background-color: #2e4659;" elevation="5">
             
               
                  <div style=" font-size: 15px; color: #ffffff;">
                    {{ selectedETHAddressName }}
                  </div>
               
                  <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

           
              </v-card>
            </div>
          </template>
          <!-- USDT Address List -->
          <v-list elevation="5" style="background-color: #15212c; border: 2px solid #2e4659; color: #ffffff; min-width: 100px;
           margin-top: 10px;">
            <v-list-item @click="selectETHAddress('ethaddress1')" style="height: 40px; align-items: 
            center;" :ripple="false">
          <p style="  font-size: 15px;">
                ETH - Ethereum (ERC20)
              </p>
            </v-list-item>
            <v-list-item @click="selectETHAddress('ethaddress2')" style="height: 40px; align-items: center;" :ripple="false">
             
               <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
         
            </v-list-item>
         
          </v-list>
        </v-menu>
       
      </v-card>
    </div>
    <!-- Currency Image --> 
    <div style="position: relative;" class="ma-7">
      <v-img class="mx-auto" style="max-width: 100px" :src="getCurrencyImagePath(selectedCurrency)" />
    <!--  <v-img class="mx-auto" style="max-width: 100px" :src="getCurrencyImagePath2(selectedCurrency)" /> -->
    </div>
    <!-- Currency Address -->
    <div class="mx-auto" style="display: flex; padding: 10px; overflow-x: auto;">
      <v-card elevation="5" class="pa-2 pl-4 mx-auto" style="background-color: #2e4659;
       color: #ffffff; display: flex; height: 48px;">
      <v-card elevation="0" class="unselectable" style="background-color: #2e4659; color: #ffffff; display: flex; align-items: center;
  justify-content: center; font-size: 17px;">
  {{ selectedCurrencyAddress }}
</v-card>
        <button @click="copyAddress" :disabled="showTooltip" 
        class="copied-button ml-2" :class="{ 'copied-icon': showTooltip }"
         :style="{ backgroundColor: showTooltip ? '#2e4659' : '#2e4659' }" style="min-width: 32px;
           min-height: 32px;  ">
       
          <font-awesome-icon v-if="!showTooltip" style="color: #ffffff;height: 16px; " :icon="['fas', 'copy']" />
          <font-awesome-icon v-if="showTooltip" style="color: #ffffff;height: 16px; " :icon="['fas', 'check']" />
        </button>
      </v-card>
    </div>
    <!-- Deposit ID (Assuming it's a custom component) -->
    <DepositId :copyadresspressed="copyadresspressed"></DepositId>
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
    const copyadresspressed = ref(false);
    const selectedCurrencyName = computed(() => {
      switch (selectedCurrency.value) {
        case 'balanceusdt':
          return 'USDT';
        case 'balanceeur':
          return 'Euro';
        case 'balancebtc':
          return 'BTC';
        case 'balanceeth':
          return 'ETH';
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
      }
      if (selectedCurrency.value === 'balanceeth') {
   
        return selectedETHAddress.value;
      } 
      else {
        // For other currencies, update selectedCurrencyAddress based on the currency
        return getCurrencyAddress(selectedCurrency.value);
      }
    });

    const selectedUSDTAddress = ref(localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1');
    const selectedETHAddress = ref(localStorage.getItem('selectedETHAddress') || 'ethaddress1');

    // Function to get the default USDT address
    const selectedUSDTAddressName = computed(() => {
  switch (selectedUSDTAddress.value) {
    case 'usdtaddress1':
      return 'ETH';
    case 'usdtaddress2':
      return ' BSC';
    case 'usdtaddress3':
      return 'POLYGON';

  
    default:
      return '';
  }
});

const selectedETHAddressName = computed(() => {
  switch (selectedETHAddress.value) {
    case 'ethaddress1':
      return 'ETH';
    case 'ethaddress2':
      return ' BSC';

  
    default:
      return '';
  }
});

    // Function to copy the address to the clipboard
    const copyAddress = () => {
      const address = selectedCurrencyAddress.value;
      copyadresspressed.value = true;
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
          copyadresspressed.value = false;
        }, 1000); // Hide the tooltip after 1 second
      };

    // Watch for changes in selectedCurrency and update selectedCurrencyAddress
    watch(selectedCurrency, (newCurrency) => {
  if (newCurrency === 'balanceusdt') {
    // If USDT, update selectedUSDTAddress with the selected USDT address
    selectedUSDTAddress.value = localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1';
  }
  if (newCurrency === 'balanceeth') {
 
    selectedETHAddress.value = localStorage.getItem('selectedETHAddress') || 'ethaddress1';
  } 
  else {
    // For other currencies, update selectedUSDTAddress based on the currency
    selectedUSDTAddress.value = getCurrencyAddress(newCurrency);
    selectedETHAddress.value = getCurrencyAddress(newCurrency);
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
    const selectETHAddress = (addressKey) => {
      selectedETHAddress.value = addressKey;

      // Store the selected USDT address in localStorage
      localStorage.setItem('selectedETHAddress', addressKey);
    };

    // Images for different currencies
    const selectedCurrencyImages = {
      balanceusdt: require('@/assets/Cryptologos/tether-usdt-logo.svg'),
      balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
      balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
      balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
    };

    const selectedCurrencyImages2 = {
      balanceusdt: require('@/assets/CryptoQrcodes/TetherErc20.png'),
      balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
      balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
      balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
    };

    // Function to get the image path for the selected currency
    const getCurrencyImagePath = (currencyKey) => {
      return selectedCurrencyImages[currencyKey];
    };
    const getCurrencyImagePath2 = (currencyKey) => {
      return selectedCurrencyImages2[currencyKey];
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
          return selectedETHAddress.value;;
        default:
          return '';
      }
    };

    return {
      selectedCurrency,
      selectedCurrencyName,
      selectedCurrencyAddress,
      selectedUSDTAddress,
      selectedETHAddress,
      showTooltip,
      copyAddress,
      getCurrencyImagePath,
      getCurrencyImagePath2,
      selectCurrency,
      selectUSDTAddress,
      selectETHAddress,
      selectedUSDTAddressName,
      selectedETHAddressName,
      copyadresspressed,
    };
  },
};
</script>


<style>
 .unselectable {
    user-select: none;
  }
</style>



