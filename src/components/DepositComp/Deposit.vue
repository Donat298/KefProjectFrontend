<template>
 
    <!-- Currency Selector -->
    <div style="display: flex;">
      <v-card elevation="0" class="mx-auto" style="display: flex; overflow-x: auto;
       background-color: #15212c00; padding: 10px;">
        <v-menu style="" location="bottom center" transition="slide-y-transition">
          <!-- Activator -->
          <template v-slot:activator="{ props }">
  
              <v-card v-bind="props" :ripple="false" class="rounded pa-4 vmenustandart"  elevation="5">
          
             
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

   

        <v-menu  v-if="selectedCurrency === 'balanceusdt' || selectedCurrency === 'balanceeth' || 
        selectedCurrency === 'balancebnb' || selectedCurrency === 'balanceusdc' || selectedCurrency === 'balancematic' "
        location="bottom center" transition="slide-y-transition">
          <template v-slot:activator="{ props }">
           <v-card v-bind="props" :ripple="false" class="rounded pa-4 ml-2 vmenustandart" 
         elevation="5">
                  <div v-if="selectedCurrency === 'balanceusdt'" style=" font-size: 15px; color: #ffffff;">
                    {{ selectedUSDTAddressName }}
                  </div> 
                  <div v-if="selectedCurrency === 'balanceeth'" style=" font-size: 15px; color: #ffffff;">
                    {{ selectedETHAddressName }}
                  </div>   
                  <div v-if="selectedCurrency === 'balancebnb'" style=" font-size: 15px; color: #ffffff;">
                    {{ selectedBNBAddressName }}
                  </div>
                  <div v-if="selectedCurrency === 'balanceusdc'" style=" font-size: 15px; color: #ffffff;">
                    {{ selectedUSDCAddressName }}
                  </div> 
                  <div v-if="selectedCurrency === 'balancematic'" style=" font-size: 15px; color: #ffffff;">
                    {{ selectedMATICAddressName }}
                  </div>            
                  <font-awesome-icon style="color: #ffffff;height: 14px; 
                  margin-left: 10px;" :icon="['fas', 'chevron-down']" />
              </v-card>
          </template>
          <v-list v-if="selectedCurrency === 'balanceusdt'" elevation="5" style="background-color: #15212c;" class="vliststandart">

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
          <v-list v-if="selectedCurrency === 'balanceeth'" elevation="5" style="background-color: #15212c;"  class="vliststandart">
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
          <v-list v-if="selectedCurrency === 'balancebnb'" elevation="5" style="background-color: #15212c;"  class="vliststandart">
            <v-list-item @click="selecteBNBAddress('bnbaddress1')"  class="listitemadress"
          :ripple="false">
          <p style="  font-size: 15px;">
            BSC - BNB Smart Chain (BEP20)
              </p>
            </v-list-item>
          </v-list>
          <v-list v-if="selectedCurrency === 'balanceusdc'" elevation="5" style="background-color: #15212c;" class="vliststandart">

<v-list-item @click="selecteUSDCAddress('usdcaddress1')" class="listitemadress"

:ripple="false">
<p style="  font-size: 15px;">
    ETH - Ethereum (ERC20)
  </p>
</v-list-item>
<v-list-item @click="selecteUSDCAddress('usdcaddress2')" class="listitemadress"
:ripple="false">
 
   <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>

</v-list-item>
<v-list-item @click="selecteUSDCAddress('usdcaddress3')" class="listitemadress"
:ripple="false">
 
 <p style="  font-size: 15px;">POLYGON - Matic</p>

</v-list-item>
          </v-list>
          <v-list v-if="selectedCurrency === 'balancematic'" elevation="5" style="background-color: #15212c;" class="vliststandart">

<v-list-item @click="selecteMATICAddress('maticaddress1')" class="listitemadress"

:ripple="false">
<p style="  font-size: 15px;">
    ETH - Ethereum (ERC20)
  </p>
</v-list-item>
<v-list-item @click="selecteMATICAddress('maticaddress2')" class="listitemadress"
:ripple="false">
 
   <p style="  font-size: 15px;"> BSC - BNB Smart Chain (BEP20)</p>

</v-list-item>
<v-list-item @click="selecteMATICAddress('maticaddress3')" class="listitemadress"
:ripple="false">
 
 <p style="  font-size: 15px;">POLYGON - Matic</p>

