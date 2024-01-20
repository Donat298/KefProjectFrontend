<template>
 <div class="info">
      <div style="


  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
">

  <!-- Games Information -->
  <div class="game-info">
    <h3 style="color: #fff;">Games</h3>
    <div>  <a class="text-grey"
                            href="/wheel">Wheel game</a>
                          </div>
                          <div>
                            <a
                            class="text-grey"
                            href="/mines">Mines game</a>
                          </div>
    <div class="info-mini-liks">Explore a wide range of 
      thrilling games on KEF!
                          
                   </div>
  </div>



  <!-- Casino Details -->
  <div class="game-info">
    <h3 style="color: #fff;">Casino</h3>
    <div>  <a class="text-grey" href="/games">Games</a>
                          </div>
                          <div>
                            <a
                            class="text-grey"
                            href="/chat">Chat</a>
                          </div>
                          <div>
                            <a
                            class="text-grey"
                            href="/relax">Relax</a>
                          </div>
    <div class="info-mini-liks">Your ideal and extraordinary place for games and pastime!</div>

           
  </div>

  <!-- Help Community -->
  <div class="game-info">           
    <h3 style="color: #fff;">Help Community</h3>
    <div>
                            <a
                            class="text-grey"
                            href="/chat">Chat</a>
                          </div>
    <div class="info-mini-liks">Join our dynamic community for help, discussions.
      If you have any questions please contact us by supercryptomegagames@gmail.com
    </div>
  </div>

  <!-- About Us -->
  <div class="game-info">
    <h3 style="color: #fff;">About Us</h3>
    <a class="text-grey"  href="/privacy">Privacy Policy</a>
    <br>
<a class="text-grey"  href="/terms">Terms and Conditions</a>
    <div class="info-mini-liks">We respect our users and provide them best security and privacy!</div>



  </div>

  <!-- Sponsors -->
  <div class="game-info">
    <h3 style="color: #fff;">Sponsors</h3>
    <div>
                            <a
                            class="text-grey"
                            href="https://t.me/moneytech27" target="_blank">Money-Tech</a>
                          </div>
    <div class="info-mini-liks">Our main sponsor is
      Money-Tech company.  </div>
    
  </div>
 
  <!-- Description -->
  <div class="game-info">
    <h3 style="color: #fff;">Description</h3>
    <div class="info-mini-liks">
      We growing extremely quickly so don’t miss your chance to be in this stream with KEF</div>
  </div>

</div>



<v-divider style="margin: auto; max-width: 1200px;"></v-divider>
<div style="max-width: 1200px; margin: auto;   padding: 20px;">
 <h3  style="margin: 30px 0px; word-break: break-word;
    white-space: pre-wrap;">Available currencies</h3> 
<div style="display: grid;grid-template-columns: repeat(auto-fill,minmax(100px, 1fr)); grid-gap: 0;">

<v-img 
      v-for="logo in logos" 
      :key="logo" 
      style="width: 100%; max-width: 52px; margin: 30px auto; " 
      :src="require(`@/assets/Cryptologos/${logo}.svg`)"
  >
  </v-img>

</div>


</div>
<v-divider style="margin: auto; max-width: 1200px;"></v-divider>
<div style="text-align: center; max-width: 1200px; margin: auto; padding: 20px;">
  <v-img style="min-height: 54px; max-width: 96px; margin: 20px auto 40px auto;
        " :src="require('@/assets/kefu.svg')"/>
        <div style="word-break: break-word;color: gray; margin-bottom: 20px;
    white-space: pre-wrap;">Copyright © 2024 KEF.<br> All rights reserved
 <br>

 You can contact us by this email
supercryptomegagames@gmail.com
<br>
<a class="text-grey"  href="/privacy">Privacy Policy</a>
    <br>
<a class="text-grey"  href="/terms">Terms and Conditions</a>

</div>







</div>
    </div>
</template>

<script>

export default {
    name: 'bottom-info',

 data() {
    return {
      logos: ['Currency=btc','usdt','Currency=Ethereum','bnb','euro-logo','lite','doge', 'usdc', 'btccash', 'ada', 
         'matic', 'trx',],
   
    };
  },
}

</script>

<style scoped>

.info {
  background-color: #090e14;

  width: 100%;
  

  margin-bottom: 0;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;


}

.game-info{

  flex: 1; margin: 10px; 
}
.info-mini-liks{
color: gray;
word-break: break-word;
   
}
</style>