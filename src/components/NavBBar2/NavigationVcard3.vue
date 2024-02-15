<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
     
     >
   
  
       <v-expansion-panel elevation="4"  style="background-color: #2e4659; color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-more"  style="color: #ffffff;  
         font-size: 17px; padding-left: 13px;  " 
             >More</v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
  
           <v-list-item :ripple="false" prepend-icon="mdi-cached"  style="color: #ffffff;padding-left: 15px;  margin-top: 8px; " 
           to="/relax"   >Relax</v-list-item>
           <v-list-item
           :ripple="false"
          
           style="color: #ffffff; padding-left: 15px;"
           to="/chat"
           prepend-icon="mdi-chat"
           
           elevation="0"
           
         >
           Chat
         </v-list-item>
           <v-list-item :ripple="false" prepend-icon="mdi-progress-check"  style="color: #ffffff;padding-left: 15px; " 
           to="/activation"   >Activate</v-list-item>
       
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
  
 
  