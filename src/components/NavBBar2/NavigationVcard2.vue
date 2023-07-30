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
          <v-list-item class=" mr-2 ml-2" style="color: #ffffff;  " 
          to="/SignUptest1"  ><h5>SignUptest1</h5></v-list-item>
          <v-list-item class=" mr-2 ml-2"  style="color: #ffffff;  " 
          to="/SignUptest2"  ><h5>SignUptest2</h5></v-list-item>
          <v-list-item class=" mr-2 ml-2 " style="color: #ffffff;  "
           to="/chat"   ><h5>Chat</h5></v-list-item>
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