<template>
    <v-list
          density="compact"
          nav
         
          class="pa-2" 
        >
             <NavigationVcard style="margin-bottom: 10px;"/>
             <NavigationVcard2 style="margin-bottom: 10px;"/>
             <NavigationVcard4 style="margin-bottom: 10px;"/>
             <div style="height: 56px;">

</div>
             </v-list>
  </template>
  
  <script>

  import NavigationVcard from './NavigationVcard.vue'
  import NavigationVcard2 from './NavigationVcard2.vue'
  import NavigationVcard4 from './NavigationVcard4.vue'
  export default {
    components: { NavigationVcard, NavigationVcard2, NavigationVcard4 },
    
    data() {
      return {
 
    };
  }
    
}

  </script>
  