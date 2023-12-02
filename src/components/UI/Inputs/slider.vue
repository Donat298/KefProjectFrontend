<template>
  <div style="margin: 15px 0px;">
    <input
      :style="{ opacity: sliprocessing ? 0.7 : 1 }"
      :disabled="sliprocessing"
      type="range"
      min="0"
      max="40"
      :value="computedSliderValue"
      @input="updateSliderColor"
      class="bet-slider"
    />
  </div>
</template>


<script>
export default {
  name: 'bet-slider',

  props: {
    sliderValue: Number,
    sliprocessing: Boolean,
  },
  computed: {
    computedSliderValue() {
  
      if (isNaN(this.computedAmount)) {
        return 0;
      }
      if (this.computedAmount === 0) {
        return 0;
      }
    
  
      return (this.sliderValue * 40) / this.computedAmount;
    },
 
    computedAmount() {
      const selectedCurrency = this.$store.getters.selectedCurrency;
      const amount = this.$store.getters.userDetail[selectedCurrency];
      return isNaN(amount) ? 0 : amount; // If amount is NaN, set computedAmount to 0
    },
  },
  watch: {
    sliprocessing() {
   
      this.updateSliderGradient(this.computedSliderValue);
    },
    computedAmount(newValue) {
      // Do something when watchValue changes
      // Call the function you need here
      this.updateSliderGradient(this.computedSliderValue);
    },
    
    computedSliderValue: 'updateSliderGradient',

  }, 
  methods: {

 
    

    updateSliderColor() {
      const slider = document.querySelector('.bet-slider');
      const minValue = slider.min - (0.05 * (slider.max - slider.min));
      const maxValue = slider.max - (-0.05 * slider.max);
      const value = slider.value;
      const slivalue = Math.floor(value * this.computedAmount / 40 * 100) / 100; // Round down to two decimal places

      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      const backgroundColor = `linear-gradient(to right, #37556b ${percentage}%, #15212c ${percentage}%)`;
      slider.style.background = backgroundColor;

      this.$emit('update:sliderValue', slivalue);
    },
    updateSliderGradient(value) {
      const slider = document.querySelector('.bet-slider');
      const minValue = slider.min - (0.05 * (slider.max - slider.min));
      const maxValue = slider.max - (-0.05 * slider.max);

      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      const backgroundColor = `linear-gradient(to right, #37556b ${percentage}%, #15212c ${percentage}%)`;
      slider.style.background = backgroundColor;
    },
  },
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
