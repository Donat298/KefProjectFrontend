<template>
    <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;"> 
          <v-card-actions height="40" @click="show = !show" class=" ma-2">
            <v-list-item rounded="lg" style="color: #ffffff;"   title="Tests" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider :thickness="2"  color="white"></v-divider>

        <div color="rgb(37, 56, 74)"  class="pb-2 pt-2 ">
          <v-list-item prepend-icon="mdi-login-variant" title="SignUptest1" class=" pl-4" style="color: #ffffff;  " 
          to="/SignUptest1"  ></v-list-item>
          <v-list-item prepend-icon="mdi-login-variant" title="SignUptest2" class=" pl-4"  style="color: #ffffff;  " 
          to="/SignUptest2"  ></v-list-item>
          <v-list-item class=" pl-4 " style="color: #ffffff;  "
           to="/chat" prepend-icon="mdi-chat" title="Chat"  ></v-list-item>
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