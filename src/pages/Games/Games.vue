<template>
    <div class="games-container"
     :style="{ 'margin-top': isWideScreen ? '40px' : '5px', 'margin-bottom': isWideScreen ? '80px' : '10px' }">
  
        <Gamelist></Gamelist>
        <div style="margin: 50px; width: 100%; text-align: center; 
            "><h2 >Other games coming soon!!!</h2></div>
    </div>
    <bottom-info></bottom-info>
</template>

<script> 
import Gamelist from '@/pages/Games/Gamelist.vue';
import titleMixin from "@/components/UI/Other/document.title";
  export default {
    mixins: [titleMixin],
    title: "Kef: Games",
    components: {
        Gamelist
    },
    data() {
        return {
           
            isWideScreen: false, 
        };
    },
    methods: {
        checkScreenWidth() {
            this.isWideScreen = window.innerWidth > 800; // Check screen width
        },
    },
    mounted() {
    this.checkScreenWidth(); // Call the function to check screen width on mount
    window.addEventListener('resize', this.checkScreenWidth); // Listen for screen resize
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenWidth); // Clean up the event listener
    },
    
};
</script>

<style scoped>
.games-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;

}

</style>