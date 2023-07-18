<template>
    <div v-if="!$store.getters.isAuthenticated" class="outer-container">
      <div class="inner-container">
        <div style="margin-bottom: 30px;"><h1> Login or Register First!</h1></div>
        <span>
          <v-btn
            elevation="4"
            size="large"
            variant="tonal"
            href="/auth/register"
            class="centered-button"
          >
            Register
          </v-btn>
          <v-btn
            size="large"
            elevation="4"
            variant="tonal"
            @click="$router.push('/auth/login')"
            class="centered-button"
          >
            Login
          </v-btn>
        </span>
      </div>
    </div>
  </template>
  <script></script>
  
  <style scoped>
  .outer-container {
    height: 100vh; /* Set the height to 100% of the viewport height */
    display: flex;
    top: 0;
    justify-content: center;
    align-items: center;
    background-color: #080d12;
  }
  
  .inner-container {
    padding-bottom: 100px;
  }
  
  .centered-button {
    background: linear-gradient(230deg, aquamarine, rgb(127, 255, 244));
    color: black;
    margin-right: 15px;
    /* Add any additional styles for the buttons here */
  }
  </style>
  