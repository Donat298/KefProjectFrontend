<template>
  <v-expansion-panels
       v-model="panel"
       
       multiple
       
     >
   
  
       <v-expansion-panel  style="background-color: rgb(37, 56, 74); color: rgb(255, 255, 255);">
         <v-expansion-panel-title > <v-list-item prepend-icon="mdi-note-multiple" title="Tests" class=" pl-4" style="color: #ffffff;  " 
             ></v-list-item>
         </v-expansion-panel-title>
         <v-expansion-panel-text>
           <v-divider :thickness="2"  color="white"></v-divider>
           <v-list-item prepend-icon="mdi-login-variant" title="SignUptest1" class=" pl-4 mt-2" style="color: #ffffff;  " 
           to="/SignUptest1"  ></v-list-item>
           <v-list-item prepend-icon="mdi-login-variant" title="SignUptest2" class=" pl-4"  style="color: #ffffff;  " 
           to="/SignUptest2"  ></v-list-item>
           <v-list-item class=" pl-4 " style="color: #ffffff;  "
            to="/chat" prepend-icon="mdi-chat" title="Chat"  ></v-list-item>
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
  
 
  