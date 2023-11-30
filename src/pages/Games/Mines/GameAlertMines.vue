<template>
  <div>
    <v-alert
      v-if="GameResult && GameResult.won && !errorMsg"  
      border="end"
      variant="tonal"  
      color="green-lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      <div style="display: flex; align-items: center; justify-content: center;">
       You won 
       <strong style="margin: 0px 5px;">{{ GameResult.wonMsg }}</strong> 
        <img
          :src="currencyImage"
          style="width: 17px; height: 17px; margin-right: 5px; "
        /> <strong>{{ GameResult.currency }}!</strong> 
      </div>
    </v-alert>

    <v-alert
      v-if="GameResult && GameResult.lose && !errorMsg" 
      border="end"
      variant="tonal"
      color="red lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      Better luck next time
    </v-alert>

    <v-alert
      v-if="errorMsg"
      border="end"
      variant="tonal"
      color="red lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

  
  <script>
  export default {
    data() {
        return {
          currencyImages: {
            usdt: require('@/assets/Cryptologos/usdt.svg'),
            eur: require('@/assets/Cryptologos/euro-logo.svg'),
            btc: require('@/assets/Cryptologos/Currency=btc.svg'),
            eth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
          },
        };
      },  
    props: {

      GameResult: {
        type: Object,
        required: false,
        default: null
      },
      errorMsg: {
        type: String,
        required: false,
        default: ''
      }
    },
    computed: {
        currencyImage() {
          return this.currencyImages[this.GameResult.currency];
        }
      }
    
  }
  </script>
  <style>
</style>
