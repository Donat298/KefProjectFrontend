//This client file 

<template>
  <v-card
    color="#213141"
    style=" height: 70px; display: flex; align-items: center; justify-content: center;"
    elevation="0"
    rounded="0"
  >
    <p class="text-center" style="color: #ffffff; display: flex; align-items: center; justify-content: center;">
      {{ $store.getters.userDetail.balance }} USDT
    </p>
    <img  style="width: 25px; margin-left: 5px;" :src="require('@/assets/Tether.svg')" />
  </v-card>
  <v-card  title="Balance control panel" color="#455A64" elevation="0" class="mx-auto"
   style="display: flex; color: #ffffff; width: 1000px; max-width: 90%; flex-direction: column;margin-top: 30px; justify-content: center; align-items: center;">

   <div>
    <v-btn ref="doubleButton" elevation="4" variant="tonal" class="mt-4 mb-4 mr-2 ml-2"
        type="button"  @click="doubleBalance"
        style="color: black; 
        background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));">
        2x Balance
    </v-btn>
    <v-btn ref="splitButton" elevation="4" variant="tonal" class="mt-4 mb-4 mr-2 ml-2"
        type="button"  @click="splitBalance"
        style="color: black; background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));">
        2/ Balance
    </v-btn>
  

 
  <v-btn ref="zeroButton" elevation="4" variant="tonal" class="mt-4 mb-4 mr-2 ml-2"
        type="button"  @click="setBalanceZero"
        style="color: black;  background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));">
        Balance = 0
  </v-btn>
  <v-btn ref="increaseButton" elevation="4" variant="tonal" class="mt-4 mb-4 mr-2 ml-2"
        type="button"  @click="increaseBalanceByHundred"
        style="color: black;  background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));">
        Balance + 100
  </v-btn>
</div>


</v-card>
<v-card  title="Pick a manual number." color="#455A64" elevation="0" class="mx-auto"
   style="display: flex; color: #ffffff; width: 1000px; max-width: 90%; flex-direction: column;margin-top: 30px;
    justify-content: center; align-items: center;">
   <div>
    <div style="width: 100%; min-height: 100px; background-color: rgba(255, 228, 196, 0);
     display: flex; align-items: center;  justify-content: center;">
      <v-form style="display: flex;" ref="form" @submit.prevent="setBalance">
  <v-text-field type="number" class="pl-5" v-model="balanceInput" 
    variant="solo"
    hide-details
    bg-color="secondary">
  </v-text-field>
  <div class="d-flex align-center" style="height: 64px; margin-top: auto; display: flex;">
    <v-btn rounded="xl" class="ml-4 mr-2" size="small"
    type="submit" style="height: 50px; width: 44px; color: aquamarine; background-color: #15212c;"  icon="mdi-check"> </v-btn>
  </div>
</v-form>
      
    </div>
   

</div>


</v-card>
<div style="margin-top: 20px;">
  <div class="text-subtitle-1 text-color-white align-center justify-space-between"
    style="color: red; text-align: center ;"
  >{{ errorMsg }}</div>
</div>

</template>


<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useApiPrivate } from '../../utils/useApi';

export default {
  setup() {
    const store = useStore();
    const axiosPrivateInstance = useApiPrivate(store);
    const balanceInput = ref(store.getters.userDetail.balance); // the new balance input value
    const errorMsg = ref(''); // to store error messages
    const userId = ref(store.getters.userDetail._id); 

    const doubleBalance = async () => {
      try {
        const response = await axiosPrivateInstance.put('/users/double-balance', { userId: userId.value });
        console.log(response.data); // prints new balance

        // Commit a mutation to update the balance in the store
        store.commit('setUserBalance', response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    const splitBalance = async () => {
      try {
        const response = await axiosPrivateInstance.put('/users/split-balance', { userId: userId.value });
        console.log(response.data); // prints new balance

        // Commit a mutation to update the balance in the store
        store.commit('setUserBalance', response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    const setBalanceZero = async () => {
      try {
        const response = await axiosPrivateInstance.put('/users/set-zero', { userId: userId.value });
        console.log(response.data); // prints new balance

        // Commit a mutation to update the balance in the store
        store.commit('setUserBalance', response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    const increaseBalanceByHundred = async () => {
      try {
        const response = await axiosPrivateInstance.put('/users/increase-hundred', { userId: userId.value });
        console.log(response.data); // prints new balance

        // Commit a mutation to update the balance in the store
        store.commit('setUserBalance', response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    const setBalance = async () => {
      try {
        const response = await axiosPrivateInstance.put('/users/set-balance', {
          userId: userId.value,
          newBalance: balanceInput.value // use the input value here
        });

        // clear error message
        errorMsg.value = '';

        // Commit a mutation to update the balance in the store
        store.commit('setUserBalance', response.data.balance);
      } catch (error) {
        console.error(error);

        // if an error occurred, set the error message
        errorMsg.value = error.response.data.message;
      }
    };

    return {
      // ...other functions...
      doubleBalance,
      splitBalance,
      setBalanceZero,
      increaseBalanceByHundred,
      setBalance, // add the new function here
      balanceInput, // also expose the balanceInput ref so we can use it in the template
      errorMsg // expose the errorMsg ref as well
    };
  },
};
</script>

<style>
</style>

