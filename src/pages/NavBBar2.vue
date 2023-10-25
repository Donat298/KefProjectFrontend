<template>
  <v-layout > 
  
    <v-navigation-drawer
    style="z-index: 3; min-height: 100%; background-color: #1d2f3f ; border-right: 2px solid #1d2f3f;

    "
    :rail="rail"
    v-model="drawer"
    
    rail-width="74"
    width="240"
  >

  <div style="min-height: 64px;  display: flex; justify-content: center; align-items: center;">

  <v-btn
    v-if="!rail"
    elevation="4"
    class="glowg-button mr-3"
    :ripple="false"
    style="min-width: 5px;"

   
  >
    <span class="shimmerr-text"><h5>Games</h5></span>
  </v-btn>
  



   

<v-btn v-if="!rail" elevation="4"   class="glowg-button2" :ripple="false" style="min-width: 5px;">
  <span class="shimmerr-text"><h5>Bonuses</h5></span>
</v-btn>





  <button v-if="rail" style="width: 100%; height: 64px; color: #ffffff; " @click="rail = false">
    
   
    <font-awesome-icon :icon="['fas', 'angle-double-right']" />
  </button>
</div>

    <NavigationList/>
  

  </v-navigation-drawer>


  <v-footer v-if="!showRbsb" height="64" style="background-color: #15212c; overflow-y:hidden; z-index: 3" app name="footer">
    <v-btn @click="this.drawer = !this.drawer; rail = false" elevation="4" 
        class="mx-auto glow-button ma-4"
        :ripple="false"
        :color="drawer ? '#37556b' : '#2e4659'"
        style="max-width: calc(33.33% - 10px); min-width: 5px; color: #ffffff;
         transform: skewX(-6deg);
         
        flex-direction: column; align-items: center; text-align: center;">
        <v-icon style="color: #ffffff;" icon="mdi-menu"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Menu</span>
    </v-btn>

    <v-btn to="/wheel" elevation="4" class="mx-auto glow-button ma-4"
        :ripple="false"
    
        :color="$route.path === '/wheel' ? '#37556b' : '#2e4659'" 
        style="max-width: calc(33.33% - 10px); min-width: 5px;
     
    transform: skewX(-6deg);
         ">
        <v-icon icon="mdi-cards"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Games</span>
    </v-btn>

    <v-btn elevation="4" class="mx-auto glow-button ma-4"
        :ripple="false"
        :color="$route.path === '/chat' ? '#37556b' : '#2e4659'" 
        to="/chat" style="max-width: calc(33.33% - 10px); min-width: 5px;
           transform: skewX(-6deg);" >
        <v-icon icon="mdi-chat"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Chat</span>
    </v-btn>
  </v-footer>


      <v-app-bar    :elevation="0" style="z-index: 1; background-color: #0c141b;
      ">
     
            
       
          <button v-if="!rail && showRbsbbtn" style="color: #ffffff; background-color: #15212c00; 
          min-width: 64px;  height: 64px;" 
     @click="rail = true"><font-awesome-icon :icon="['fas', 'angle-double-left']" />
    </button>          
                  

    <div v-if="rail " style="width: 64px; height: 64px; "></div>


                <button  v-if="!showRbsbbtn && showRbsb" style="color: #ffffff;
                 background-color: #15212c00; min-width: 64px; height: 64px;" 
     @click="drawer = true">
     <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>

          
                  <div v-if="$store.getters.isAuthenticated" style="  
                   overflow-x: auto;  overflow-y: hidden; /* Add this to enable horizontal scrolling when necessary */
    white-space: nowrap; max-height: 64px; max-width: 1200px; 
   margin: auto;  align-items: center;
   display: grid;  grid-template-columns: 1fr auto 1fr; width: 100%;

    ">   
                    <div  style="justify-self: start; display: flex;  position:relative; " >
          
          <button  style="color: #ffffff;  background-color: #29384500;    padding: 0 1vw;" 
          @click="$router.push('/')">    <v-img    style="min-height: 54px; max-width: 96px;
         background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')"/>
  
 </button>

          </div>



          <div style="display: flex; ">
          
         <ChoseCurrency> 

         </ChoseCurrency>
         
          <v-btn    :ripple="false" @click="$emit('ShowDepositOknoo')" color="black"  style=" 
