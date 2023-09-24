<template>

  <div>
    <div style="overflow-y:auto;  margin-left: auto; margin-right: auto; width: 100%;">
    <v-img class="logh" src="@/assets/5opka.png" />
    <div>

      <h1 class="wet" style="margin-bottom: 30px;">K E F !</h1>
    


    
    <div class="register1" >
    
        
        <my-button2 style="margin-right: 50px;" @click="$router.push('/auth/register')">SignUp</my-button2> 
        <my-button2 @click="$router.push('/auth/login')">SignIn</my-button2>
        <br>
        <my-button2 style="margin-top: 30px; background-color: #4d3da0; border: 10px solid #4d3da0;"  
        @click="$router.push('/SignUptest2')">Login test</my-button2>  
        <font-awesome-icon :icon="['fas', 'coffee']" />
    </div>
    
   </div>
 
  </div>
<Games/>
  </div>

  </template>
  
  <script>
import MyButton2 from '@/components/UI/MyButton2.vue'
import Games from '@/components/Games/Gamesss.vue'
  export default {
  
    
  components: { MyButton2, Games
  
  
  },
  }
  
  </script>
  
  <style>

 


.glob {
  top:64px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color:#15212c00;
  position: fixed;
  
}
.logh {
  justify-content: space-between;
  height: 450px;
  width: 450px;
}
.wet {
  font-size: 60px;
}
  </style>