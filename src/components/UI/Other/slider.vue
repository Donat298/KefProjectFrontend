<template>
  <div>
    <input
      type="range"
      min="0"
      :max="maxBet"
      v-model="betAmount"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bet-slider"
      aaastyle="linear-gradient(to right, #37556b ${{percentage}}%, #15212c ${{percentage}}%)"
    />
  </div>
</template>

<script>
export default {
  name: "bet-slider",
  props: {
    maxBet: Number,
    value: Number, 

  },
  data() {
    return {
      betAmount: this.value,
    };
  },
 /* computed: {
    percentage() {
        return ((this.betAmount - 0) / (this.maxBet - 0)) * 100;
        },
      },
  methods: {
    updateSliderColor() {
      const slider = document.querySelector(".bet-slider");
      const minValue = slider.min;
      const maxValue = slider.max;
      const value = slider.value;

      // Calculate the percentage of the value in the range
      const percentage = ((this.betAmount - minValue) / (maxValue - minValue)) * 100;

      // Set the background color based on the percentage
      const backgroundColor = `linear-gradient(to right, #37556b ${percentage}%, #15212c ${percentage}%)`;
      slider.style.background = backgroundColor;
    },
  },*/
};
</script>

<style scoped>
.bet-slider {
  width: 100%;
  height: 10px;
  background: linear-gradient(to right, #37556b 0%, #15212c 0%);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 5px;
}

.bet-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #15212c;
  border: 2px solid #2e4659;
  border-radius: 50%;
  cursor: pointer;
}

.bet-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #15212c;
  border: 2px solid #2e4659;
  border-radius: 50%;
  cursor: pointer;
}
</style>