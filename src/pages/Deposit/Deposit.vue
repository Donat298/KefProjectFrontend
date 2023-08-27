<template>
  
    <div class="jja" @click.stop="$emit('HideDepositOknoo')">
       <div v-if="showDepositComponent" @click.stop="$emit('HideDepositOknoo')" style="
          max-height: 90%;
   
          overflow-y:auto; ">

  
          <div @click.stop style="       
          max-height: 90%;
     
          min-height: 50px;       
          box-sizing: border-box;       
          margin: auto;">   
          
        <div style="background-color: #213141; border-radius: 10px;">
  <div
    class="d-flex align-center justify-center"
    elevation="0"
    style="background-color: #213141 ; width: auto; padding: 20px 10px; border-top-left-radius: 10px; 
     border-top-right-radius: 10px"
  >
    <v-btn
      elevation="4"
      class=" glow-button"
      :ripple="false"
      style="margin: 0 10px;" 
    >
      Deposit
    </v-btn>
    <v-btn
      elevation="4"
      class=" glow-button"
      :ripple="false"
      style="margin: 0 10px;"
    >
      Withdraw
    </v-btn>
    <v-btn
      elevation="4"
      class=" glow-button"
      :ripple="false"
      style="margin: 0 10px;"
    >
      Buy crypto
    </v-btn>
  </div>
      
  
      <div style=" background-color: #213141; padding: 20px 10px; border-radius: 10px;">
        
        <div style="position: relative;">
          <v-img class="mx-auto" style="max-width:200px" src="@/assets/CryptoQrcodes/TetherErc20.png" />
          
    <v-card
      color="#213141"
      style="height: 120px; display: flex; align-items: center; justify-content: center; background-color:#213141"
      elevation="0"
    >
 
      <v-card elevation="5" class="pa-2 pl-4" style=" background-color: rgb(37, 56, 74); color:#ffffff; display: flex; align-items: center;">
        TWX3X61vd76HHdh36t1QLZciZfqa4Na1za
        <button
    :disabled="showTooltip" 
    class="ml-2 copied-button"
    :class="{ 'copied-icon': showTooltip }"
    :style="{ backgroundColor: showTooltip ? 'rgb(37, 56, 74)' : 'rgb(37, 56, 74)' }"
    @click="copyCode(); showCopiedTooltip()"
  >
    <fa :icon="showTooltip ? 'check' : 'copy'" class="mx-auto" style="color: #ffffff;"></fa>
  </button>
      </v-card>

    </v-card>
  </div>
      </div >

    </div>
        </div>  
        </div>
  
        <div v-if="showDepositComponent === false" @click.stop="$emit('HideAccountOknoo')"
        style=" overflow-y:auto; max-height: 90%; width: 100%; ">
          <div @click.stop style="
         
  
         
     
          width: 300px;
          margin: auto;
          
          align-items: center;
          min-height: 50px;
          max-width: 90%;
          
          margin: auto;">  
      <v-card  
      elevation="0"  
      rounded="lg"
      style="background-color: #213141;  margin-left: auto; margin-right: auto; " 
      >
  
     
      <div style="background-color: #213141;  align-items: center;  padding: 20px 10px; ">
          <div style="margin: auto; display: flex;">
        <v-avatar 
          style="margin-left: auto; margin-right: auto;"
          color="white"
          size="70"
          rounded="lg"      
        >
        <v-icon  icon="mdi-account" size="xx-large"></v-icon>     
        </v-avatar>
      </div>
     
      <div style="color: #ffffff;   margin-top: 10px; text-align: center;">
          {{ $store.getters.userDetail.username }}     
        </div> 
        <div style="color: #ffffff;  text-align: center;">
          {{ $store.getters.userDetail.email }}     
        </div> 
        
             
      </div>  
  
      
  
      <div style="width: 50%; background-color: #213141; padding: 20px 10px;
       width: 100%;">
        <v-card
          color="#213141"
          style=" height: 70px; display: flex; align-items: center; justify-content: center;"
          elevation="0"  
          >
          
          <p class="text-center" style="color: #ffffff; display: flex; height: 44px; align-items: center;
                   height: 64px;">
      {{ $store.getters.userDetail.balance }} USDT
      <img style="width: 25px; height: 25px; margin-left: 5px;" :src="require('@/assets/Tether.svg')" />
  </p>   
        </v-card>

      </div >
      </v-card>
          </div> 
        </div>
  
  
 
  </div>

  </template>
  
  <script>

import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
  export default {
    components: {
    Fa
  },
    data() {
      return {
        showDepositComponent: true,
        isResolutionBelowThreshold: window.innerWidth < 900,
        codeSnippet: 'TWX3X61vd76HHdh36t1QLZciZfqa4Na1za',
        
        showTooltip: false,
      tooltipEnabled: true,
      }
    },
    mounted() {
      this.handleResize()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        const screenWidth = window.innerWidth
        const isBelowThreshold = screenWidth < 900
  
        if (isBelowThreshold) {
          this.showDepositComponent = false;
        } else {
          this.showDepositComponent = true;
        }
      },
      copyCode() {
      if (this.showTooltip) return; // Prevent copying while tooltip is shown
      navigator.clipboard.writeText(this.codeSnippet).then(() => {
        this.showTooltip = true;
        setTimeout(() => {
          this.showTooltip = false;
        }, 2000); // Reset to the initial state after 2 seconds
      });
    },
    showCopiedTooltip() {
      if (!this.tooltipEnabled) return;

      this.showTooltip = true;
      this.tooltipEnabled = false;

      setTimeout(() => {
        this.showTooltip = false;
        this.tooltipEnabled = true;
      }, 2000); // 2 seconds
    },
  },
    


 
  }
  </script>
  
  

  
  <style scoped>
  .jja {
  
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  
  position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
  z-index: 4;
  } 
  
  ::-webkit-scrollbar {
    width: 5px;
    
    
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #15212c;
    border-radius: 30px;  
    margin-block: 15px;
    
    
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2c4257;
    border-radius: 30px;
  }

  .custom-tooltip {
  position: absolute;
  top: 10px; /* Adjust this value as needed */
  right: 115px; /* Adjust this value as needed */
  background-color: #616161;
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
z-index: 1000;
}
.copied-button {
  border: none;

  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  font-size: 20px; /* Adjust the font size to make the icon larger */
  color: white;
  outline: none;
}



.glow-button {
  overflow: hidden;
  background-color: rgb(37, 56, 74);
  color: #ffffff;
  height: 64px;
  width: 100%;
  transition: transform 0.3s,;
  z-index: 0;
  width: 200px;
}



.glow-button:hover {
  transform: scale(1.02);

}



  </style>