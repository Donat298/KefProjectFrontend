<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
       
     >
       
       
  
       <v-expansion-panel  style="background-color: rgb(37, 56, 74); color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-cards"  class=" pl-4" style="color: #ffffff;  " 
             >Games</v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
         
           <v-list-item :ripple="false" prepend-icon="mdi-circle-outline"  class=" pl-4  mt-2"  style="color: #ffffff;  "
            to="/wheel" >Wheel</v-list-item>
            <v-list-item :ripple="false" prepend-icon="mdi-circle-outline"  class=" pl-4"  style="color: #ffffff;  "
            to="/wheel2" >Wheel2</v-list-item>
            <v-list-item :ripple="false" prepend-icon="mdi-currency-usd"  class=" pl-4"  style="color: #ffffff;  "
            to="/BalanceManag"  >Balance</v-list-item>
         </v-expansion-panel-text>
         
       </v-expansion-panel>
     </v-expansion-panels>
  
   
       
  </template>
  
  <script>
  export default {
     data: () => ({
       panel: [0],
  
     }),
   }
  
  
  </script>
  

  
  