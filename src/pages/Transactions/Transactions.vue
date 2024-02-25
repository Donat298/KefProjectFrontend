<template>
    <div :style="{ 'margin-top': isWideScreen ? '40px' : '5px', 'margin-bottom': isWideScreen ? '80px' : '10px' }" class="mx-auto widFh" 
      style="width: 1200px; max-width: 90%; display: flex; flex-wrap: wrap; justify-content: center;">
    
      <div style="flex: 1; padding: 10px; background-color: #15212c;
       border-radius: 7px; min-height: 300px;" class="transactions">
        <div v-for="(transaction, index) in transactionHistory" :key="index" 
          :class="{ 'transaction-item': true, 'alternate-color': index % 2 === 0 }"
          style="padding:25px; border-radius: 7px;"
        >
          {{ transaction.date }} - {{ transaction.description }} - <span style="color: rgb(0, 255, 0);"
          >{{ transaction.amount }}</span> usdt
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;
         justify-content: center;   text-align: center;  word-break: break-word;
 flex: 1; height: 100%; color: grey;">
  No transactions yet
</div>
      </div>
    </div>
    <bottom-info></bottom-info>
  </template>
  
  <script>

  export default {
    data() {
      return {
        isWideScreen: false, 
        transactionHistory: [
      
          // Add more transactions as needed
        ],
      };
    },
    methods: {
      checkScreenWidth() {
        this.isWideScreen = window.innerWidth > 800;
      },
    },
    mounted() {
      this.checkScreenWidth();
      window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenWidth);
    },
  };
  </script>
  
  <style scoped>
  @media (max-width: 800px) {
    .widFh {
      max-width: 95% !important;
    }
  }
  
  .alternate-color {
    background-color: #1d2f3f;
  }
  </style>
  