<template>
<div style="padding:0px 20px 20px 20px; "> 
          <span style="color: rgba(240, 255, 255, 0.294);">(Enter a secret promocode to get a bonus!)</span>
            <v-form ref="betForm" @submit.prevent="SendPromo"> 
<input
          v-focus
          class="inputwithdrawnumber" 
          style="padding: 0px 15px; "
          type="string"
          v-model="promocode"
          :style="{
          }"
        >  

        
        <div style="  margin: 10px; display: flex; align-items: center; justify-content: center;">
             <div v-if="errorMsg" 
                  style="color: red; font-size: 17px; ">{{ errorMsg }}
        
        
             </div>
             <div v-if="goodMsg && !errorMsg"
                  style="color: rgb(0, 255, 0); font-size: 17px; ">{{ goodMsg }}
             </div>
           </div>    
<v-btn
              class="mx-auto"
                type="submit"
                :style="buttonStyle" 
              elevation="8"
              :ripple="false"
              style="  color: #ffffff; display: flex; 
               align-items: center; justify-content: center; font-size: 17px;"
            >
              <span style="color: #ffffff; font-size: 13px;">    {{ buttonText }}</span>
            </v-btn>
</v-form>  

         </div>
</template>


<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import { useApiPrivate } from '@/utils/useApi';
export default {
    setup() {
      const errorMsg = ref('');
      const goodMsg = ref('');

      const promocode = ref('');
      const store = useStore();
      const axiosPrivateInstance = useApiPrivate(store);  
      const buttonStyle = ref({
        backgroundColor: '#1E88E5', // Default background color
        opacity: 1, // Default opacity
      });
      const buttonText = ref('submit');
      const SendPromo = async () => {
        if (promocode.value === '') {
          errorMsg.value = 'Please write promocode';
          return;
        }
        try {
            goodMsg.value = "";
            errorMsg.value = '';
            buttonStyle.value = {
              ...buttonStyle.value,
              opacity: 0.5, // Adjust opacity for the fade-out effect
            };
            buttonText.value = 'Submitting...';
            const responsepromo = await axiosPrivateInstance.put('/users/promocode/promocode1', {
                promocode: promocode.value,
            });
            if (responsepromo.data.message === 'Promocode found') {
         
              store.dispatch('updateBalance', {currency: responsepromo.data.currency,
               amount: responsepromo.data.finalbalance });
              store.dispatch('dispatchSnackbarBonusData', {
                currency: `balance${responsepromo.data.currency}`,
                amount: responsepromo.data.bonus,
                message: 'Bonus received!'
              });
              goodMsg.value = "Successfully";
            }  
            else {
       
                errorMsg.value = responsepromo.data.message;
            } 
            console.log(responsepromo.data);
            promocode.value = '';
            buttonStyle.value = {
              ...buttonStyle.value,
              opacity: 1, // Adjust opacity for the fade-out effect
            };
            buttonText.value = 'submit';
        } catch (error) {
            console.log(error);
            errorMsg.value = error.response.data.message;
            promocode.value = '';
            buttonText.value = 'submit';
            buttonStyle.value = {
              ...buttonStyle.value,
              opacity: 1, // Adjust opacity for the fade-out effect
            };
        }
    };
      return {
        SendPromo,
        errorMsg,
        promocode,
        store,
        axiosPrivateInstance,
        buttonStyle,
        buttonText,
        goodMsg
      }
    },
}
</script>
<style scoped>
.inputwithdrawnumber {
width: 100%;
height: 42px;
background-color: #15212c;
color: #ffffff;
border-radius: 5px;
border: 2px solid #2e4659; /* Add a default border color */
}
.inputwithdrawnumber:focus {
border-color: #2e4659; /* Set the border color to green when focused */
outline: none; /* Optionally, remove the default outline */
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
-webkit-appearance: none;
appearance: none;
margin: 0;
}


</style>