<template>
  <div style="margin: 10px 0px;">
    <input
      type="range"
      min="0"
      max="40"
      :value="computedSliderValue"
      @input="updateSliderColor"
      class="bet-slider"
    />
    <div style="color: aliceblue;">

  </div>
  </div>
</template>

<script>
export default {
  name: 'bet-slider',
 data() {
    return {
      amount: 85.4,

    };
  },
  props: {
    sliderValue: Number,
  },

 computed: {
    computedSliderValue() {
      // Calculate the modified value for the slider
      return (this.sliderValue * 40) / this.amount;
    },
  },


  watch: {
    computedSliderValue: 'updateSliderGradient',
  },
  
  methods: {
        updateSliderColor() {
      const slider = document.querySelector('.bet-slider');
      const minValue = slider.min - (0.05 * (slider.max - slider.min));
      const maxValue = slider.max - (-0.05 * slider.max);
      const value = slider.value;
      const slivalue = (value * this.amount / 40).toFixed(2); // Round to two decimal places

      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      const backgroundColor = `linear-gradient(to right, #37556b ${percentage}%, #15212c ${percentage}%)`;
      slider.style.background = backgroundColor;

      // Emit an event to update the parent component with the rounded value
      this.$emit('update:sliderValue', slivalue);
    },

    updateSliderGradient(value) {
      const slider = document.querySelector('.bet-slider');
      const minValue = slider.min - (0.05 * (slider.max - slider.min));
      const maxValue = slider.max - (-0.05 * (slider.max));

      const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
      const backgroundColor = `linear-gradient(to right, #37556b ${percentage}%, #15212c ${percentage}%)`;
      slider.style.background = backgroundColor;
    },
  },
};
</script>

Can you round slivalue if its for example 3.333 then it will be 3.33 and if its 35.555 then it will be 35.55


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
