<template>
  <div  @mousedown="onMouseDown" @mouseup="onMouseUp" class="jja" style="width: 100%; overflow-y: auto;">
    <div  @mousedown="onMouseDown" @mouseup="onMouseUp"  style="max-height: 90%; width: 100%; overflow-y: auto;">
      <div @click.stop @mousedown.stop style="background-color: #1d2f3f; border-radius: 10px; max-width: 90%; margin: auto; max-height: 90%; width: 500px;">
        <div style="display: flex; justify-content: space-between; align-items: center;padding: 5px 10px 10px 10px; ">
          <div style="color: #ffffff; padding: 10px;">
            Wallet   
            <font-awesome-icon  style="color: #ffffff; "  :icon="['fas', 'wallet']" />
           
          </div>
       
            <button @click.stop="$emit('HideDepositOknoo')" style="cursor: pointer; 
             color: #ffffff;
            min-height: 35px;  min-width: 35px; ">
    
    <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'xmark']" />
            </button>
            
       
        </div>
       <div  elevation="0" style="background-color: #15212c;    ">
         <div style="overflow-x:
         auto;margin: 0px 10px 0px 10px;padding: 10px 10px; width: auto; "  class="d-flex align-center">
          <v-btn :class="getButtonClass('Deposit')" @click="changeComponent('Deposit')" elevation="4" class="glow-button" 
          :ripple="false" 
          style="color: #ffffff; display: flex; flex-direction: column; align-items: center;
           text-align: center; flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Deposit</span>
          </v-btn>
   

          <v-btn :class="getButtonClass('Withdraw')"  @click="changeComponent('Withdraw')" elevation="4" class="glow-button"
           :ripple="false" style="margin-inline: 10px; flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Withdraw</span>
          </v-btn>

          <v-btn :class="getButtonClass('BuyCrypto')"  @click="changeComponent('BuyCrypto')" elevation="4" class="glow-button" 
          :ripple="false" style="flex-grow: 1; flex-shrink: 1;">
            <span style="color: #ffffff; font-size: 13px;">Buy crypto</span>
          </v-btn>
        </div>
        </div>

        <div style="background-color: #1d2f3f; padding: 0px 0px 20px 0px; margin-left: 10px; margin-right: 10px; border-radius: 10px;">
          <component @cSWi="handleChildEmit" :is="selectedComponent" />
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
      selectedComponent: localStorage.getItem('selectedComponent') || 'Deposit',
    }
  },
  
  methods: {
    copyCode() {
      // Your copyCode method implementation here
    },
    showCopiedTooltip() {
      // Your showCopiedTooltip method implementation here
    },
    getButtonClass(componentName) {
      return {
        'highlighted-button': this.selectedComponent === componentName,
      };
    },
    changeComponent(componentName) {
      this.selectedComponent = componentName; 
      // Store the selected component in localStorage
      localStorage.setItem('selectedComponent', componentName);
    },
    onMouseDown() {
      this.mousePressed = true;
    },
    onMouseUp() {
      if (this.mousePressed) {
        // Emit the custom event when the button is pressed and released
        this.$emit('HideDepositOknoo');
      }
      this.mousePressed = false;
    },
    handleChildEmit() {
      // This method will be called when the child component emits 'cSWi'
      // You can perform any actions or emit further if needed
      this.$emit('cSWia3'); // Pass it to the parent of this component
    }
    
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
  position: fixed;   display: flex;    align-items: center;
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
  background-color: #1d2f3f;
  color: #ffffff;
  min-height: 48px;
  width: 100%;
  transition: transform 0.3s,;
  z-index: 0;
  width: 155px; min-width: 110px;
}



.highlighted-button {
  background-color: #2e4659; /* Set your desired highlight color */
  color: white; /* Text color when highlighted */

}
  </style>
  
