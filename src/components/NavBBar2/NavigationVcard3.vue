<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
       
     >
       
       
  
       <v-expansion-panel  style="background-color: rgb(37, 56, 74); color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-cards"   style="color: #ffffff; font-size: 16px; padding-left: 14px; " 
             >Games</v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
         
           <v-list-item :ripple="false" prepend-icon="mdi-circle-outline"  class=" pl-4 "  style="color: #ffffff;  margin-top: 8px; "
           color="teal-lighten-4" to="/wheel" >Wheel</v-list-item>
              
           <v-list-item :ripple="false" prepend-icon="mdi-arrow-top-right"  class=" pl-4 "  style="color: #ffffff;  "
           color="teal-lighten-4" to="/crash" >Crash</v-list-item>
            <v-list-item :ripple="false" prepend-icon="mdi-currency-usd"  class=" pl-4"  style="color: #ffffff;  "
            color="teal-lighten-4" to="/BalanceManag"  >Balance</v-list-item>
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
  

  
  