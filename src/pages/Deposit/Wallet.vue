<template>
  <div class="jja" style="width: 100%; overflow-y: auto;">
    <div  style="max-height: 90%; width: 100%; overflow-y: auto;">
      <div @click.stop style="background-color: #1d2f3f; border-radius: 10px; max-width: 90%; margin: auto; max-height: 90%; width: 500px;">
        <div style="display: flex; justify-content: space-between; align-items: center;padding: 5px 10px 10px 10px; ">
          <div style="color: #ffffff; padding: 10px;">
            Wallet    <fa icon="fa-solid fa-wallet"></fa>
           
          </div>
       
            <button @click.stop="$emit('HideDepositOknoo')" style="cursor: pointer; 
             color: #ffffff;
            min-height: 35px;  min-width: 35px; ">
    
              <fa icon="ffa-solid fa-xmark"></fa>
            </button>
            
       
        </div>
       <div  elevation="0" style="background-color: #15212c;    ">
         <div style="overflow-x:
         auto;margin: 0px 10px 0px 10px;padding: 10px 10px; width: auto; "  class="d-flex align-center">
          <v-btn @click="selectedComponent = 'Deposit'" elevation="4" class="glow-button" :ripple="false" 
          style="color: #ffffff; display: flex; flex-direction: column; align-items: center; text-align: center; flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Deposit</span>
          </v-btn>

          <v-btn @click="selectedComponent = 'Withdraw'" elevation="4" class="glow-button" :ripple="false" style="margin-inline: 10px; flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Withdraw</span>
          </v-btn>

          <v-btn @click="selectedComponent = 'BuyCrypto'" elevation="4" class="glow-button" :ripple="false" style="flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Buy crypto</span>
          </v-btn>
        </div>
        </div>

        <div style="background-color: #1d2f3f; padding: 0px 0px 20px 0px; margin-left: 10px; margin-right: 10px; border-radius: 10px;">
          <component :is="selectedComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import Deposit from '@/components/DepositComp/Deposit.vue';
import Withdraw from '@/components/DepositComp/Withdraw.vue';
import BuyCrypto from '@/components/DepositComp/BuyCrypto.vue';

export default {
  components: {
    Fa, Deposit, Withdraw, BuyCrypto
  },
  data() {
    return {
      selectedComponent: 'Deposit',
    }
  },
  methods: {
    copyCode() {
      // Your copyCode method implementation here
    },
    showCopiedTooltip() {
      // Your showCopiedTooltip method implementation here
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
  min-height: 48px;
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