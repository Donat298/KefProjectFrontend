<template>
  <div>
    <v-alert
      v-if="GameResult && GameResult.won && !errorMsg"  
      border="end"
      variant="tonal"  
      color="green-lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      Congratulations, you won {{ GameResult.wonMsg }} {{ GameResult.currency }}!
    </v-alert>

    <v-alert
      v-if="GameResult && GameResult.lose && !errorMsg" 
      border="end"
      variant="tonal"
      color="red lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      Better luck next time
    </v-alert>

    <v-alert
      v-if="errorMsg"
      border="end"
      variant="tonal"
      color="red lighten-1"
      class="mx-auto"
      style="max-width: 90%;"
    >
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

  
  <script>
  export default {
    props: {

      GameResult: {
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
  <style>
</style>
