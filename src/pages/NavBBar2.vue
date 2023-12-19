<template>
  <v-layout > 
  
    <v-navigation-drawer
    style="z-index: 3; min-height: 100%; background-color: #1d2f3f ;
     border-right: 2px solid #1d2f3f;"
    :rail="rail"
    v-model="drawer"
    rail-width="74"
    width="240"
  >


   <div  v-if="!rail" style="padding:0px 20px; width: 100%; 
   min-height: 64px;  display: flex; justify-content: center; align-items: center;">



<v-btn class="glowg-button2" @click="$emit('ShowPromocodeOknoo')"
 rounded="lg" :ripple="false">
  <span style="color: #ffffff;" >Get Bonus</span>
</v-btn>
</div>



  <button v-if="rail" style="width: 100%; height: 64px; color: #ffffff; " @click="rail = false">
    <font-awesome-icon :icon="['fas', 'angle-double-right']" />
  </button>


    <NavigationList/>
  

  </v-navigation-drawer>


  <v-footer v-if="!showRbsb" height="64" 
  style="background-color: #15212c;  z-index: 3" app name="footer">
    <v-btn @click="this.drawer = !this.drawer; rail = false" elevation="4" 
        class="mx-auto glow-button"
        :ripple="false"
        :color="drawer ? '#37556b' : '#2e4659'"
        style="max-width: calc(33.33% - 10px); min-width: 5px; color: #ffffff;
  
         
        flex-direction: column; align-items: center; text-align: center;">
        <v-icon style="color: #ffffff;" icon="mdi-menu"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Menu</span>
    </v-btn>

    <v-btn to="/games" elevation="4" class="mx-auto glow-button"
        :ripple="false"
    
        :color="$route.path === '/games' ? '#37556b' : '#2e4659'"  
        style="max-width: calc(33.33% - 10px); min-width: 5px;
     

         ">
        <v-icon icon="mdi-cards"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Games</span>
    </v-btn>

    <v-btn elevation="4" class="mx-auto glow-button"
        :ripple="false"
        :color="$route.path === '/chat' ? '#37556b' : '#2e4659'" 
        to="/chat" style="max-width: calc(33.33% - 10px); min-width: 5px;
          " >
        <v-icon icon="mdi-chat"></v-icon>
        <span style="color: #ffffff; font-size: 13px;">Chat</span>
    </v-btn>
  </v-footer>


      <v-app-bar    :elevation="0" style="z-index: 1; background-color: #0c141b;
      ">
    <div v-if="showRbsbbtn" style="width: 64px; height: 64px; ">
      <button v-if="!rail && showRbsbbtn" style="color: #ffffff; background-color: #15212c00; 
          min-width: 64px;  height: 64px;" 
     @click="rail = true"><font-awesome-icon :icon="['fas', 'angle-double-left']" />
    </button>  
    </div>
    <button  v-if="!showRbsbbtn && showRbsb" style="color: #ffffff;
     background-color: #15212c00; min-width: 64px; height: 64px;" 
     @click="drawer = true">
     <font-awesome-icon :icon="['fas', 'angle-double-right']" />
    </button>


          
         
          
    <div v-if="$store.getters.isAuthenticated" style="  
                   overflow-x: auto;  ; /* Add this to enable horizontal scrolling when necessary */
 max-height: 64px; max-width: 1200px; 
   margin: auto; 
   display: grid;  grid-template-columns: 1fr auto 1fr; width: 100%;

    "> 
          
         <button style="color: #ffffff; background-color: #15212c00;
         padding-left: 10px;"  @click="$router.push('/')">
      <v-img style="min-height: 54px; max-width: 96px;
        " :src="require('@/assets/kefu.svg')"/>
    </button>
     



          <div style="display: flex; align-items: center;">   
         <ChoseCurrency> 
         </ChoseCurrency>
<def2button @click="$emit('ShowDepositOknoo')">{{ buttonLabel }} 
    <font-awesome-icon  style="color: #15212c;"  :icon="['fas', 'wallet']" /></def2button>
</div>


          <v-menu location="bottom center"  transition="slide-y-transition">
          
          <template v-slot:activator="{props}" >
          
          
 
            <button v-bind="props" 
style="display: flex; align-items: center; 
       justify-content: center; width: 64px; margin: auto; margin-right: 8px; 
       height: 48px; width: 48px;">
  
<font-awesome-icon style="color: #ffffff;height: 20px;"  :icon="['fas', 'user']" />
</button>
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

                
            <v-list-item style="height: 50px;"
             @click="$emit('ShowAccountOknoo')" :ripple="false"
                > 
                <font-awesome-icon class="mr-3" style="color: #ffffff; "  :icon="['fas', 'user']" /> Account </v-list-item>
               
            <v-list-item style="height: 50px;" @click="logout()" :ripple="false"
            >
            <font-awesome-icon class="mr-3" style="color: #ffffff; "  :icon="['fas', 'right-from-bracket']" />
             Logout</v-list-item>

            </v-list>
       
        </v-menu>
      
        </div>


        
        <div v-if="!$store.getters.isAuthenticated" style="

overflow-x: auto; 
    max-width: 1200px;
    margin: auto;
    display: flex;
    width: 100%;
    max-height: 64px;
">
    <button style="color: #ffffff; background-color: #15212c00; width: 116px; padding: 0 10px;" 
     @click="$router.push('/')">
      <v-img style="min-height: 54px; max-width: 96px;
         background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')"/>
    </button>

    <div style="display: flex; margin-left: auto; align-items: center; ">

<Defbutton @click="$router.push('/auth/login')">Login</Defbutton>
<Defbutton  @click="$router.push('/auth/register')">Register</Defbutton>
</div>


</div>


      <div v-if="showRbsb" style=" width: 64px; height: 64px;" >
      </div>
      </v-app-bar>
  
      <v-main>
      <div style="

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


.glowg-button2 {
  background: linear-gradient(45deg,  #000000, #100040, #250040, #000000);
  
  background-size: 200% 100%;
  width: 100%;
  min-height: 40px;
  animation: shimmer 4s infinite linear; /* Adjusted animation duration and timing function */

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