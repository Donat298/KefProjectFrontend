<template>
   
   <div style="display: flex;">
    <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto;
       background-color: #15212c00; padding: 10px;">
   <v-menu location="bottom center" transition="slide-y-transition">
   <!-- Activator -->
   <template v-slot:activator="{ props }">
          
    <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart mr-2"  elevation="5">

               
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
      <!-- USDT Address Selection (Conditional) -->

 
 <v-menu v-model="isUsdtNetworkMenuOpen"
 v-if="selectedCurrency === 'balanceusdt'" location="bottom center" transition="slide-y-transition">
   <!-- Activator -->
       <template v-slot:activator="{ props }">
        <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart" 
         elevation="5">
          
               <div style=" font-size: 15px; color: #ffffff;">
                 {{ selectedUsdtNetwork  }}
               </div>
          
               <font-awesome-icon style="color: #ffffff; height: 14px;
                margin-left: 10px;" :icon="['fas', 'chevron-down']" />

           </v-card>
     
       </template>
       <!-- USDT Address List -->
       <v-list elevation="5" style="background-color: #15212c;" class="vliststandart">
         <v-list-item @click="selectNetwork('ETH')" style="height: 40px; align-items: 
         center;" :ripple="false">
       <p style="  font-size: 15px;">
             ETH - Ethereum (ERC20)
           </p>
         </v-list-item>
         <v-list-item @click="selectNetwork('BSC')" style="height: 40px; align-items: center;" :ripple="false">
          
            <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
      
         </v-list-item>
         <v-list-item @click="selectNetwork('POLYGON')" style="height: 40px; align-items: center;" :ripple="false">
          
          <p style="  font-size: 15px;">POLYGON - Matic</p>
    
       </v-list-item>
       </v-list>
     </v-menu>


 <v-menu class="ethnetworksmenu" v-if="selectedCurrency === 'balanceeth'"
  location="bottom center" transition="slide-y-transition">

  <template v-slot:activator="{ props }">
    <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart" 
         elevation="5">
       
      
               <div style=" font-size: 15px; color:#ffffff;">
                 {{ selectedEthNetwork  }}
               </div>
     
               <font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

   
           </v-card>
     
       </template>
       <!-- USDT Address List -->
       <v-list elevation="5" style="background-color: #15212c;"  class="vliststandart"> 
        <v-list-item @click="selectNetwork('ETH')" style="height: 40px; align-items: 
         center;" :ripple="false">
       <p style="  font-size: 15px;">
             ETH - Ethereum (ERC20)
           </p>
         </v-list-item>
         <v-list-item @click="selectNetwork('BSC')"  style="height: 40px; align-items: center;" :ripple="false">
          
            <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>
      
         </v-list-item>
      
       </v-list>
     </v-menu>
      </v-card>
    </div>





   <div style="padding:0px 10px; color: #ffffff;">

   <p style="font-size: 17px;">  Address {{ selectedCurrencyName }} </p>


   <input
      v-model="message1"
      class="inputadress"
      style="padding: 0px 15px; margin-bottom: 20px;"
      :style="{ borderColor: hasError ? 'red' : '' }"
    />



    <div style="justify-content: center; 
  display: flex;
">
    <toolip :showTooltip2="showTooltip2" style="width: 100%;" 
    text="The amount cannot be more than your balance."></toolip>
  </div>


    <p style="font-size: 17px;">
     Amount <span style="color: rgba(240, 255, 255, 0.294);">(The transaction fee will be 1%)</span>
  
    </p>

  <div style="position: relative; align-items: center;  display: flex;
