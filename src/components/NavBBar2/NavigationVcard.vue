<template>
   <v-expansion-panels v-model="panel" multiple>
     <v-expansion-panel style="background-color: #2e4659; color: rgb(255, 255, 255);">
       <v-expansion-panel-title>
         <v-list-item prepend-icon="mdi-home" style="color: #ffffff;  font-size: 17px; padding-left: 13px;">
           Main
         </v-list-item>
       </v-expansion-panel-title>
       
       <v-expansion-panel-text>
         <v-divider :thickness="2" color="white"></v-divider>
     
         <v-list-item
           :ripple="false"
       
           prepend-icon="mdi-home"
           style="color: #ffffff; margin-top: 8px; padding-left: 15px;"
           to="/"
           color="teal-lighten-4"
            elevation="0"
         >
           Home
         </v-list-item>
         
         <v-list-item
           :ripple="false"
          
           style="color: #ffffff; padding-left: 15px;"
           to="/chat"
           prepend-icon="mdi-chat"
           color="teal-lighten-4"
           elevation="0"
           
         >
           Chat
         </v-list-item>
     
      
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

.v-list-item__overlay {
    background-color: currentColor;
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;

}
.v-list-item--active > .v-list-item__overlay, .v-list-item[aria-haspopup=menu][aria-expanded=true] > .v-list-item__overlay {
  opacity: 0 !important; 
}

.v-list-item:hover > .v-list-item__overlay {
  opacity: 0.05s !important; 
}

/* Adding transition */
.v-list-item {
  transition: color 0.05s;
}
.v-list-item--active .v-list-item__prepend > .v-icon, .v-list-item--active .v-list-item__append > .v-icon {
    opacity: null !important;
}
</style>

