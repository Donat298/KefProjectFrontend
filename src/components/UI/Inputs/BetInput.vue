<template>
    <div>
        <v-card elevation="5" style="background-color: #15212c00">
            <input
                :disabled="processing"
                v-focus
                class="inputbet"
                style="padding: 0px 15px"
                :style="{ borderColor: invalid ? 'red' : '' },{ opacity: processing ? 0.8 : 1 }"
                type="number"
                inputmode="numeric"
                :value="modelValue"
                aaavalue="betAmount"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup="updateSliderFromInput"
            />
        </v-card>

        <bet-slider
      style="margin-top: 10px"
      :maxBet="maxBet"
      :value="parseFloat(modelValue)"
      @input="modelValue = $event.target.value.toString()"
      @
    ></bet-slider>
    <!--bet-slider
      style="margin-top: 10px"
      :maxBet="maxBet"
      v-model="modelValue"
    ></bet-slider-->

    </div>
</template>

<script>
export default {
    name: "BetInput",
    props: {
        invalid: Boolean,
        processing: Boolean,
        modelValue: String,
    },
    emits: ["update:modelValue"],
    computed: {
        maxBet() {
        return this.$store.getters.userDetail.balancebtc;
        },
/*    betAmount: {
      get() {
        return parseFloat(this.modelValue);
      },
      set(value) {
        this.$emit('update:modelValue', value.toString);
      },
    },*/
  },
  methods: {
    updateSliderFromInput() {
/*        console.log("updateSliderFromInput=%s", this.modelValue);
      // Update the slider value when the input is changed
      const slider = document.querySelector(".bet-slider");
      const minValue = slider.min;
      const maxValue = slider.max;
      const input = parseFloat(this.modelValue);

      slider.

      // Calculate the value as a percentage and update the slider
      const percentage = ((input - minValue) / (maxValue - minValue)) * 100;
      console.log("percentage=%s", percentage);
      slider.value = percentage;*/
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