font-size: 17px; 
height: 48px;   
background: linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244)); ">
<strong>{{ buttonLabel }}   <font-awesome-icon  style="color: #15212c;"  :icon="['fas', 'wallet']" /> </strong>
</v-btn>
</div>


          <v-menu location="bottom center"  transition="slide-y-transition">
          
          <template v-slot:activator="{ props}" >
          
          
            <div style="display: flex; align-items: center; justify-content: center; height: 64px; width: 64px; margin-left: auto;
           ">

  <button v-bind="props" style="display: flex; align-items: center; justify-content: center; 

         ; height: 48px; width: 48px; border-radius: 50px;">
  
  <font-awesome-icon style="color: #ffffff;height: 20px;  "  :icon="['fas', 'user']" />
</button>


</div>
</template>

            
            <v-list
            elevation="5"
            style=" 
                visibility: visible;
                opacity: 1;
                
                background-color: #1d2f3f;
                color: rgb(255, 255, 255);
                
                margin-top: 10px;
                min-width: 100px;">
            <v-list-item style="height: 50px;  display: flex; align-items: center;"
             @click="$emit('ShowAccountOknoo')" :ripple="false"
                > 
                <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'user']" /> Account </v-list-item>
               
            <v-list-item style="height: 50px;  display: flex; align-items: center; " @click="logout()" :ripple="false"
            >
            <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'right-from-bracket']" /> Logout</v-list-item>
           
            </v-list>
       
        </v-menu>
      
        </div>


        
        <div v-if="!$store.getters.isAuthenticated" style="

    max-height: 64px;
    max-width: 1200px;
    margin: auto;
    display: flex;
    width: 100%;
    overflow-x: auto; 
    overflow-y: hidden;

    white-space: nowrap; 
">
    <button style="color: #ffffff; background-color: #15212c00; padding: 0 1vw;"  @click="$router.push('/')">
      <v-img    style="min-height: 54px; max-width: 96px;
         background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')"/>
    </button>

    <div style="display: flex; margin-left: auto; align-items: center; height: 64px;">
    <v-btn elevation="4" @click="$router.push('/auth/register')" :ripple="false"
    style="background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));
     margin-right: 15px; height: 36px; font-size: 17px;"><strong>Register</strong></v-btn>
    <v-btn elevation="4" @click="$router.push('/auth/login')"  :ripple="false"
    style="background: linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244)); 
    margin-right: 15px; font-size: 17px; height: 36px;"><strong> Login</strong> </v-btn>
</div>


</div>


        <div v-if="showRbsb" style="justify-self: start;  position:static;width: 64px; height: 64px;" >
                  </div>

      </v-app-bar>
  
      <v-main>
      <div style="
  text-align: center;
  color: #ffffff;
  ">
        <div>
          <router-view />
        </div>
      </div>
    </v-main> 

  
  </v-layout>
</template>



<script>
import NavigationHeader from '@/components/NavBBar2/NavigationHeader.vue';
import NavigationList from '@/components/NavBBar2/NavigationList.vue';
import ChoseCurrency from '@/components/DepositComp/ChoseCurrency.vue';


