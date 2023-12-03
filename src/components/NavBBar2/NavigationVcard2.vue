<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
       
     >
       
        
  
       <v-expansion-panel elevation="4" style="background-color: #2e4659; color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-cards"  
           style="color: #ffffff; font-size: 17px;padding-left: 13px;" 
             >Games</v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
         
           <v-list-item :ripple="false" prepend-icon="mdi-circle-double"  style="color: #ffffff;padding-left: 15px;  margin-top: 8px; "
            to="/wheel" >Wheel</v-list-item>
              
           <v-list-item :ripple="false" prepend-icon="mdi-mine"   style="color: #ffffff; padding-left: 15px; "
           to="/mines" >Mines</v-list-item>
           <v-list-item :ripple="false" prepend-icon="mdi-circle-slice-8"   style="color: #ffffff; padding-left: 15px; "
           to="/realwheel" >Realwheel</v-list-item>
            <v-list-item :ripple="false" prepend-icon="mdi-currency-usd"   style="color: #ffffff; padding-left: 15px; "
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
  

  
  