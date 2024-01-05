<template>
   
    <div style="display: flex;">
     <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto;
        background-color: #15212c00; padding: 10px;">
    <v-menu location="bottom center" transition="slide-y-transition">
    <!-- Activator -->
    <template v-slot:activator="{ props }">
           
     <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart"  elevation="5">
  
                
                  <p style=" font-size: 15px; color: #ffffff;">
                    {{ $store.getters.userDetail[selectedCurrency] }}
                 </p>
           
                 <img style="margin: 10px; width: 22px;" :src="getCurrencyImagePath(selectedCurrency)" />
                 <font-awesome-icon style="color: #ffffff;height: 14px;" :icon="['fas', 'chevron-down']" />
  
            
             </v-card>
       
         </template>
         <!-- Currency List -->
         <v-list elevation="7" 
           class="vliststandart" style="background-color: #15212c;">
           <!-- EUR -->
           <v-list-item v-for="currency in currencies" 
               :key="currency.name" @click="selectCurrency(currency.balanceKey)" style="height: 40px; align-items: center;" :ripple="false">
         <div class="hhdd">
           {{ $store.getters.userDetail[currency.balanceKey] }}
           <img class="imginlist" :src="getCurrencyImagePath(currency.balanceKey)" />
           <div class="ml-2" style="min-width: 60px; font-size: 15px;">{{ currency.name }}</div>
         </div>
   </v-list-item>
         </v-list>
       </v-menu>
  
  
  
  

       </v-card>
     </div>
  
  
  
  
  
    <div style="padding:0px 10px; color: #ffffff;">
  
    <p style="font-size: 17px;"> Name </p>
  
  
    <input
       v-model="message1"
       class="inputadress"
       style="padding: 0px 15px; margin-bottom: 20px;"
       :style="{ borderColor: hasError || errorMsg == 'Recipient username and amount required' ? 'red' : '' }"
     />
  
  
  
     <div style="justify-content: center; 
   display: flex;
  ">
     <toolip :showTooltip2="showTooltip2" style="width: 100%;" 
     text="The amount cannot be more than your balance."></toolip>
   </div>
  
  
     <p style="font-size: 17px;">
      Amount {{ selectedCurrencyName }} 
     </p>
  
   <div style="position: relative; align-items: center;  display: flex;
  "> 
    
    <img 
    style="width: 17px; height: 17px; user-select: none;
      right: 10px; position: absolute;" :src="getCurrencyImagePath(selectedCurrency)" />
  
  <input
    v-model="message2"
    class="inputtipnumber" 
    style="padding: 0px 15px; "
    type="number"
    inputmode="numeric"
    :style="{ borderColor: isInputInvalid || (!hasError && errorMsg &&
     errorMsg !== 'A deposit request can only be made once per 1 min') 
         || errorMsg == 'Recipient username and amount required'
          ? 'red' : '' }"
  >
     
    
   </div>
  
   <div style=" height: 40px; display: flex; align-items: center; justify-content: center;">
     <div v-if="errorMsg"
      
          style="color: red;">{{ errorMsg }}
     </div>
   </div>
   
   
  
  
  </div>
  
    
  <v-btn
      class="mx-auto"
  
      @click="sendTip"
      
      elevation="7"
      :ripple="false"
      :disabled="isButtonDisabled"
         :style="buttonStyle" 
      style="display: flex;"
    >
      <span style="color: #ffffff; font-size: 13px;">   {{ buttonText }}</span>
    </v-btn>
  
   
    <div   
    style="border-radius: 5px; word-break: break-word; white-space: pre-wrap; color: #ffffff;
     font-size: 12px;padding: 5px; margin-top: 8%; text-align: center; background-color: #15212c;">
  
     <span style="color: rgba(240, 255, 255, 0.294);"> If you have any questions please contact us by email.
  
  supercryptomegagames@gmail.com</span>
     
   </div>
  
  </template>
  
  
  <script>
  import store from '@/store'; 
  import { ref, watch ,computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useApiPrivate } from '../../utils/useApi';
  import { balanceFieldsMap } from '@/store/constants';
  import toolip from '@/components/UI/Other/toolip.vue';
  import CustomSnackbar from '@/components/UI/Other/snackbar.vue';
  export default {
   emits: ['cSWi'],
   components: {
     toolip, CustomSnackbar
   },
   data() {
     return {
       isInputInvalid: false,
       showTooltip2: false,
       currencies: [
         { name: 'BTC', balanceKey: 'balancebtc' },
         { name: 'USDT', balanceKey: 'balanceusdt' },
         { name: 'EUROC', balanceKey: 'balanceeuroc' },
         { name: 'ETH', balanceKey: 'balanceeth' },
          { name: 'LTC', balanceKey: 'balanceltc' },
          { name: 'BNB', balanceKey: 'balancebnb' },
          { name: 'DOGE', balanceKey: 'balancedoge' },
          { name: 'USDC', balanceKey: 'balanceusdc' },
          { name: 'BCH', balanceKey: 'balancebch' },
          { name: 'ADA', balanceKey: 'balanceada' },
          { name: 'MATIC', balanceKey: 'balancematic' },
          { name: 'TRX', balanceKey: 'balancetrx' },
         
       ]
     };
   },
   computed: {
     hasError() {
       return (this.errorMsg == 'Recipient not found'
       || this.errorMsg == 'Recipient username required'  || this.errorMsg == 'You cannot tip yourself');
     },
   },
   watch: {
     message2(newValue) {
       this.checkInputValidity(newValue);
     },
     message1(newValue) {
       if (newValue.trim() !== '') {
         this.errorMsg = false;
       }
     },
     '$store.getters.selectedCurrency': {
        handler() {
          this.checkInputValidity(this.message2);
        },
        deep: true,
      },
  
   },
  
  
   methods: {
     checkInputValidity(value) {
       if (value < 0 || store.getters.userDetail[store.getters.selectedCurrency] < value) {
         this.isInputInvalid = true;
         this.showTooltip2 = true;
         this.errorMsg = false;
       } else {
         this.isInputInvalid = false;
         this.showTooltip2 = false;
         this.errorMsg = false;
       }
     },
     
    
   },
  
  setup(props, context) {
  const store = useStore();
  const axiosPrivateInstance = useApiPrivate(store);
  const errorMsg = ref('');
  const router = useRouter();
  const userId = ref(store.getters.userDetail._id);
  const message1 = ref('');
  const message2 = ref('');
  const isButtonDisabled = ref(false);
  const buttonText = ref('Make a tip');
  const buttonStyle = ref({
       backgroundColor: '#1E88E5', // Default background color
       opacity: 1, // Default opacity
     });
  const selectedCurrencyName = computed(() => {
       switch (selectedCurrency.value) {
          case 'balanceusdt':
           return 'USDT';
          case 'balanceeuroc':
            return 'EUROC';
          case 'balancebtc':
            return 'BTC';
          case 'balanceeth':
            return 'ETH';
          case 'balanceltc':
            return 'LTC';
          case 'balancebnb':
            return 'BNB';
          case 'balancedoge':
            return 'DOGE';
          case 'balanceusdc':
            return 'USDC';
          case 'balancebch':
            return 'BCH';
          case 'balanceada':
            return 'ADA';
          case 'balancematic':
            return 'MATIC';
          case 'balancetrx':
            return 'TRX';
         default:
           return '';
       }
     }); 
  // Initialize the selected networks with empty strings

  

  
  const initialSelectedCurrency = localStorage.getItem('selectedCurrency') || 'balanceusdt';
  const selectedCurrency = ref(initialSelectedCurrency);
  
  
  
  const checkAuthentication = () => { 
    if (!store.getters.isAuthenticated) {
      router.push('/auth/register');
      return false;
    }
    return true;
  };
  watch(selectedCurrency, (newCurrency) => {
    // Store the selected currency in localStorage
    localStorage.setItem('selectedCurrency', newCurrency);
    
  });
  const selectCurrency = (currency) => {
    selectedCurrency.value = currency;
    store.commit('setSelectedCurrency', currency);
  };
  
  const selectedCurrencyImages = {
    balanceusdt: require('@/assets/Cryptologos/usdt.svg'),
    balanceeuroc: require('@/assets/Cryptologos/euro-logo.svg'),
        balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
        balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
        balanceltc: require('@/assets/Cryptologos/lite.svg'),
        balancebnb: require('@/assets/Cryptologos/bnb.svg'),
        balancedoge: require('@/assets/Cryptologos/doge.svg'),
        balanceusdc: require('@/assets/Cryptologos/usdc.svg'),
        balancebch: require('@/assets/Cryptologos/btccash.svg'),
        balanceada: require('@/assets/Cryptologos/ada.svg'),
        balancematic: require('@/assets/Cryptologos/matic.svg'),
        balancetrx: require('@/assets/Cryptologos/trx.svg'),
   };
  
  
  
   const getCurrencyImagePath = (currency) => {
     return selectedCurrencyImages[currency];
   };
  
  

  
  // Function to save selected values to localStorage

  const sendTip = async () => {
   if (!checkAuthentication()) return;
  
   try {
  
  
     const requestBody = {
       userId: userId.value,
       message1: message1.value,
       message2: message2.value,
       currency: selectedCurrency.value,
     };
     buttonText.value = 'Tip Sent!';
     isButtonDisabled.value = true;
     buttonStyle.value = {
       ...buttonStyle.value,
       opacity: 0.5, // Adjust opacity for the fade-out effect
     };

     const response = await axiosPrivateInstance.post('/users/tip', requestBody);
  
     const amountTipRaw = response.data.amount;
    const amountTip = Math.floor(amountTipRaw * 1e8) / 1e8; // Truncate to 8 decimal places
    const TipCurrency = store.getters.selectedCurrency;
    const recipient = response.data.recipient;
  
  
   // Emit the "cSWi" event along with the amount and currency withdrawn

        context.emit("cSWi", { amount: amountTip, currency: TipCurrency, recipient: recipient,
        message: "Your tip was completed for the", });
        
  
     const currency = balanceFieldsMap[store.getters.selectedCurrency];
     store.dispatch('updateBalance', { currency: currency, amount: response.data.balance,  });
  
     // Update button state and message

  
     setTimeout(() => {
       isButtonDisabled.value = false;
       buttonText.value = 'Make a tip';
       // Reset the button opacity
       buttonStyle.value = {
         ...buttonStyle.value,
         opacity: 1,
       };
     }, 60000); 
  
     errorMsg.value = ''; // Clear any previous error messages
   } catch (error) {
     errorMsg.value = error.response.data.message;
  
     // Reset button state and message on error
     isButtonDisabled.value = false;
     buttonText.value = 'Make a tip';
     buttonStyle.value = {
       ...buttonStyle.value,
       opacity: 1,
     };
   }
  };
  
  
  
  
  return {
    sendTip,
    errorMsg,
    message1,
    message2,
    selectedCurrency,

    isButtonDisabled,
    buttonText,
    selectCurrency,
    getCurrencyImagePath, 
    selectedCurrencyName,
    buttonStyle,
    
  };
  },
  };
  </script>
  
  
  
  
  
  
  
  
  
  <style scoped>
  
  .vmenustandart{
  color: #ffffff;
   cursor: pointer; height: 48px; display: flex; align-items: center;
           background-color: #2e4659; user-select: none;
  }
  
  
  .imginlist{
   display: flex; align-items: center; 
       width: 22px; max-height: 22px; margin-left: 15px;
       user-select: none; 
  
  }
  .listitemadress{
    height: 40px; align-items: center;
  }
  .vliststandart{
   border: 2px solid #2e4659;  color: #ffffff; min-width: 100px;
             margin-top: 10px; max-height: 250px; overflow-y: auto;
  }
  .inputadress {
  width: 100%;
  height: 42px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
  }
  
  
  .inputadress:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
  }
  
  .inputtipnumber {
  width: 100%;
  height: 42px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
  }
  .inputtipnumber:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  }
  ::-webkit-scrollbar {
  width: 5px;
  
  
  
  }
  </style>