export default {

components: { NavigationHeader, NavigationList, ChoseCurrency },

data() {
    return {
    


      drawer: null,
      rail: false,
      showRbsb: window.innerWidth >= 800,
      showRbsbbtn: window.innerWidth >= 1280,
      windowWidth: 0,
      
      
    };
  },

created() {
  window.addEventListener("resize", this.updateRbsbVisibility);
  window.addEventListener("resize", this.updateRbsbVisibility2);
},
destroyed() {
  window.removeEventListener("resize", this.updateRbsbVisibility);
  window.removeEventListener("resize", this.updateRbsbVisibility2);
},
mounted() {
this.windowWidth = window.innerWidth;
window.addEventListener('resize', this.handleResize);
},
beforeDestroy() {
window.removeEventListener('resize', this.handleResize);
},
methods: {
  
  
  showCustomSnackbar() {
      this.$refs.customSnackbar.openSnackbar("This is a custom snackbar message.");
    },
    showCustomSnackbargames() {
      this.$refs.customSnackbargames.openSnackbar("We Go");
    },

  
  logout() {
    this.$store.dispatch("logout");
  },
  updateRbsbVisibility() {
    this.showRbsb = window.innerWidth >= 800;
  },
  updateRbsbVisibility2() {
    this.showRbsbbtn = window.innerWidth >= 1280;
  },
  handleResize() {
  this.windowWidth = window.innerWidth;
},
},
computed: {
buttonLabel() {
  return this.windowWidth > 470 ? 'Wallet' : '';
},


}

};
</script>

<style>
.left-rounded {
border-radius: 5px 0px 0px 5px !important;
}
.v-toolbar__content > .v-btn:first-child {
  -webkit-margin-start: 0px;
  margin-inline-start: 0px;
}
.v-row {  
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: 0px;
}
.v-navigation-drawer__scrim {
  z-index: 2 !important;
     position: fixed !important;
  min-height: 100% !important;
  height: calc((100% - 0px) - 0px) ;
  bottom: 0px !important;
  top: 0px !important;
}
.v-list .v-list-item--nav:not(:only-child) {
  margin-bottom: 0px  !important;
}
.v-card-actions {
  align-items: center;
  display: flex;
  flex: none;
  min-height: 40px;
  padding: 0px !important;
}
.v-divider {
  display: block;
  flex: 1 1 100%;
  max-height: 0px;
  opacity: 0.1;   
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
   margin: 0px !important; 
}
.v-list-item--density-default.v-list-item--one-line {
  min-height: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.hhdd{
  display: flex; justify-content: flex-end; align-items: center;
  
}

.hhpp{
  min-width: 100px; display: flex; justify-content: flex-end; align-items: center;
}

.glow-button {
  overflow: hidden;

  color: #ffffff;
  max-height: 64px;
  width: 100%;
  z-index: 0;
  width: 200px;
 
}




/* Keyframes for shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Apply shimmer animation to the button */
.glowg-button {
  background: linear-gradient(45deg, #ff00fb, #6745d7, #0095ff, #6745d7, #ff00fb);
  background-size: 200% 100%;
  animation: shimmer 4s infinite linear; /* Adjusted animation duration and timing function */
  color: #fff; /* Text color */
}

.glowg-button2 {
  background: linear-gradient(45deg, #15ff00, #d7d545, #ff5100, #d7d545, #15ff00);
  background-size: 200% 100%;
  animation: shimmer 4s infinite linear; /* Adjusted animation duration and timing function */
  color: #fff; /* Text color */
}

/* Style the text inside the button */
.shimmerr-text {
  color: transparent;
  background: linear-gradient(90deg, #000000 25%, #000000 50%, #000000 75%);
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmer 2s infinite;
}
.v-snackbar__wrapper {
    align-items: center;
    display: flex;
    max-width: auto;
    min-height: auto;
    min-width: auto;
    padding: 0;
    border-radius: 4px;
    left: auto !important;
    transform: none !important;


   
}
.v-overlay {
    border-radius: 0px;
    display: flex;
    margin: 20px !important;
    width: auto;
    pointer-events: none;
    position: fixed;
    top: 0 ;
    bottom: 0 ;
    right: 0;
    justify-content: flex-end; /* Align child elements to the right */
}




</style>