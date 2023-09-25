<template>
  <div class="mx-auto" style="display: flex; overflow-x: auto;">
       <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto; background-color: #15212c00; padding: 10px;">
         <v-menu style="" location="bottom center" transition="slide-y-transition">
           <!-- Activator -->
           <template v-slot:activator="{ props }">
             <div class="rounded" style="flex: 1; margin-right: 10px; display: flex; justify-content: center; align-items: center;">
               <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; height: 48px; display: flex; align-items: center; background-color: #2e4659;" elevation="5">
                 <div style="color: #ffffff; display: flex; align-items: center; text-align: center;">
                   <span style="max-width: 12ch; line-height: 1.5; font-size: var(--text-size-default); font-weight: 600;
                    overflow: hidden; margin: 0; font: inherit; vertical-align: baseline; box-sizing: border-box;">
                    <p style=" font-size: 15px;">
                      {{ $store.getters.userDetail[selectedCurrency] }}
                   </p>
                   </span>
                   <img style="margin-left: 10px; width: 22px;" :src="getCurrencyImagePath(selectedCurrency)" />
                   <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />
 
                 </div>
               </v-card>
             </div>
           </template>
           <!-- Currency List -->
           <v-list elevation="5" style="background-color: #15212c; color: #ffffff; min-width: 100px; margin-top: 10px;">
             <!-- EUR -->
             <v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
               <div class="hhdd">
                 {{ $store.getters.userDetail.balanceeur }}
                 <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
                   <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeur')" />
                   <div class="ml-2" style="min-width: 60px; font-size: 15px;">EUR</div>
                 </div>
               </div>
             </v-list-item>
             <!-- BTC -->
             <v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;" :ripple="false">
               <div class="hhdd">
                 {{ $store.getters.userDetail.balancebtc }}
                 <div class="ml-2 hhpp">
                   <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balancebtc')" />
                   <div class="ml-2" style="min-width: 60px; font-size: 15px;">BTC</div>
                 </div>
               </div>
             </v-list-item>
             <!-- USDT -->
             <v-list-item @click="selectCurrency('balanceusdt')" style="height: 40px; align-items: center;" :ripple="false">
               <div class="hhdd">
                 {{ $store.getters.userDetail.balanceusdt }}
                 <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
                   <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceusdt')" />
                   <div class="ml-2" style="min-width: 60px; font-size: 15px;">USDT</div>
                 </div>
               </div>
             </v-list-item>
             <!-- ETH -->
             <v-list-item @click="selectCurrency('balanceeth')" style="height: 40px; align-items: center;" :ripple="false">
               <div class="hhdd">
                 {{ $store.getters.userDetail.balanceeth }}
                 <div class="ml-2 hhpp">
                   <img style="display: flex; align-items: center; width: 22px; max-height: 25px; margin-left: 15px;" :src="getCurrencyImagePath('balanceeth')" />
                   <div class="ml-2" style="min-width: 60px; font-size: 15px;">ETH</div>
                 </div>
               </div>
             </v-list-item>
           </v-list>
         </v-menu>
         <!-- USDT Address Selection (Conditional) -->
         <v-menu style="" v-if="selectedCurrency === 'balanceusdt'" location="bottom center" transition="slide-y-transition">
           <!-- Activator -->
           <template v-slot:activator="{ props }">
             <div class="rounded" style="flex: 1; display: flex; justify-content: center; align-items: center;">
               <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; height: 48px; display: flex; align-items: center; background-color: #2e4659;" elevation="5">
                 <div style="color: #ffffff; display: flex; align-items: center; text-align: center;">
                   <span style=" line-height: 1.5; font-size: var(--text-size-default); 
                   font-weight: 600; overflow: hidden; margin: 0; font: inherit; vertical-align: baseline; 
                   box-sizing: border-box;   ">
                   <div style=" font-size: 15px;">
                     {{ selectedUSDTAddressName }}
                   </div>
                   </span>
                   <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />
 
                 </div>
               </v-card>
             </div>
           </template>
           <!-- USDT Address List -->
           <v-list elevation="5" style="background-color: #15212c; color: #ffffff; min-width: 100px;
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
            <div class="rounded" style="flex: 1; display: flex; justify-content: center; align-items: center;">
              <v-card v-bind="props" :ripple="false" class="rounded pa-4" style="cursor: pointer; height: 48px; display: flex; align-items: center; background-color: #2e4659;" elevation="5">
                <div style="color: #ffffff; display: flex; align-items: center; text-align: center;">
                  <span style=" line-height: 1.5; font-size: var(--text-size-default); 
                  font-weight: 600; overflow: hidden; margin: 0; font: inherit; vertical-align: baseline; 
                  box-sizing: border-box;   ">
                  <div style=" font-size: 15px;">
                    {{ selectedETHAddressName }}
                  </div>
                  </span>
                  <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

                </div>
              </v-card>
            </div>
          </template>
          <!-- USDT Address List -->
          <v-list elevation="5" style="background-color: #15212c; color: #ffffff; min-width: 100px;
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
     <div>


    <WithdrawId></WithdrawId>


</div>
 </template>
 
 <script>
 import { ref, computed, watch } from 'vue';
   import { useStore } from 'vuex';
   import WithdrawId from '@/components/DepositComp/WithdrawId.vue';

 
   export default {
    components: {
      WithdrawId,
    },
     setup() {
       const store = useStore();
       const selectedCurrency = ref(localStorage.getItem('selectedCurrency') || 'balanceusdt');
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
 
 watch(selectedCurrency, (newCurrency) => {
   // Store the selected currency in localStorage
   localStorage.setItem('selectedCurrency', newCurrency);
  
 });
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
       return {

       selectedCurrencyName,
       selectedUSDTAddress,
       selectedETHAddress,
       selectedCurrency,
       getCurrencyImagePath, 
       getCurrencyImagePath2,
       selectCurrency,
       selectUSDTAddress,
       selectETHAddress,
       selectedUSDTAddressName,
       selectedETHAddressName,
       };
     },
   };
 </script>


<style>



</style>
