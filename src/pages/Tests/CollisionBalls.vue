<template>
  <div :style="{ 'margin-top': isWideScreen ? '40px' : '5px', 'margin-bottom': isWideScreen ? '80px' : '10px' }" class="mx-auto widFh" 
  style="width: 1200px;   max-width: 90%; display: flex;
   flex-wrap: wrap; justify-content: center;">
       
  
        <div style="flex: 1; padding: 10px; background-color: #15212c; 
        border-radius: 7px;" class="betseto">
      <Canvastest> </Canvastest>
    
        </div>
      </div>
      <bottom-info></bottom-info>
  </template>
  
  <script>

  import Canvastest from '@/pages/Tests/Canvastest.vue';
  export default {
    components: {
      Canvastest
    },
    data() {
    return {
      isWideScreen: false, 
    };
  },
    methods: {
      checkScreenWidth() {
        this.isWideScreen = window.innerWidth > 800; // Set the isWideScreen data property to true if the screen width is greater than 800px
      },
    },


  mounted() {
    this.checkScreenWidth(); // Call the function to check screen width on mount
    window.addEventListener('resize', this.checkScreenWidth); // Listen for screen resize
    } ,
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth); // Clean up the event listener
  },
 
  };
  </script>
  
  <style scoped>
  @media (max-width: 800px) {
    .bet-div {
      width: 100% !important;
      order: 2;
      border-radius: 0px 0px 7px 7px !important;
      max-width: 100% !important;
    }
    .betseto {
      order: 1;
      border-radius: 7px 7px 0px 0px !important;
    }
    .bet-form {
      flex-direction: column;
      display: flex;
      align-items: center;
    }
    .widFh {
      max-width: 95% !important;
    }
  }
  </style>
  