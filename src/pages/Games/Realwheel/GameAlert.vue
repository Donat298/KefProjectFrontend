<template>
    <div>
      <v-alert
        v-if="gameResult && gameResult.won && !errorMsg"
        border="start"
        variant="tonal"  
        color="green-lighten-1"
        class="mx-auto"
        style="max-width: 90%;  "
      >
        Congratulations, you won!
      </v-alert>
  
      <v-alert
        v-if="gameResult && !gameResult.won && !errorMsg"
        border="start"
        variant="tonal"
        color="red lighten-1"
        class="mx-auto"
        style="max-width: 90%; "
      >
   Better luck next time
      </v-alert>
  
      <v-alert
        v-if="errorMsg"
        border="start"
        variant="tonal"
        color="red lighten-1"
        class="mx-auto"
        style="max-width: 90%;  "
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
  