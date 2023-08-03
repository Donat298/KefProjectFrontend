<template>
  <template v-if="$store.getters.sessionChecked">
    <div>
      <NavBBar2 @ShowAccountOknoo="openAccountView" />
      <AccountView v-if="showacg" @HideAccountOknoo="closeAccountView" />
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

export default {
  components: { NavBBar2, AccountView, SessionCheckAnimation },
  data() {
    return {
      showacg: false,
    };
  },
  created() {
    // Initialize `showacg` with value from localStorage
    this.showacg = localStorage.getItem('showacg') === 'true';
  },
  methods: {
    openAccountView() {
      this.showacg = true;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'true');
    },
    closeAccountView() {
      this.showacg = false;
      // Save the state to localStorage
      localStorage.setItem('showacg', 'false');
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
