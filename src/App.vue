<template>
  <template v-if="$store.getters.sessionChecked">
    <div>

      <my-snackbar ref="customSnackbarWithdraw" />
    <my-snackbar ref="customSnackbarBonus" />
    <my-snackbar ref="customSnackbarGames" />

      <NavBBar2 @cSWia="customSnackbarBonus" @cSWia2="customSnackbarGames" @ShowAccountOknoo="openAccountView" @ShowDepositOknoo="openDepositView" />
      <AccountView v-if="showAccountView && $store.getters.isAuthenticated" @HideAccountOknoo="closeAccountView" />
      <Wallet @cSWia3="showCustomSnackbar" v-if="showDepositOkno && $store.getters.isAuthenticated"  @HideDepositOknoo="closeDepositView" 
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
    showCustomSnackbar(data) {
      const message = data.message || "Your withdrawal was completed for the"; // Use the provided message or a default message
      this.$refs.customSnackbarWithdraw.openSnackbar(message, data);
    },
    customSnackbarBonus() {
      this.$refs.customSnackbarBonus.openSnackbar("Bonus.");
    },
    customSnackbarGames() {
      this.$refs.customSnackbarGames.openSnackbar("Games.");
    },
    
  },
  mounted() {
    this.$store.dispatch("attempt");
  },
};
</script>

<style>


@import "./assets/mystyle.css";


</style>