<template>
    <div style="margin-top: 50px;">
      <h1>Crash game</h1>
    </div>
    <br>
    <v-card class="mx-auto d-flex align-center" style="background-color: #2e4659; width: 200px; height: 200px;">
      <h2 class="mx-auto text-center">{{ multiplier.toFixed(2) }}x</h2>
    </v-card>
    <br>
  
    <v-card title="Place your bet!" color="#2e4659" elevation="0" width="1200" class="bet-card mx-auto">
      <div class="bet-form">
        <v-btn elevation="4" variant="tonal" class="mt-4 mb-4 mr-2 ml-2" type="button"
          style="color: black; background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));" @click="crash">
          Crash
        </v-btn>
      </div>
      <div v-if="outcome !== null" class="outcome">
        <p>Outcome: {{ outcome.toFixed(2) }}x</p>
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        multiplier: 1.00,
        outcome: null,
      };
    },
    methods: {
      crash() {
        const serverSeed = "yourServerSeed"; // Replace with your actual server seed
        const clientSeed = "yourClientSeed"; // Replace with your actual client seed
        const nonce = "yourNonce"; // Replace with your actual nonce
  
        // Combine seeds and nonce
        const data = `${serverSeed}-${clientSeed}-${nonce}`;
  
        // Simulate hashing (for illustration purposes only)
        const hash = this.simpleHash(data); // Replace with a real cryptographic hash function
  
        // Simulate determining the outcome based on the hash
        this.outcome = this.calculateOutcome(hash); // Replace with your outcome calculation logic
      },
      simpleHash(data) {
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
          const char = data.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash &= hash; // Convert to 32bit integer
        }
        return hash;
      },
      calculateOutcome(hash) {
        // Simulate outcome calculation based on hash (for illustration purposes)
        return (hash % 10000) / 100; // Generate an outcome between 0.00 and 99.99
      },
    },
  };
  </script>
  

  <style scoped>
   .balance-card {
     height: 70px;
     display: flex; 
     align-items: center; 
     justify-content: center;
   }
   .text-center {
     color: #ffffff; 
     display: flex; 
     align-items: center; 
     justify-content: center;
   }
   .balance-icon {
     width: 25px; 
     margin-left: 5px;
   }
   .bet-card {
     display: flex; 
     color: #ffffff; 
     width: 1000px; 
     max-width: 90%; 
     flex-direction: column;
     margin-top: 30px;
     justify-content: center; 
     align-items: center;
   }
   .bet-form {
     width: 100%; 
     min-height: 100px; 
     background-color: rgba(255, 228, 196, 0); 
     display: flex; 
     align-items: center;  
     justify-content: center;
   }
   .submit-button {
     height: 50px; 
     width: 50px; 
     color: aquamarine; 
     background-color: #15212c;
   }
   .wheel {
     width: 200px;
     height: 200px;
     border-radius: 50%;
     overflow: hidden;
     display: flex;
     flex-direction: column;
     
     transition: transform 5s ease-out;
    
   }
   .half {
     flex: 1;
     display: flex;
     align-items: center;
     justify-content: center;
     color: white;
     font-weight: bold;
   }
   .win {
     background: green;
   }
   .lose {
     background: red;
   }
   
   </style>
   
   
   