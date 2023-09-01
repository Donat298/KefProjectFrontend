<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
     
     >
   
  
       <v-expansion-panel  style="background-color: #2e4659; color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-note-multiple"  style="color: #ffffff;  
         font-size: 17px; padding-left: 13px;  " 
             >Tests</v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
           <v-list-item :ripple="false" prepend-icon="mdi-login-variant"   style="color: #ffffff;padding-left: 15px; margin-top: 8px; " 
           to="/SignUptest1"   color="teal-lighten-4" >SignUptest1</v-list-item>
           <v-list-item :ripple="false" prepend-icon="mdi-login-variant"  style="color: #ffffff;padding-left: 15px;  " 
           to="/SignUptest2"   color="teal-lighten-4"  >SignUptest2</v-list-item>
          
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
  
 
  