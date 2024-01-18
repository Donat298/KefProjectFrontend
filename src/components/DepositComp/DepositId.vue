<template>
  <!-- Your existing template code -->
  <div   
   style="border-radius: 5px; word-break: break-word; white-space: pre-wrap; color: #ffffff;
    font-size: 12px; padding: 5px; margin-top: 8%; text-align: center; background-color: #15212c;">

    <span style="color: rgba(240, 255, 255, 0.294);"> If you have any questions please contact us by email.
 
 supercryptomegagames@gmail.com </span>
 
  </div>


</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useApiPrivate } from '@/utils/useApi';

export default {
  props: {
    copyadresspressed: {
      type: Boolean,
      default: false,
    },
    adress: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const errorMsg = ref('');
    const router = useRouter();
    const userId = ref(store.getters.userDetail._id);
  
    const adressname = computed(() => props.adress);// assign adress prop to adressname




  
/*
    const checkAuthentication = () => {
      if (!store.getters.isAuthenticated) {
        router.push('/auth/register');
        return false;
      }
      return true;
    };

    const sendSMS = async () => {
      if (!checkAuthentication()) return;

      try {
        const selectedCurrency = store.getters.selectedCurrency;
        const username = store.getters.userDetail.username;

        const formattedCurrency = selectedCurrency.replace(/^balance/, '');

   
   

        // Update the button style to make it fade out
       
        console.log('adressname', adressname.value);
        const response = await axiosPrivateInstance.post('/users/deposit', {
          userId: userId.value,
          currency: formattedCurrency,
          username: username,
          adressname: adressname.value,
        });

        // Handle the response as needed
        console.log(response.data);
        errorMsg.value = '';

        // Update the button text when the button is clicked
  
        
     
      } catch (error) {
        errorMsg.value = error.response.data.message;
     
   
        // Reset the button opacity on error
      
      }
    };
*/
    return {

      errorMsg,
      adressname,
  
  
    };
  },
};
</script>
