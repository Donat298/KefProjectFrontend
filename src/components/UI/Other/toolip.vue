
<template>
    <div class="tooltip-container">
      <div v-if="showTooltip2" class="tooltip">
        <div class="tooltip-content">
          {{ text }}
        </div>
        <div class="tooltip-arrow"></div>
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'tool-tip',
    props: {
      text: String,
      showTooltip2: Boolean, // Prop to receive the showTooltip2 value from the parent
    },
    computed: {
      showTooltip() {
        // Use the prop value to conditionally render the tooltip
        return this.showTooltip2;
      },
    },
  };
  </script>
  
  <style scoped>
  .tooltip-container {
    position: relative;
    display: inline-block;
    z-index: 1;
   max-width: 400px;
  }
  
  .tooltip {
    position: absolute;
    background-color: #fff;
    color: #333;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    margin-right: auto;
   width: 80%;


    bottom: 100%; /* Position above the element */
    left: 50%;
    max-width: 90%;
  
    transform: translateX(-50%);
  }
  
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent; /* Remove this line */
    border-bottom: 10px solid #ffffff; /* Add this line to create the arrow at the bottom */
    /* Position at the bottom of the tooltip */
    left: 50%;
    margin-top: 9px;
    transform: translateX(-50%) rotate(180deg);
  }
  
  .tooltip-content {
    padding: 5px;
    white-space: normal; /* Allow text to wrap to the next line */
    overflow-wrap: break-word; /* Allow text to break and wrap onto the next line */
    text-align: center;
  }
  

  </style>
  