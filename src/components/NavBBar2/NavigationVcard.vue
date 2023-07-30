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
                <div style="max-width: 30px;">
                    ihihihihihih
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