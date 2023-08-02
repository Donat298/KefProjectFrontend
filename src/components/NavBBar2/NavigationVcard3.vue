<template>
    <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;"> 
          <v-card-actions height="40" @click="show = !show" class=" ma-2">
            <v-list-item rounded="lg" style="color: #ffffff;"   title="Games" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider :thickness="2"  color="white"></v-divider>

        <v-card color="rgb(37, 56, 74)" elevation="0" class="pb-2 pt-2 ">
          <v-list-item prepend-icon="mdi-circle-outline" title="Wheel" class=" pl-4 mb-2"  style="color: #ffffff;  "
           to="/wheel" ></v-list-item>
           <v-list-item prepend-icon="mdi-circle-outline" title="Wheel2" class=" pl-4 mb-2"  style="color: #ffffff;  "
           to="/wheel2" ></v-list-item>
           <v-list-item prepend-icon="mdi-currency-usd" title="BalanceManag" class=" pl-4 mb-2"  style="color: #ffffff;  "
           to="/BalanceManag"  ></v-list-item>
           
           
          
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