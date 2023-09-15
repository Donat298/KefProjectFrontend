<template>
    <div class="jja" @click.stop="$emit('HideDepositOknoo')" style="
   width: 100%; overflow-y: auto; ">
       <div @click.stop="$emit('HideDepositOknoo')" style="           
          max-height: 90%; width: 100%; overflow-y: auto;">
        <div @click.stop  style="background-color: #1d2f3f; border-radius: 10px; 
     max-width: 90%;     
        margin: auto; max-height: 90%;  width: 515px;">
          <div
  class="d-flex align-center"
  elevation="0"
  style="background-color: #1d2f3f; width: auto; overflow-x: auto;
   padding: 15px 10px; margin-left: 10px; margin-right: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px"
>
  <v-btn
  @click="selectedComponent = 'Deposit'"
    elevation="4"
    class="glow-button"
    :ripple="false"
    style="color: #ffffff; display: flex; flex-direction: column; align-items: center; text-align: center; flex-grow: 1; flex-shrink: 1;"
  >
    <span style="color: #ffffff; font-size: 13px;">Deposit</span>
  </v-btn>

  <v-btn
  @click="selectedComponent = 'Withdraw'"
    elevation="4"
    class="glow-button "
    :ripple="false"
    style="margin-inline: 10px; flex-grow: 1; flex-shrink: 1;"
  >
    <span style="color: #ffffff; font-size: 13px;">Withdraw</span>
  </v-btn>

  <v-btn
  @click="selectedComponent = 'BuyCrypto'"
    elevation="4"
    class="glow-button "
    :ripple="false"

    style="flex-grow: 1; flex-shrink: 1;"
  >
    <span style="color: #ffffff; font-size: 13px;">Buy crypto</span>
  </v-btn>
</div>

      <div style=" background-color: #1d2f3f; padding: 0px 0px 20px 0px; 
      margin-left: 10px; margin-right: 10px; border-radius: 10px;">
        <component :is="selectedComponent" />
      </div >

    </div>
        </div>  
        </div>

  </template> 
  <script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import Deposit from '@/components/DepositComp/Deposit.vue';
import ChoseCurrency from '@/components/DepositComp/ChoseCurrency.vue';
import Withdraw from '@/components/DepositComp/Withdraw.vue';
import BuyCrypto from '@/components/DepositComp/BuyCrypto.vue'
  export default {
    components: {
    Fa, Deposit,  ChoseCurrency , Withdraw, BuyCrypto
  },
    data() {
      return {
        showDepositComponent: true,
        isResolutionBelowThreshold: window.innerWidth < 900,
        codeSnippet: 'TWX3X61vd76HHdh36t1QLZciZfqa4Na1za',
        selectedComponent: 'Deposit',
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
  position: fixed;    display: flex;    align-items: center;     justify-content: center;
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
  background-color: #2e4659;
  color: #ffffff;
  min-height: 64px;
  width: 100%;
  transition: transform 0.3s,;
  z-index: 0;
  width: 155px; min-width: 110px;
}
.glow-button:hover {
  transform: scale(1.02);
}
.v-btn:hover > .v-btn__overlay {
  background-color: none !important;
}
  </style>