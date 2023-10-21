<template>
  <div>
    <v-card elevation="5" style="background-color: #15212c00">
      <input
        :disabled="processing"
        v-focus
        class="inputbet"
        style="padding: 0px 15px"
        :style="{ borderColor: invalid ? 'red' : '', opacity: processing ? 0.8 : 1 }"
        type="number"
        inputmode="numeric"
        :value="numericValue"
        @input="updateNumericValue($event.target.value)"
        @keyup="updateSliderFromInput"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BetInput",
  props: {
    invalid: Boolean,
    processing: Boolean,
    modelValue: Number,// Change the type of the prop to Number
  },
  emits: ["update:modelValue"],
  computed: {
    
    numericValue: {
      get() {
        // Ensure that modelValue is a valid number, and return it as a Number
        return isNaN(this.modelValue) ? 0 : this.modelValue;
      },
      set(value) {
        this.updateNumericValue(value);
      },
    },
  },
  methods: {
    updateNumericValue(value) {
      this.$emit("update:modelValue", value); // Convert the string value back to a number
    },
  },
};
</script>

<style scoped>
.inputbet {
  width: 100%;
  height: 48px;
  background-color: #15212c;
  color: #ffffff;
  border-radius: 5px;
  border: 2px solid #2e4659; /* Add a default border color */
}
.inputbet:focus {
  border-color: #2e4659; /* Set the border color to green when focused */
  outline: none; /* Optionally, remove the default outline */
}
</style>




