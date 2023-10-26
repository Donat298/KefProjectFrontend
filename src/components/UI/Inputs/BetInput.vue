<template>
  <div>
    <v-card elevation="5" style="background-color: #15212c00">
      <input
        :disabled="processing"
        v-focus
        class="inputbet"
        style="padding: 0px 15px"
        :style="{ borderColor: invalid ? 'red' : '', opacity: processing ? 0.7 : 1 }"
        type="text"
        inputmode="numeric"
        :value="stringValue"
        @input="updateStringValue($event.target.value)"
        @keyup="updateSliderFromInput"
      />
    </v-card>
    <bet-slider :slider-value="numericValue"  :sliprocessing="processing" @update:slider-value="updateSliderValue">
    </bet-slider>

  </div>
</template>

<script>
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
    stringValue: {
      get() {
        return isNaN(this.modelValue) || this.modelValue === null ? "" : this.modelValue.toString();
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
      this.$emit("update:modelValue", value);
    },
    updateStringValue(value) {
      if (value === "") {
        this.updateNumericValue(null);
      } else if (!isNaN(parseFloat(value))) {
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

