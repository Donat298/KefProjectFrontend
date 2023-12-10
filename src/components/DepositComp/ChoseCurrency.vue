<template>
      <v-menu location="bottom center"  transition="slide-y-transition">          
          <template v-slot:activator="{ props }">
 
      <div v-bind="props" class="pa-4 selectcurrency" >

                            
{{ $store.getters.userDetail[selectedCurrency] }}

<img style="margin: 10px;  width: 22px; user-select: none; " :src="getCurrencyImagePath(selectedCurrency)" />
<font-awesome-icon style="color: #ffffff;height: 14px; " :icon="['fas', 'chevron-down']" />

</div>  

          </template>


<v-list
elevation="7" 
:ripple="false"
style=" 
background-color: #15212c;
border: 2px solid #2e4659; 
color: #ffffff;
margin-top: 10px; 
min-width: 100px;
" 
>

<v-list-item 
      v-for="currency in currencies" 
      :key="currency.code"
      @click="selectCurrency(currency.code)" 
      style="height: 40px; align-items: center;" 
      :ripple="false"
    >
      <div class="hhdd">
        {{ $store.getters.userDetail[currency.code] }}
        <img 
          class="imginlist"
          :src="getCurrencyImagePath(currency.code)" 
        />
        <div style="min-width: 60px;">
          {{ currency.name }}
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
        'balanceusdt': require('@/assets/Cryptologos/usdt.svg'),
        'balanceeur': require('@/assets/Cryptologos/euro-logo.svg'),
        'balancebtc': require('@/assets/Cryptologos/Currency=btc.svg'),
        'balanceeth': require('@/assets/Cryptologos/Currency=Ethereum.svg'),
      },
      currencies: [
        { name: 'EUR', code: 'balanceeur' },
        { name: 'BTC', code: 'balancebtc' },
        { name: 'USDT', code: 'balanceusdt' },
        { name: 'ETH', code: 'balanceeth' },
      ],
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

<style>

.imginlist{
  display: flex; align-items: center; 
      width: 22px; max-height: 22px; margin: 15px;
      user-select: none; 

}
.selectcurrency{
  cursor: pointer; 
height: 46px;  justify-content: center; display: flex; align-items: center; color: #ffffff;
}



</style>