"> 
   
   <img 
   style="width: 17px; height: 17px;
     right: 10px; position: absolute;" :src="getCurrencyImagePath(selectedCurrency)" />

   <input
     v-model="message2"
     class="inputwithdrawnumber" 
     style="padding: 0px 15px; "
     type="number"
     inputmode="numeric"
     :style="{ borderColor: isInputInvalid || errorMsg == 'Invalid withdrawal amount' || 
     errorMsg == 'Address and amount required.' || errorMsg == 'Insufficient balance for withdrawal' ? 'red' : '' }"
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

     @click="sendWithdrawal"
     
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
        { name: 'EUR', balanceKey: 'balanceeur' },
        { name: 'BTC', balanceKey: 'balancebtc' },
        { name: 'USDT', balanceKey: 'balanceusdt' },
        { name: 'ETH', balanceKey: 'balanceeth' },
      ]
    };
  },
  computed: {
    hasError() {
      return (this.errorMsg == 'Address and amount required.' || this.errorMsg == 'Address required.');
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
 const selectedNetwork = ref(''); // Initialize it with an empty string
 const userId = ref(store.getters.userDetail._id);
 const message1 = ref('');
 const message2 = ref('');
 const isButtonDisabled = ref(false);
 const buttonText = ref('Made a withdrawal');
 const buttonStyle = ref({
      backgroundColor: '#1E88E5', // Default background color
      opacity: 1, // Default opacity
    });
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
 // Initialize the selected networks with empty strings
 const selectedUsdtNetwork = ref('');
 const selectedEthNetwork = ref('');

 // Check local storage for existing values or use 'BSC' as default
 const initialSelectedUsdtNetwork = localStorage.getItem('selectedUsdtNetwork') || 'BSC';
 const initialSelectedEthNetwork = localStorage.getItem('selectedEthNetwork') || 'BSC';

 // Assign the initial values to the selected networks
 selectedUsdtNetwork.value = initialSelectedUsdtNetwork;
 selectedEthNetwork.value = initialSelectedEthNetwork;

 const initialSelectedCurrency = localStorage.getItem('selectedCurrency') || 'BSC';
 const selectedCurrency = ref(initialSelectedCurrency);
 const isUsdtNetworkMenuOpen = ref(false);

 
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

  const getCurrencyImagePath = (currency) => {
    return selectedCurrencyImages[currency];
  };
  const getCurrencyImagePath2 = (currency) => {
    return selectedCurrencyImages2[currency];
  };

 const selectNetwork = (network) => {
   if (selectedCurrency.value === 'balanceusdt' || selectedCurrency.value === 'balanceeth') {
     if (selectedCurrency.value === 'balanceusdt') {
       selectedUsdtNetwork.value = network;
     } else if (selectedCurrency.value === 'balanceeth') {
       selectedEthNetwork.value = network;
     }
     saveToLocalStorage();
   }
 };

 // Function to save selected values to localStorage
 const saveToLocalStorage = () => {
   localStorage.setItem('selectedCurrency', selectedCurrency.value);
   localStorage.setItem('selectedUsdtNetwork', selectedUsdtNetwork.value);
   localStorage.setItem('selectedEthNetwork', selectedEthNetwork.value);
 };

 const sendWithdrawal = async () => {
  if (!checkAuthentication()) return;

  try {
    const balanceFieldsMap = {
      'balanceusdt': 'usdt',
      'balanceeur': 'eur',
      'balancebtc': 'btc',
      'balanceeth': 'eth',
    };

    const requestBody = {
      userId: userId.value,
      message1: message1.value,
      message2: message2.value,
      currency: selectedCurrency.value,
    };

    // Check if the selected currency supports a network
    if (selectedCurrency.value === 'balanceusdt') {
      requestBody.selectedNetwork = selectedUsdtNetwork.value;
    } else if (selectedCurrency.value === 'balanceeth') {
      requestBody.selectedNetwork = selectedEthNetwork.value;
    }

    const response = await axiosPrivateInstance.post('/users/withdraw', requestBody);

    const amountWithdrawn = response.data.amount;
    const withdrawalCurrency = store.getters.selectedCurrency;
   


  // Emit the "cSWi" event along with the amount and currency withdrawn
    context.emit("cSWi", { amount: amountWithdrawn, currency: withdrawalCurrency, 
      message: "Your withdrawal was completed for the", });


    const currency = balanceFieldsMap[store.getters.selectedCurrency];
    store.dispatch('updateBalance', { currency: currency, amount: response.data.balance,  });

    // Update button state and message
    buttonText.value = 'Withdrawal Sent!';
    isButtonDisabled.value = true;
    buttonStyle.value = {
      ...buttonStyle.value,
      opacity: 0.5, // Adjust opacity for the fade-out effect
    };

    setTimeout(() => {
      isButtonDisabled.value = false;
      buttonText.value = 'Make a withdrawal';
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
    buttonText.value = 'Make a withdrawal';
    buttonStyle.value = {
      ...buttonStyle.value,
      opacity: 1,
    };
  }
};




 return {
   sendWithdrawal,
   errorMsg,
   message1,
   message2,
   selectedCurrency,
   selectedNetwork,
   isButtonDisabled,
   buttonText,
   selectCurrency,
   selectNetwork,
   getCurrencyImagePath, 
   getCurrencyImagePath2,
   isUsdtNetworkMenuOpen,
   selectedUsdtNetwork,
   selectedEthNetwork, 
   saveToLocalStorage,
   selectedCurrencyName,
   buttonStyle,
   
 };
},
};
</script>









<style>

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


.vliststandart{
 border: 2px solid #2e4659;  color: #ffffff; min-width: 100px;
           margin-top: 10px;
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

.inputwithdrawnumber {
width: 100%;
height: 42px;
background-color: #15212c;
color: #ffffff;
border-radius: 5px;
border: 2px solid #2e4659; /* Add a default border color */
}
.inputwithdrawnumber:focus {
border-color: #2e4659; /* Set the border color to green when focused */
outline: none; /* Optionally, remove the default outline */
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
-webkit-appearance: none;
appearance: none;
margin: 0;
}

</style>