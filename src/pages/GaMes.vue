<template>
<div v-if="$store.getters.isAuthenticated">
<div class="text-center" style="width: 1250px; margin-left: auto; margin-right: auto;">
    
    <v-menu location="start">
      <template v-slot:activator="{ props }">
        <v-btn
               color="white"
                 v-bind="props"
                 icon="mdi-account"
              >
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    
  </div>


     <IfnotAuth v-if="!$store.getters.isAuthenticated"></IfnotAuth>
</template>

<script>
import IfnotAuth from "@/components/IfnotAuth/IfnotAuth.vue";

export default {
    components: {
        IfnotAuth
    },
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      locations: [
        'top',
        'bottom',
        'start',
        'end',
        'center',
      ],
      location: 'end',
    }),



};
</script>