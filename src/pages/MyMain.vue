<template>
  <div :style="{ 'margin-bottom': isWideScreen ? '80px' : '20px' }">

    
        <div class="title-all" >
        <div style="font-size: 40px; text-align: center;   word-break: break-word;


 border-radius: 20px; background: linear-gradient(140deg, #1d2f3f, #15212c);
box-shadow:  0px 0px 50px rgba(0, 0, 0, 0.30);transform: rotate(2deg);
    white-space: pre-wrap;
      " class="casino-title">Welcome to KEF!</div>

       
        <div style="  border-radius: 20px; 
      background: linear-gradient(150deg, #1d2f3f, #15212c); 
box-shadow:  0px 0px 50px rgba(0, 0, 0, 0.30);transform: rotate(-2deg);
" class="description">
         Is it possible to make money, and get free big bonuses on KEF? 
          Suggest you check and find out!</div>

        </div>
    
      <div class="game-list">

        <Gamelist></Gamelist>
        <div style="margin: 50px; width: 100%;    font-size: 25px; text-align: center; 
            ">Other games coming soon!!!</div>

      </div>

      
      <div style="display: flex;
    justify-content: center;
    align-items: center;  /* Add this line */
    flex-wrap: wrap;
    border: 1px solid #2e4659;
    border-radius: 30px;
    max-width: 90%;
    width: 1020px; 
    margin: 0 auto;"> 
    <div style="font-size: 25px; margin:30px auto; padding:0px 20px;
    ">
      <span style="display: block; text-align: center; word-break: break-word; white-space: pre-wrap;"> Available online chat for everyone!</span>
    </div>
<div style="width: 400px; margin: auto;">
    <v-img  :src="require('@/assets/Gamespreview/Caht.png')"
     style=" "></v-img>
    </div>
      </div>

      
<div style="display: flex;
    justify-content: center;
    align-items: center;  /* Add this line */
    flex-wrap: wrap;
    border: 1px solid #2e4659;
    border-radius: 30px;
    max-width: 90%;
    width: 1020px; 
    margin:40px auto 0px"> 
    <div style="width: 400px; margin: auto;margin: 10px;">
    <v-img  :src="require('@/assets/Gamespreview/Bonus.png')"
     style=" "></v-img>
    </div>
    <div style="font-size: 25px; margin:30px auto; padding:0px 20px;">
      <span style="display: block; text-align: center; word-break: break-word; white-space: pre-wrap;">
        Promo code bonuses!</span>
    </div>

</div>



    </div>








  

  <bottom-info></bottom-info>
</template>

<script>
  import { ref } from 'vue';
  import Gamelist from '@/pages/Games/Gamelist.vue';
  export default {
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
        this.isWideScreen = window.innerWidth > 800;
      },
    },
    mounted() {
      this.checkScreenWidth();
      window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenWidth);
    },
  }
</script>

<style>



  .casino-title {
    color: #ffffff;
    margin: 10% auto;
    display: flex;
    align-items: center;
    padding: 20px;
    max-width: 90%;

  }

  .description {
    color: #ffffff;
    font-size: 25px;
    width: 400px;
    margin: 10% auto;
    padding: 20px;

    max-width: 85%;
  }

  .game-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }
.title-all{
margin: auto;

  max-width: 1200px;
            display: flex;
    justify-content: space-between;
  
}
  @media (max-width: 800px) {
    .title-all {
      flex-direction: column;
    }
  }

</style>