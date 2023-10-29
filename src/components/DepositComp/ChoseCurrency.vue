<template>
      <v-menu location="bottom center"  transition="slide-y-transition">          
          <template v-slot:activator="{ props }">
 
      <div v-bind="props" class="left-rounded pa-4"  style="  cursor: pointer; 
        height: 46px;   display: flex; align-items: center; color: #ffffff;">

                            
{{ $store.getters.userDetail[selectedCurrency] }}

<img style="margin-left: 10px;  width: 22px; " :src="getCurrencyImagePath(selectedCurrency)" />
<font-awesome-icon style="color: #ffffff;height: 14px; margin-left: 10px;" :icon="['fas', 'chevron-down']" />

</div>  

          </template>
<v-list
elevation="7" 
:ripple="false"
style=" 
visibility: visible;
opacity: 1;
background-color: #15212c;
color: #ffffff;
margin-top: 10px; 
min-width: 100px;
" 
>

<v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balanceeur }}
  
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceeur')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      EUR
    </div>

</div>
</v-list-item>




<v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;"  :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balancebtc }}

    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balancebtc')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      BTC
    </div>

</div>
</v-list-item>


<v-list-item @click="selectCurrency('balanceusdt')" style="height: 40px; align-items: center;" :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balanceusdt }}
 
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceusdt')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      USDT
    </div>
 
</div>
</v-list-item>

<v-list-item @click="selectCurrency('balanceeth')" style="height: 40px;
align-items: center;"  :ripple="false">
<div class="hhdd"> <!-- Add align-items: center; here -->
  {{ $store.getters.userDetail.balanceeth }}

    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceeth')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      ETH
    </div>

</div>
</v-list-item>
</v-list>
  
        </v-menu>
</template>
<script>
export default {
data() {
    return {
      selectedCurrency: this.$store.getters.selectedCurrency,
      selectedCurrencyImages: { 
        'balanceusdt': require('@/assets/Cryptologos/tether-usdt-logo.svg'),
        'balanceeur': require('@/assets/Cryptologos/euro-logo.svg'),
        'balancebtc': require('@/assets/Cryptologos/Currency=btc.svg'),
        'balanceeth': require('@/assets/Cryptologos/Currency=Ethereum.svg'),
      },
    };  
  },
  computed: {
    // Add a computed property to watch for changes in selectedCurrency
    watchSelectedCurrency() {
      return this.$store.getters.selectedCurrency;
    },
  },
  watch: {
    // Watch for changes in watchSelectedCurrency and update selectedCurrency
    watchSelectedCurrency(newCurrency) {
      this.selectedCurrency = newCurrency;
    },
  },
  
methods: {
  selectCurrency(currencyKey) {
    this.selectedCurrency = currencyKey;
    this.selectedCurrencyImage = this.selectedCurrencyImages[currencyKey];

    this.$store.commit('setSelectedCurrency', currencyKey);
  },
  getCurrencyImagePath(currencyKey){
    return this.selectedCurrencyImages[currencyKey];
  },
},
};
</script>