</v-list-item>
          </v-list>
         
        
        </v-menu>
      </v-card>
    </div>

    <div style="position: relative;
   margin:20px auto;">


   <div class="mx-auto" style="display: flex; justify-content: center; align-items: center; height: 150px; width: 150px; background-color: rgb(255, 255, 255);">
<QrcodeVue :size="120" :value="selectedCurrencyAddress"></QrcodeVue>
</div>


     


   
   
   <!--
   <div style="display: flex; justify-content: center; align-items: center; height: 200px; width: 200px; background-color: rgb(255, 255, 255);">

0x766d52c847106794deb077f4db5b236c99589218

0x766d52c847106794deb077f4db5b236c99589218



    <v-img class="mx-auto" :class="{ 'blur-image': isBlurred }" style="   width: 150px; height: 150px;"
     :src="getCurrencyImagePath2(selectedCurrency)" />
     
     <button v-if="isBlurred"
    :ripple="false"
    style=" 
    background-color: #2e465900; position: absolute; display: flex;
     align-items: center; justify-content: center;
    top: 50%; left: 50%; padding: 10px;  transform: translate(-50%, -50%);"
    @click="copyAddress(); isBlurred = false; "
  >
  <v-icon style="color: #ffffff; font-size: 40px;"
          icon="mdi-eye mx-auto"
        ></v-icon>
       
  </button>

-->

    </div>
 
    <div class="mx-auto" style="display: flex; padding: 10px; overflow-x: auto;">
      <v-card elevation="5" class="pa-2 pl-4 mx-auto vmenustandart" >

        <v-card elevation="0" 
        style="background-color: #2e4659; color: #ffffff;
         display: flex; align-items: center; max-width: 300px;
 ">

  {{ selectedCurrencyAddress }}
</v-card>
        <button @click="copyAddress();  showCopiedTooltip()"  :disabled="showTooltip" 
        class="copied-button ml-2" :class="{ 'copied-icon': showTooltip }"
         :style="{ backgroundColor: showTooltip ? '#2e4659' : '#2e4659' }" style="min-width: 32px;
           min-height: 32px;  ">
       
          <font-awesome-icon v-if="!showTooltip" style="color: #ffffff;height: 16px; " :icon="['fas', 'copy']" />
          <font-awesome-icon v-if="showTooltip" style="color: #ffffff;height: 16px; " :icon="['fas', 'check']" />
        </button>
      </v-card>
    </div>

    <DepositId :adress="selectedCurrencyAddressName" :copyadresspressed="copyadresspressed"></DepositId>
  
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed, watch } from 'vue';
import DepositId from '@/components/DepositComp/DepositId.vue';
import QrcodeVue from 'qrcode.vue';

