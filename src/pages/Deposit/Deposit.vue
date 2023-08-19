<template>
  
    <div class="jja" @click.stop="$emit('HideDepositOknoo')">
    
 


       <div v-if="showDepositComponent" @click.stop="$emit('HideDepositOknoo')" style="
          max-height: 90%;
          width: 100%;
          overflow-y:auto; ">

  
          <div @click.stop style="       
          max-height: 90%;
           width: 800px;
          min-height: 50px;       
          box-sizing: border-box;       
          margin: auto;">   
          
      <v-card
        elevation="0"
        
         
       
        rounded="lg"
        style="background-color: rgb(37, 56, 74);  width: 800px;" 
      >
   
      <div style="display: flex;">
      <div style="background-color: rgb(37, 56, 74);  width: 20%; ">
        <v-list-item  class=" pl-4"  style="color: #ffffff; height: 64px " 
             >Deposit</v-list-item>
           <v-list-item  class=" pl-4"  style="color: #ffffff; height: 64px " 
            >Withdraw</v-list-item>
           <v-list-item  class=" pl-4" style="color: #ffffff;height: 64px" 
             >Buy Crypto</v-list-item>
           
      </div>  
      
      
  
      <div style="width: 80%;  background-color: #213141; padding: 20px 10px;">
        
        <div style="position: relative;">
          <v-img class="mx-auto" style="max-width:200px" src="@/assets/CryptoQrcodes/TetherErc20.png" />
    <v-card
      color="#213141"
      style="height: 120px; display: flex; align-items: center; justify-content: center; background-color:#213141"
      elevation="0"
    >
      <v-card elevation="7" class="pa-2 pl-4" style="background-color: rgb(37, 56, 74); color:#ffffff; display: flex; align-items: center;">
        TWX3X61vd76HHdh36t1QLZciZfqa4Na1za
        <v-btn size="large"
          :ripple="false"
          elevation="0"
          icon="mdi-content-copy"
          class="ml-2"
          style=" background-color: rgb(37, 56, 74);"
          @click="copyCode(); showCopiedTooltip()"
        ></v-btn>
      </v-card>
      <v-card v-if="showTooltip" class="custom-tooltip">Copied</v-card>
    </v-card>
  </div>
      </div >
    </div>
      </v-card>
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
      style="background-color: rgb(37, 56, 74);  margin-left: auto; margin-right: auto; " 
      >
  
     
      <div style="background-color: rgb(37, 56, 74);  align-items: center;  padding: 20px 10px; ">
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
  import MDeposit from "@/components/DepositPages/MDeposit.vue";
  import DepoNavig from "@/components/DepositPages/DepoNavig.vue";
  export default {
    components: { MDeposit, DepoNavig },
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
      navigator.clipboard.writeText(this.codeSnippet).then(() => {
        
       
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
  z-index: 1000; /* High z-index to be on top */
}



  </style>