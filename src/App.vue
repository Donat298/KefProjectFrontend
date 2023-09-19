<template>
  <template v-if="$store.getters.sessionChecked">
    <div>
      <NavBBar2 @ShowAccountOknoo="openAccountView" @ShowDepositOknoo="openDepositView" />
      <AccountView v-if="showAccountView && $store.getters.isAuthenticated" @HideAccountOknoo="closeAccountView" />
      <Wallet v-if="showDepositOkno && $store.getters.isAuthenticated"  @HideDepositOknoo="closeDepositView" />
    </div>
  </template>
  <template v-else>
    <SessionCheckAnimation/>
  </template>
</template>
v-if="$store.getters.isAuthenticated"
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
    
  },
  mounted() {
    this.$store.dispatch("attempt");
  },
};
</script>

<style>


@import "./assets/mystyle.css";


</style>