
<template>
  <transition name="slide">
    <v-card v-if="showSnackbar" class="custom-snackbar">
      <div style="margin-right: 20px;">
        <font-awesome-icon style="color: #ffffff;" :icon="['fas', 'wallet']" />
      </div>
      <div class="snackbar-content">
        <div>
          <span style="display: inline-block;"> {{ data.message }}</span>
          <span style="display: flex;">
            {{ data.amount }} {{ selectedCurrencyName }}
            <v-img
              style="
                align-self: center;
                max-width: 22px; 
                max-height: 22px;
                margin-left: 5px;
              "
              :src="selectedCurrencyImages[data.currency]"
              v-if="selectedCurrencyImages[data.currency]"
            ></v-img>
          </span>
        </div>
      </div>
      <button class="snackbar-action" @click="closeSnackbar">Close</button>
    </v-card>
  </transition>
</template>
 
<script>


export default {
  name: 'my-snackbar',
  data() {
    return {
      showSnackbar: false,
      data: {},
    };
  },
  computed: {
    selectedCurrencyImages() {
      return {
        balanceusdt: require('@/assets/Cryptologos/tether-usdt-logo.svg'),
        balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
        balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
        balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
      };
    },
    selectedCurrencyName() {
      const currencyCode = this.data.currency;
      switch (currencyCode) {
        case 'balanceusdt':
          return 'USDT';
        case 'balanceeur':
          return 'EURO';
        case 'balancebtc':
          return 'BTC';
        case 'balanceeth':
          return 'ETH';
        default:
          return '';
      }
    },
  },
  methods: {
    openSnackbar(data) {

      this.data = data;
      this.showSnackbar = true;

      if (this.snackbarTimeout) {
        // Clear the previous timeout if it exists
        clearTimeout(this.snackbarTimeout);
      }

      // Automatically close the snackbar after 3 seconds
      this.snackbarTimeout = setTimeout(() => {
        this.closeSnackbar();
      }, 6000);
    },
    closeSnackbar() {
      this.showSnackbar = false;
      this.data = {};
      clearTimeout(this.snackbarTimeout); // Clear the timeout when closing manually
    },
  },
};
</script>


<style scoped>

.custom-snackbar {
 
  margin-top: 30px;

  background-color: #37556b;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 6px 6px 0px rgb(99, 254, 202);

  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
  width: 330px;
  max-height: 100px;
  z-index: 5; 

}


.slide-leave-active {
  transition: transform 0.6s cubic-bezier(.87,0,1,.6);
}


.slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(200%); /* Start off-screen to the right */
}

/* Reverse the animation for slide-leave and slide-enter-to */

.slide-enter-active {
 
  transition: transform 0.6s cubic-bezier(0,.4,.12,1);
}


.slide-enter-to /* .slide-enter-active in <2.1.8 */ {
  transform: translateX(0%); /* Slide out to the left */
}

.slide-enter-from {
    transform: translateX(200%); /* Start off-screen to the right */
}

.snackbar-content {
  flex-grow: 1;
  overflow: hidden;
  display: flex; justify-content: flex-end; align-items: center;
  font-size: 17px;

}

.snackbar-action {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  margin-left: 10px;
}
</style>
