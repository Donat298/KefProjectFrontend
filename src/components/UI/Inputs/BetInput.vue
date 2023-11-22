<template>
  <div>
    <v-card elevation="5" style=" border-radius: 8px; align-items: center;  display: flex; background-color: #bd323200">
   
      <img
        :src="currencyImage"
        style="width: 17px; height: 17px; right: 10px; position: absolute;"
      />

      <input  
        :disabled="processing"
        v-focus
        class="inputbet"
        style="padding: 0px 15px"
        :style="{ borderColor: invalid ? 'red' : '', opacity: processing ? 0.7 : 1 }"
        type="number"
        :value="stringValue"
        @input="updateStringValue($event.target.value)"
        @keyup="updateSliderFromInput"
      />

    </v-card>
    <bet-slider
      :slider-value="numericValue"
      :sliprocessing="processing"
      @update:slider-value="updateSliderValue"
    >
    </bet-slider>
  </div>
</template>

<script>

const selectedCurrencyImages = {
  balanceusdt: require('@/assets/Cryptologos/tether-usdt-logo.svg'),
  balanceeur: require('@/assets/Cryptologos/euro-logo.svg'),
  balancebtc: require('@/assets/Cryptologos/Currency=btc.svg'),
  balanceeth: require('@/assets/Cryptologos/Currency=Ethereum.svg'),
};

export default {
  name: "BetInput",
  props: {
    invalid: Boolean,
    processing: Boolean,
    modelValue: {
      type: Number,
      default: null,
    },
  },
  computed: {
    currencyImage() {
      const currencyKey = this.$store.getters.selectedCurrency; // Assuming you have a getter for selectedCurrency
      return selectedCurrencyImages[currencyKey];
    },
    stringValue: {
      get() {
        return isNaN(this.modelValue) || this.modelValue === null ? "0" : this.modelValue.toString();
      },
      set(value) {
        this.updateNumericValue(value);
      },
    },
    numericValue: {
      get() {
        return isNaN(this.modelValue) || this.modelValue === null ? 0 : parseFloat(this.modelValue);
      },
      set(value) {
        this.updateNumericValue(value);
      },
    },
  },
  methods: {
    updateNumericValue(value) {
      if (value === "") {
        value = null; // Convert an empty string to null
      }
      this.$emit("update:modelValue", value);
    },
    updateStringValue(value) {
      if (!isNaN(parseFloat(value))) {
        this.updateNumericValue(parseFloat(value));
      }
    },
    updateSliderValue(sliderValue) {
      this.numericValue = sliderValue;
    },
    updateSliderFromInput() {
      this.$emit("update:sliderValue", this.numericValue);
    },
  },
};
</script>


<style scoped>
.inputbet {
  width: 100%;
  height: 46px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 8px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputbet:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}
</style>

