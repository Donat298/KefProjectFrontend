<template>
    <v-card  color="rgb(37, 56, 74)" elevation="0"> 
                <v-card-actions  @click="show = !show" class=" ma-2">
                    <v-list-item  rounded="lg" style="color: #ffffff;"  title="Main" ></v-list-item>

            <v-spacer></v-spacer>

            <v-btn 
            
            height="40"
            width="40"
            color="white"
                :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                
            ></v-btn>
            
            </v-card-actions>
            <v-expand-transition >
            <div v-show="show">
                <v-divider :thickness="2" color="white"></v-divider>
                <v-card color="rgb(37, 56, 74)" elevation="0" class="pb-2 pt-2 ">
                <v-list-item class="mr-2 ml-2 mb-2"  style="color: #ffffff;  "
                to="/" prepend-icon="mdi-home" title="Home" ></v-list-item>
                
                <v-list-item class=" mr-2 ml-2 mb-2"  style="color: #ffffff;  " 
                to="/image" prepend-icon="mdi-image" title="Image" ></v-list-item>
                </v-card>
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