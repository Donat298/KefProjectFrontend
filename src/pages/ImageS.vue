<template>
    <div  v-if="$store.getters.isAuthenticated" class="globimg">
        <v-img
            
            src="@/assets/Bobo.png"
            style="
                width: 100%;

            "
        />
    </div>
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


<style scoped>

.globimg {
    top:64px;
    bottom: 0;
    right: 0;
    left: 0;
    background-color:#15212c;
    
}
</style>