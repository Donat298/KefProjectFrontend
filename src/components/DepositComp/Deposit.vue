<template>
 
    <!-- Currency Selector -->
    <div style="display: flex;">
      <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto;
       background-color: #15212c00; padding: 10px;">
        <v-menu style="" location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
  
              <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart mr-2"  elevation="5">
          
             
                   <p style=" font-size: 15px; color: #ffffff;">
                    {{ selectedCurrencyName }}
                  </p>
             
                  <img style="margin: 10px; width: 22px;" :src="getCurrencyImagePath(selectedCurrency)" />
                  <font-awesome-icon style="color: #ffffff; height: 14px;" :icon="['fas', 'chevron-down']" />

          
              </v-card>
        
          </template>
          <!-- Currency List -->
          <v-list elevation="7" 
          class="vliststandart" style="background-color: #15212c;">
            <!-- EUR -->
            <v-list-item 
      v-for="currency in currencies" 
      :key="currency.code"
      @click="selectCurrency(currency.code)" 
      style="height: 40px; align-items: center;" 
      :ripple="false"
    >
      <div class="hhdd">
        <img 
          class="imginlist"
          :src="getCurrencyImagePath(currency.code)" 
        />
        <div class="ml-2" style="min-width: 60px; font-size: 15px;">
          {{ currency.name }}
        </div>
      </div>
    </v-list-item>


          </v-list>
        </v-menu>


        <!-- USDT Address Selection (Conditional) -->
        <v-menu style="" v-if="selectedCurrency === 'balanceusdt'" 
        location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
         <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart" 
         elevation="5">

                  <div style="font-size: 15px; color: #ffffff;">
                    {{ selectedUSDTAddressName }}
                  </div>
           
                  <font-awesome-icon style="color: #ffffff;height: 14px;
                   margin-left: 10px;" :icon="['fas', 'chevron-down']" />

               
              </v-card>
        
          </template>
          <!-- USDT Address List -->

          <v-list elevation="5" style="background-color: #15212c;" class="vliststandart">

            <v-list-item @click="selectUSDTAddress('usdtaddress1')" class="listitemadress"
       
          :ripple="false">
          <p style="  font-size: 15px;">
                ETH - Ethereum (ERC20)
              </p>
            </v-list-item>
            <v-list-item @click="selectUSDTAddress('usdtaddress2')" class="listitemadress"
           :ripple="false">
             
               <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
         
            </v-list-item>
            <v-list-item @click="selectUSDTAddress('usdtaddress3')" class="listitemadress"
         :ripple="false">
             
             <p style="  font-size: 15px;">POLYGON - Matic</p>
       
          </v-list-item>
          </v-list>
        </v-menu>

        <v-menu style="" v-if="selectedCurrency === 'balanceeth'" 
        location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
           <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart" 
         elevation="5">
             
               
                  <div style=" font-size: 15px; color: #ffffff;">
                    {{ selectedETHAddressName }}
                  </div>
               
                  <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

           
              </v-card>
       
          </template>
          <!-- USDT Address List -->
          <v-list elevation="5" style="background-color: #15212c;"  class="vliststandart">
            <v-list-item @click="selectETHAddress('ethaddress1')"  class="listitemadress"
          :ripple="false">
          <p style="  font-size: 15px;">
                ETH - Ethereum (ERC20)
              </p>
            </v-list-item>
            <v-list-item @click="selectETHAddress('ethaddress2')" 
            class="listitemadress" :ripple="false">
             
               <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
         
            </v-list-item>
         
          </v-list>
        </v-menu>
       
      </v-card>
    </div>




      <v-img class="mx-auto" style="max-width: 100px; margin: 30px;" :src="getCurrencyImagePath(selectedCurrency)" />


    <div class="mx-auto" style="display: flex; padding: 10px; overflow-x: auto;">
      <v-card elevation="5" class="pa-2 pl-4 mx-auto vmenustandart" >

        <v-card elevation="0" 
        style="background-color: #2e4659; color: #ffffff; display: flex; align-items: center;
 ">
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

    <DepositId :adress="selectedCurrencyAddress" :copyadresspressed="copyadresspressed"></DepositId>
  
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import DepositId from '@/components/DepositComp/DepositId.vue';


export default {
  components: {
    DepositId,
  }, 
  data() {
    return {
      currencies: [
        { name: 'EUR', code: 'balanceeur' },
        { name: 'BTC', code: 'balancebtc' },
        { name: 'USDT', code: 'balanceusdt' },
        { name: 'ETH', code: 'balanceeth' },
      ],
    };
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
    const selectedUSDTAddress = ref(localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1');
    const selectedETHAddress = ref(localStorage.getItem('selectedETHAddress') || 'ethaddress1');


    const selectedCurrencyAddress = computed(() => {

      if (selectedCurrency.value === 'balanceusdt') {
        return selectedUSDTAddress.value;
      }
      if (selectedCurrency.value === 'balanceeth') {
        return selectedETHAddress.value;
      } 
      else {
        return getCurrencyAddress(selectedCurrency.value);
      }
    });



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


    watch(selectedCurrency, (newCurrency) => {

        if (newCurrency === 'balanceusdt') {
          selectedUSDTAddress.value = localStorage.getItem('selectedUSDTAddress') || 'usdtaddress1';
        }

        if (newCurrency === 'balanceeth') {
          selectedETHAddress.value = localStorage.getItem('selectedETHAddress') || 'ethaddress1';
        } 

        else {
          selectedUSDTAddress.value = getCurrencyAddress(newCurrency);
          selectedETHAddress.value = getCurrencyAddress(newCurrency);
        }


      localStorage.setItem('selectedCurrency', newCurrency);
    });


    const selectCurrency = (currencyKey) => { 
      selectedCurrency.value = currencyKey;

      store.commit('setSelectedCurrency', currencyKey);
    };


    const selectUSDTAddress = (addressKey) => {
      selectedUSDTAddress.value = addressKey;
      localStorage.setItem('selectedUSDTAddress', addressKey);
    };
    const selectETHAddress = (addressKey) => {
      selectedETHAddress.value = addressKey;
      localStorage.setItem('selectedETHAddress', addressKey);
    };

    // Images for different currencies
    const selectedCurrencyImages = {
      balanceusdt: require('@/assets/Cryptologos/usdt.svg'),
      balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
      balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
      balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
    };

    const selectedCurrencyImagesQrcode = {
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
      return selectedCurrencyImagesQrcode[currencyKey];
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


<style scoped>
.imginlist{
  display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin-left: 15px;
      user-select: none; 

}
 .unselectable {
    user-select: none;
  }
.vmenustandart{
color: #ffffff;
  cursor: pointer; height: 48px; display: flex; align-items: center;
          background-color: #2e4659; user-select: none;
}

.vliststandart{
 border: 2px solid #2e4659;  color: #ffffff; min-width: 100px;
           margin-top: 10px;
}
.listitemadress{
  height: 40px; align-items: center;
}

</style>



