<template>
  <div>

    <v-alert
      v-if="errorMsg"
      border="end"
      variant="tonal"
      color="red lighten-1"
      class="mx-auto"
      style="max-width: 90%; text-align: center;"
    >
      {{ errorMsg }}
    </v-alert>
  </div>
</template>

  
  <script>
  export default {
  
    props: {

      errorMsg: {
        type: String,
        required: false,
        default: ''
      }
    },

    
  }
  </script>
  <style>
</style>
