<template>
    <div>
      <v-alert
        v-if="gameResult && gameResult.won"
        border="start"
        variant="tonal"  
        color="green-lighten-1"
        class="mx-auto"
        style="max-width: 90%;  width: 1200px;"
      >
        Congratulations, you won!
      </v-alert>
  
      <v-alert
        v-if="gameResult && !gameResult.won"
        border="start"
        variant="tonal"
        color="red lighten-1"
        class="mx-auto"
        style="max-width: 90%; width: 1200px;"
      >
   Better luck next time
      </v-alert>
  
      <v-alert
        v-if="errorMsg"
        border="start"
        variant="tonal"
        color="red lighten-1"
        class="mx-auto"
        style="max-width: 90%;  width: 1200px;"
      >
        {{ errorMsg }}
      </v-alert>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      gameResult: {
        type: Object,
        required: false,
        default: null
      },
      errorMsg: {
        type: String,
        required: false,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can add additional styles here as needed */
  </style>
  