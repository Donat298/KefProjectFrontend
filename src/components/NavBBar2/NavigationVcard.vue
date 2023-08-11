<template>
<v-expansion-panels
     v-model="panel"
     
     multiple
     
   >
     <v-expansion-panel  style="background-color: #25384a; color: rgb(255, 255, 255);">
       <v-expansion-panel-title> <v-list-item prepend-icon="mdi-home"  style="color: #ffffff; font-size: 16px; padding-left: 14px; " 
           >Main</v-list-item>
           
       </v-expansion-panel-title>
       
       <v-expansion-panel-text>
         <v-divider :thickness="2"  color="white"></v-divider>
         <v-list-item :ripple="false" class="pl-4 mt-2"  prepend-icon="mdi-home" style="color: #ffffff;  max-height: 20px;"
               to="/"  > Home</v-list-item>
        
             
               <v-list-item :ripple="false" class=" pl-4 " style="color: #ffffff;  "
            to="/chat" prepend-icon="mdi-chat"   >Chat</v-list-item>
         
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

<style>
.v-expansion-panel-text__wrapper {
   padding: 0px 0px 0px !important;
   flex: 1 1 auto !important;
   max-width: 100% !important;
   margin-bottom: 8px !important;
}

.v-expansion-panel-title {
   
   padding: 12px 24px  !important;
   padding-left: 2px !important;
   padding-top: 0px ;

  
}
.v-expansion-panel-title__icon {
   display: inline-flex;
   margin-bottom: -4px;
   margin-top: -4px;
 
   margin-left: 170px !important;
   -webkit-user-select: none;
   -moz-user-select: none;
   user-select: none;
   -webkit-margin-start: auto;
   margin-inline-start: auto;
   position: absolute;
}
.v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
.v-expansion-panel-title[aria-haspopup=menu][aria-expanded=true] > .v-expansion-panel-title__overlay {
   opacity: 0 !important;
}


</style>

