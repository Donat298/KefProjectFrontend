//ChoseCurrency.vue
<template>
      <v-menu location="bottom center"  transition="slide-y-transition">          
          <template v-slot:activator="{ props }">
    <div class="rounded"   style=" flex: 1; display: flex; 
     justify-content: center; align-items: center; ">
      <div v-bind="props" class="left-rounded pa-4"  style="  cursor: pointer; 
        height: 48px;   display: flex; align-items: center;" elevation="0">
<div style="color: #ffffff;  display: flex; align-items: center; text-align: center;">
<span style="max-width: 12ch; line-height: 1.5;     font-size: var(--text-size-default); font-weight: 600;
  overflow: hidden;
     margin: 0;
  font: inherit;
  vertical-align: baseline; box-sizing: border-box;">
{{ $store.getters.userDetail[selectedCurrency] }}
</span>
<img style="margin-left: 10px;  width: 22px; " :src="getCurrencyImagePath(selectedCurrency)" />
<fa icon="fa-solid fa-chevron-down" style="color: #ffffff;height: 14px; margin-left: 10px;"></fa>
</div>
</div>  
</div>
          </template>
<v-list
elevation="5"
:ripple="false"
style=" 
visibility: visible;
opacity: 1;
background-color: #1d2f3f;
color: #ffffff;
margin-top: 10px;
min-width: 100px;
" 
>

<v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balanceeur }}
  <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 25px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceeur')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      EUR
    </div>
  </div>
</div>
</v-list-item>




<v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;"  :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balancebtc }}
  <div class="ml-2 hhpp" >
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 25px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balancebtc')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      BTC
    </div>
  </div>
</div>
</v-list-item>


<v-list-item @click="selectCurrency('balanceusdt')" style="height: 40px; align-items: center;" :ripple="false">
<div class="hhdd" >
  {{ $store.getters.userDetail.balanceusdt }}
  <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 25px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceusdt')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      USDT
    </div>
  </div>
</div>
</v-list-item>

<v-list-item @click="selectCurrency('balanceeth')" style="height: 40px;
align-items: center;"  :ripple="false">
<div class="hhdd"> <!-- Add align-items: center; here -->
  {{ $store.getters.userDetail.balanceeth }}
  <div class="ml-2 hhpp" >
    <img 
      style="display: flex; align-items: center; 
      width: 22px; max-height: 25px; margin-left: 15px;" 
      :src="getCurrencyImagePath('balanceeth')" 
    />
    <div class="ml-2" style="min-width: 60px; ">
      ETH
    </div>
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