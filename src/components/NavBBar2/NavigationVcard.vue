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
            <div v-show="show" style="">
                <v-divider :thickness="2" color="white"></v-divider>
                <div color="rgb(37, 56, 74)" class="pb-2 pt-2 ">
              
                <v-list-item class="mr-2 ml-2 mb-2" title="Home" prepend-icon="mdi-home" style="color: #ffffff;  max-height: 20px;"
                to="/"  ></v-list-item>
         
                <v-list-item class=" mr-2 ml-2 mb-2" title="Image" prepend-icon="mdi-home" style="color: #ffffff;  " 
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