<template>

  <div>
    <div style="overflow-y:auto;  margin-left: auto; margin-right: auto; width: 100%;">
    <v-img class="logh" src="@/assets/5opka.png" />
    <div>

      <h1 class="wet" style="margin-bottom: 30px;">K E F ?</h1>
    


      
    <div class="register1" >

    


        <v-btn style="margin-right: 50px;  background-color: #4d3da0; border: 10px solid #4d3da0;" @click="$router.push('/auth/register')">SignUp</v-btn> 
        <v-btn style="margin-right: 50px;  background-color: #4d3da0; border: 10px solid #4d3da0;" @click="$router.push('/auth/login')">SignIn</v-btn>
        <br>
     
        <v-btn style="margin-top: 30px; background-color: #4d3da0; border: 10px solid #4d3da0;"  
        @click="$router.push('/SignUptest2')">Login test</v-btn>  
   
      
       
    </div>
    
   </div>
 
  </div>

  </div>

  </template>
  
  <script>


  export default {
  
    
  components: { 
  
  
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