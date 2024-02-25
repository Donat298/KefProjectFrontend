<template>
   <v-expansion-panels v-model="panel" multiple>
     <v-expansion-panel elevation="4" style="background-color: #2e4659; color: rgb(255, 255, 255);">
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
        
            elevation="0"
         >
           Home
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
  height: 64px !important;
   padding-left: 2px !important;

}
.v-expansion-panel-title__icon {

   margin-left: 175px !important;
   position: absolute;
}
.v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
.v-expansion-panel-title[aria-haspopup=menu][aria-expanded=true] > .v-expansion-panel-title__overlay {
   opacity: 0 !important;
}


.v-list-item--active > .v-list-item__overlay, .v-list-item[aria-haspopup=menu][aria-expanded=true] > .v-list-item__overlay {
  opacity: 0 !important; 
}
.v-list-item--active {
  background-color: #37556b;
}

.v-list-item:hover > .v-list-item__overlay {
  opacity: 0 !important; 
}

/* Adding transition */
.v-list-item {
  transition: 0;
}
.v-list-item--active .v-list-item__prepend > .v-icon, .v-list-item--active .v-list-item__append > .v-icon {
    opacity: null !important;
}
</style>


