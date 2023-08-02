<template>
  <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;"> 
        <v-card-actions height="40" @click="show = !show" class=" ma-2">
          <v-list-item rounded="lg" style="color: #ffffff;"   title="Main" ></v-list-item>

    <v-spacer></v-spacer>

    <v-btn 
    height="40"
    width="40"
    color="white"
    :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
    class="my-btn"
    :ripple="false"
></v-btn>
  </v-card-actions>
  <v-expand-transition>
    <div v-show="show">
      <v-divider :thickness="2"  color="white"></v-divider>

      <div color="rgb(37, 56, 74)"  class="pb-2 pt-2 ">
        <v-list-item class="pl-4 mt-2" title="Home" prepend-icon="mdi-home" style="color: #ffffff;  max-height: 20px;"
               to="/"  ></v-list-item>
        
               <v-list-item class="pl-4" title="Image" prepend-icon="mdi-image" style="color: #ffffff;  " 
               to="/image"  ></v-list-item>
      </div>
      </div>
    </v-expand-transition>
  </v-card>
  

</template>

<script>
export default {

  
  data() {
    return {  
    show: true    
  };
}
  
}


</script>

<style scoped>
.my-btn.v-ripple__container--is-active .v-ripple__animation {
    transform: scale(0) !important;
    opacity: 1 !important;
}
</style>

