<template>


  <template v-if="$store.getters.sessionChecked">
    <div>
      <div style="position: fixed; z-index: 13; display: flex; flex-direction: column;
      top: 50px;   right: 20px;">
      <my-snackbar ref="customSnackbar1" />
      <my-snackbar ref="customSnackbar2" />
      <my-snackbar ref="customSnackbar3" />
      <my-snackbar ref="customSnackbar4" />

    </div>
    

      <NavBBar2 @ShowPromocodeOknoo="openPromocodeView" @ShowAccountOknoo="openAccountView"
       @ShowDepositOknoo="openDepositView" />


      <AccountView v-if="showAccountView && $store.getters.isAuthenticated"
       @HideAccountOknoo="closeAccountView" />


      <Wallet @cSWia3="showCustomSnackbar" v-if="showDepositOkno && $store.getters.isAuthenticated" 
       @HideDepositOknoo="closeDepositView"/>


      <Promocode v-if="showPromocodeOkno && $store.getters.isAuthenticated" @HidePromocodeOknoo="closePromocodeView">
      </Promocode>
      
    </div>
  </template>
  <template v-else>
    <SessionCheckAnimation/>
  </template>

</template>

<script>
import NavBBar2 from "@/pages/NavBBar2.vue";
import AccountView from "@/pages/auth/AccountView.vue";
import SessionCheckAnimation from "./components/SessionCheckAnimation.vue";
import Wallet from "./pages/Deposit/Wallet.vue"
import Promocode from "@/pages/Promocode/Promocode.vue";
import { mapState } from 'vuex';

export default {
  components: { NavBBar2, AccountView, SessionCheckAnimation, Wallet, Promocode}, 
  data() {
    return {
      showAccountView: false,
      showDepositOkno: false,
      showPromocodeOkno: false,
    };
  },
  
  created() {
    // Initialize `showacg` with value from localStorage
    this.showAccountView = localStorage.getItem('showacg') === 'true';
    this.showDepositOkno = localStorage.getItem('showdep') === 'true';
    this.showPromocodeOkno = localStorage.getItem('showcode') === 'true';
  },
 
  methods: {
    showCustomSnackbar(data) {
      console.log(data); // Add this line to display the data in the console
      this.$refs.customSnackbar1.openSnackbar(data);
    },
    showCustomSnackbar2(data) {
      console.log(data); // Add this line to display the data in the console
      this.$refs.customSnackbar2.openSnackbar(data);
    },
    showCustomSnackbar3(data) {
      console.log(data); // Add this line to display the data in the console
      this.$refs.customSnackbar3.openSnackbar(data);
    },
    showCustomSnackbar4(data) {
      console.log(data); // Add this line to display the data in the console
      this.$refs.customSnackbar4.openSnackbar(data);
    },



    openAccountView() {
      this.showAccountView = true;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'true');
    },
    openDepositView() {
      this.showDepositOkno = true;
      // Save the state to localStorage
      localStorage.setItem('showdep', 'true');
    },

    
    openPromocodeView() {
      if (!this.$store.getters.isAuthenticated) {
        // If not authenticated, redirect to the register page
        this.$router.push('/auth/register'); // Assuming `/auth/register` is your registration route.
        return;
      }
      else {
        this.showPromocodeOkno = true;
      // Save the state to localStorage
      localStorage.setItem('showcode', 'true');
      }

    },


    
    closeAccountView() {
      this.showAccountView = false;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'false');
    },
    closeDepositView() {
      this.showDepositOkno = false;
      // Save the state to localStorage
      localStorage.setItem('showdep', 'false');
    },
    closePromocodeView() {
      this.showPromocodeOkno = false;
      // Save the state to localStorage
      localStorage.setItem('showcode', 'false');
    },




 

    
  },
  mounted() {
    this.$store.dispatch("attempt");
  },
  watch: {
  '$store.state.incomingMessage': function (messageData) {
    if (messageData && messageData.type === 'DEPOSIT-ADDED-TO-BALANCE') {
      this.showCustomSnackbar2({
          amount: messageData.properties.amount,
          currency: messageData.properties.currency,
          message: "Your deposit has been completed for",
      });
    }

    if (messageData && messageData.type === 'TIP-ADDED-TO-BALANCE') {
      this.showCustomSnackbar4({
          sender: messageData.properties.sender,
          username: messageData.properties.username,
          amount: Math.floor(messageData.properties.amount * 1e8) / 1e8,
          currency: messageData.properties.currency,
          message: "You have received a tip from",
      });
    }
  },   
  '$store.state.snackbarBonus': {
    handler(newData) {
      // Check if the data is not null and call the function
      if (newData) {
        this.showCustomSnackbar3(newData);
      }
    },
    deep: true,
  },
},

};
</script>

<style>


@import "./assets/mystyle.css";


</style>