export default {
  emits: ['cSWi', 'HideDeposit'],
  components: {
    DepositId, QrcodeVue
  }, 
    

  data() {
    return {
      currencies: [
        { name: 'BTC', code: 'balancebtc' },
        { name: 'USDT', code: 'balanceusdt' },
        { name: 'ETH', code: 'balanceeth' },
        { name: 'BNB', code: 'balancebnb' },
        { name: 'EUROC', code: 'balanceeuroc'},
 
        { name: 'LTC', code: 'balanceltc' },
      
        { name: 'DOGE', code: 'balancedoge' },
        { name: 'USDC', code: 'balanceusdc' },
        { name: 'BCH', code: 'balancebch' },
        { name: 'ADA', code: 'balanceada' },
        { name: 'MATIC', code: 'balancematic' },
        { name: 'TRX', code: 'balancetrx' },
      ],

  
    };
  },

  setup() {
    const store = useStore();
    const selectedCurrency = ref(localStorage.getItem('selectedCurrency') || 'balanceusdt');
    const showTooltip = ref(false);
    const copyadresspressed = ref(false);
    const isBlurred = ref(true);

    const selectedCurrencyName = computed(() => {
      switch (selectedCurrency.value) {
        case 'balancebtc':
          return 'BTC';
        case 'balanceusdt':
          return 'USDT';
          case 'balanceeth':
          return 'ETH';
          case 'balancebnb':
          return 'BNB';
        case 'balanceeuroc':
          return 'EUROC';
  
   
        case 'balanceltc':
          return 'LTC';
    
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
    const selectedUSDTAddress = ref(localStorage.getItem('selectedUSDTAddress') || 'usdtaddress2');
    const selectedETHAddress = ref(localStorage.getItem('selectedETHAddress') || 'ethaddress2');
    const selectedBNBAddress = ref(localStorage.getItem('selectedBNBAddress') || 'bnbaddress2');
    const selectedUSDCAddress = ref(localStorage.getItem('selectedUSDCAddress') || 'usdcaddress2');
    const selectedMATICAddress = ref(localStorage.getItem('selectedMATICAddress') || 'maticaddress2');
    const selectedCurrencyAddress = computed(() => {
    
    
 
        return getCurrencyAddress(selectedCurrency.value);
 
    });
    const selectedCurrencyAddressName = computed(() => {
      if (selectedCurrency.value === 'balanceusdt') {
        return selectedUSDTAddressName.value;
      }
      if (selectedCurrency.value === 'balanceeth') {
        return selectedETHAddressName.value;
      } 
      if (selectedCurrency.value === 'balancebnb') {
        return selectedBNBAddressName.value;
      }
      if (selectedCurrency.value === 'balanceusdc') {
        return selectedUSDCAddressName.value;
      }
      if (selectedCurrency.value === 'balancematic') {
        return selectedMATICAddressName.value;
      }
      else {
        return "";
      }
    });


    const selectedUSDTAddressName = computed(() => {
      switch (selectedUSDTAddress.value) {
        case 'usdtaddress1':
          return 'ETH';
        case 'usdtaddress2':
          return 'BSC';
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
          return 'BSC';
        default:
          return '';
      }
    });

    const selectedBNBAddressName = computed(() => {
      switch (selectedBNBAddress.value) {
        case 'bnbaddress1':
          return 'BSC';
        default:
          return '';
      }
    });

    const selectedUSDCAddressName = computed(() => {
      switch (selectedUSDCAddress.value) {
        case 'usdcaddress1':
          return 'ETH';
        case 'usdcaddress2':
          return 'BSC';
        case 'usdcaddress3':
          return 'POLYGON';
        default:
          return '';
      }
    });

    const selectedMATICAddressName = computed(() => {
      switch (selectedMATICAddress.value) {
        case 'maticaddress1':
          return 'ETH';
        case 'maticaddress2':
          return ' BSC';
        case 'maticaddress3':
          return 'POLYGON';
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

      // Set copyadresspressed.value to false only after all the other operations have been completed
      Promise.resolve().then(() => {
        copyadresspressed.value = false;
      });
    };

    // Function to show the copied tooltip
    const showCopiedTooltip = () => {
      
        showTooltip.value = true;
        setTimeout(() => {
          showTooltip.value = false;
    
        }, 1000); // Hide the tooltip after 1 second
     };


    watch(selectedCurrency, (newCurrency) => {

        if (newCurrency === 'balanceusdt') {
          selectedUSDTAddress.value = localStorage.getItem('selectedUSDTAddress') || 'usdtaddress2';
        }

        if (newCurrency === 'balanceeth') {
          selectedETHAddress.value = localStorage.getItem('selectedETHAddress') || 'ethaddress2';
        } 

        if (newCurrency === 'balancebnb') {
          selectedBNBAddress.value = localStorage.getItem('selectedBNBAddress') || 'bnbaddress1';
        }

        if (newCurrency === 'balanceusdc') {
          selectedUSDCAddress.value = localStorage.getItem('selectedUSDCAddress') || 'usdcaddress2';
        }

        if (newCurrency === 'balancematic') {
          selectedMATICAddress.value = localStorage.getItem('selectedMATICAddress') || 'maticaddress2';
        }

        else {
   
      
        }


      localStorage.setItem('selectedCurrency', newCurrency);
    });


    const selectCurrency = (currencyKey) => { 
      selectedCurrency.value = currencyKey;
      isBlurred.value = true;
      store.commit('setSelectedCurrency', currencyKey);
    };


    const selectUSDTAddress = (addressKey) => {
      selectedUSDTAddress.value = addressKey;
      localStorage.setItem('selectedUSDTAddress', addressKey);
      isBlurred.value = true;
    };
    const selectETHAddress = (addressKey) => {
      selectedETHAddress.value = addressKey;
      localStorage.setItem('selectedETHAddress', addressKey);
      isBlurred.value = true;
    };
    const selecteBNBAddress = (addressKey) => {
      selectedBNBAddress.value = addressKey;
      localStorage.setItem('selectedBNBAddress', addressKey);
      isBlurred.value = true;
    };
    const selecteUSDCAddress = (addressKey) => {
      selectedUSDCAddress.value = addressKey;
      localStorage.setItem('selectedUSDCAddress', addressKey);
      isBlurred.value = true;
    };
    const selecteMATICAddress = (addressKey) => {
      selectedMATICAddress.value = addressKey;
      localStorage.setItem('selectedMATICAddress', addressKey);
      isBlurred.value = true;
    };



    



  

    // Images for different currencies
    const selectedCurrencyImages = {
      balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
      balanceusdt: require('@/assets/Cryptologos/usdt.svg'),
      balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
      balancebnb: require('@/assets/Cryptologos/bnb.svg'),
      balanceeuroc: require('@/assets/Cryptologos/euro-logo.svg'),
  
      balanceltc: require('@/assets/Cryptologos/lite.svg'),

      balancedoge: require('@/assets/Cryptologos/doge.svg'),
      balanceusdc: require('@/assets/Cryptologos/usdc.svg'),
      balancebch: require('@/assets/Cryptologos/btccash.svg'),
      balanceada: require('@/assets/Cryptologos/ada.svg'),
      balancematic: require('@/assets/Cryptologos/matic.svg'),
      balancetrx: require('@/assets/Cryptologos/trx.svg'),

    };

    // Function to get the image path for the selected currency
    const getCurrencyImagePath = (currencyKey) => {
      return selectedCurrencyImages[currencyKey];
    };


    // Function to get the address for each currency
    const getCurrencyAddress = (currencyKey) => {
      switch (currencyKey) {
        case 'balancebtc':
        return '18KwuFLeDvHHrZawNFesTq2VznxWTCDzVr'
         // return store.state.btcaddress;
        case 'balanceusdt':
        return '0x9ae54108b060a244196605d803068a062d393df7';
          //return store.state.usdtaddress; // Use the selected USDT address
        case 'balanceeth':
        return '0x9ae54108b060a244196605d803068a062d393df7';
         // return store.state.usdtaddress;
        case 'balancebnb':
        return '0x9ae54108b060a244196605d803068a062d393df7';
        //  return store.state.usdtaddress;
        case 'balanceeuroc':
          return '0x9ae54108b060a244196605d803068a062d393df7';
  
      
        case 'balanceltc':
          return 'Lc4w9pBUHaBAhTh77imbYS9M1npGL3UtGH';
 
        case 'balancedoge':
          return 'D9jfrxf3UM6MBW5m8sq567ze8F6juv2a3Y';  
        case 'balanceusdc':
          return '0x9ae54108b060a244196605d803068a062d393df7';
        case 'balancebch':
          return '1Hg29n1XN5t3RyTzACXpFc5yGXE7Xn6svL';
        case 'balanceada':
          return 'addr1v8snfymyqqkwwf840yhsgwh3tkw4ht2896emf4fpzrqdpwqydfyew';
        case 'balancematic':
          return  '0x9ae54108b060a244196605d803068a062d393df7';
        case 'balancetrx':
          return 'TWX3X61vd76HHdh36t1QLZciZfqa4Na1za';
        default:
          return '';
      }
    };

    return {
      selectedCurrency,
      selectedCurrencyName,
      selectedCurrencyAddress,
      selectedCurrencyAddressName,
      selectedUSDTAddress,
      selectedETHAddress,
      selectedBNBAddress,
      selectedUSDCAddress,
      selectedMATICAddress,
      showTooltip,
      copyAddress,
      getCurrencyImagePath,
      selectCurrency,
      selectUSDTAddress,
      selectETHAddress,
      selecteBNBAddress,
      selecteUSDCAddress,
      selecteMATICAddress,
      showCopiedTooltip,
      selectedUSDTAddressName,
      selectedETHAddressName,
      selectedBNBAddressName,
      selectedUSDCAddressName,
      selectedMATICAddressName,
      copyadresspressed,
      isBlurred,
 
    };
  },
};
</script>


<style scoped>

.blur-image {
  filter: blur(10px);
  opacity: 0.5;
}
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

::-webkit-scrollbar {
width: 5px;



}

</style>



