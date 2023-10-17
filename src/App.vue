<template>
  <template v-if="$store.getters.sessionChecked">
    <div>

      <my-snackbar ref="customSnackbar1" />
      <my-snackbar ref="customSnackbar2" />
      
      <NavBBar2 @ShowAccountOknoo="openAccountView" @ShowDepositOknoo="openDepositView" />
      <AccountView v-if="showAccountView && $store.getters.isAuthenticated" @HideAccountOknoo="closeAccountView" />
      <Wallet @cSWia3="showCustomSnackbarWithdraw" v-if="showDepositOkno && $store.getters.isAuthenticated"  @HideDepositOknoo="closeDepositView" 
      />
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

export default {
  components: { NavBBar2, AccountView, SessionCheckAnimation, Wallet}, 
  data() {
    return {
      showAccountView: false,
      showDepositOkno: false,
    };
  },
  created() {
    // Initialize `showacg` with value from localStorage
    this.showAccountView = localStorage.getItem('showacg') === 'true';
    this.showDepositOkno = localStorage.getItem('showdep') === 'true';
  },
  methods: {
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
    showCustomSnackbarWithdraw(data) {
    console.log(data); // Add this line to display the data in the console

    const message = data.message || "Your withdrawal was completed for the"; // Use the provided message or a default message
    this.$refs.customSnackbar1.openSnackbar(message, data);
  },
  showCustomSnackbarDeposit(data) {
    console.log(data);
    const message = data.message || "Your deposit has been completed for"; // Use the provided message or a default message
      this.$refs.customSnackbar2.openSnackbar(message, data);
    },

    
  },
  mounted() {
    this.$store.dispatch("attempt");
  },
  watch: {
    '$store.state.incomingMessage': function (messageData) {
      if (messageData && messageData.type === 'DEPOSIT-ADDED-TO-BALANCE') {
        this.showCustomSnackbarDeposit({
            amount: messageData.properties.amount,
            currency: messageData.properties.currency,
        });
      }
    },
  },
};
</script>

<style>


@import "./assets/mystyle.css";


</style>