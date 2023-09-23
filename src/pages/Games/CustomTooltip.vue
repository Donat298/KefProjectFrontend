<template>
    <div v-if="showTooltip" class="tooltip">
      Bet exceeds your balance
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showTooltip: Boolean,
    },
  };
  </script>
  
  <style scoped>
  .tooltip {
    position: absolute;
    background-color: red;
    color: white;
    padding: 5px;
    border-radius: 4px;
    top: -30px; /* Adjust the distance from the input */
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1; /* Ensure the tooltip appears above the input */
  }
  </style>
  