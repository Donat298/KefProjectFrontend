<template>
  <div class="mx-auto widFh" style="width: 1200px; max-width: 90%; display: flex;
   flex-wrap: wrap; justify-content: center;">
       
  
        <div style="flex: 1; padding: 10px; background-color: #15212c; 
        border-radius: 7px;" class="betseto">
      <Canvastest> </Canvastest>
    
        </div>
      </div>
   
  </template>
  
  <script>
  import anime from 'animejs';
  import Canvastest from '@/pages/Tests/Canvastest.vue';
  export default {
    components: {
      Canvastest
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
  