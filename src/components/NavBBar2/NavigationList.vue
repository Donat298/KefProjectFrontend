<template>
    <v-list
          density="compact"
          nav
         
          class="pa-2" 
        >
             <NavigationVcard style="margin-bottom: 10px;"/>
             <NavigationVcard3 style="margin-bottom: 10px;"/>
             <NavigationVcard2 style="margin-bottom: 10px;"/>
             <div style="height: 56px;">

</div>
             </v-list>
  </template>
  
  <script>

  import NavigationVcard from './NavigationVcard.vue'
  import NavigationVcard2 from './NavigationVcard2.vue'
  import NavigationVcard3 from './NavigationVcard3.vue'
  export default {
    components: { NavigationVcard, NavigationVcard2, NavigationVcard3 },
    
    data() {
      return {
 
    };
  }
    
}

  </script>
  