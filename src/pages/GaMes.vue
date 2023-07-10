<template>
     <IfnotAuth v-if="!$store.getters.isAuthenticated"></IfnotAuth>
</template>

<script>
import IfnotAuth from "@/components/IfnotAuth/IfnotAuth.vue";

export default {
    components: {
        IfnotAuth
    }



};
</script>