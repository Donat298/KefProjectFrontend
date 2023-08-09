<template>
  <template v-if="$store.getters.sessionChecked">
    <div>
      <NavBBar2 @ShowAccountOknoo="openAccountView" @ShowDepositOknoo="openDepositView" />
      <AccountView v-if="showacg" @HideAccountOknoo="closeAccountView" />
      <Deposit v-if="showdep"  @HideDepositOknoo="closeDepositView" />
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
import Deposit from "./pages/Deposit/Deposit.vue"
export default {
  components: { NavBBar2, AccountView, SessionCheckAnimation, Deposit},
  data() {
    return {
      showacg: false,
      showdep: false,
    };
  },
  created() {
    // Initialize `showacg` with value from localStorage
    this.showacg = localStorage.getItem('showacg') === 'true';
    this.showdep = localStorage.getItem('showdep') === 'true';
  },
  methods: {
    openAccountView() {
      this.showacg = true;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'true');
    },
    openDepositView() {
      this.showdep = true;
      // Save the state to localStorage
      localStorage.setItem('showdep', 'true');
    },
    
    closeAccountView() {
      this.showacg = false;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'false');
    },
    closeDepositView() {
      this.showdep = false;
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