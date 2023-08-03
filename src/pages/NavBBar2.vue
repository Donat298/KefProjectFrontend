
<template>
    <v-layout  class="">
      <v-navigation-drawer
      style="z-index: 3; min-height: 100%; background-color: #192635 ; border-right: 2px solid #192635;"
      :rail="rail"
      v-model="drawer"
      elevation="0"
      rail-width="80"
      width="240"
    >
      <NavigationHeader v-if="!rail"/>
      <NavigationList/>
    </v-navigation-drawer>
        <v-app-bar    :elevation="5" style="z-index: 1; background-color: #15212c ;">
                
            <div v-if="showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            <button v-if="!rail " style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
       @click="rail = true"><fa icon="fas fa-angle-double-left" /></button>
       
                    <button v-if="rail " style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click="rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>


                    <div v-if="!showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            
                    <button style="width: 64px; height: 64px;color: #ffffff;  background-color: #15212c00;" 
                      @click="drawer = true; rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>
            
                    
            <v-menu location="center"  transition="slide-y-transition">
            
              <template v-slot:activator="{ props }">
                <div style="max-width: 1250px; width: 1250px;  max-height: 64px; 
     margin: 0 auto; justify-content: center; align-items: center; display:flex;">
     
        <div style="width: 64px;"></div>
        <div style=" flex: 1; display: flex; justify-content: center; align-items: center; ">
          <v-card class="left-rounded pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b" style="
            height: 48px; display: flex; align-items: center;" elevation="0">
    <p class="text-center" style="color: #ffffff; display: flex; height: 44px; align-items: center;">
      {{ $store.getters.userDetail.balance }} 
    </p>
    <img style="width: 25px; max-height: 25px; margin-left: 10px;" :src="require('../assets/Tether.svg')" />
  </v-card>

<v-btn v-if="$store.getters.isAuthenticated" color="black"  style=" height: 48px;   border-radius: 0px 5px 5px 0px; background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); ">
  {{ buttonLabel }}
</v-btn>
        
        </div>

           
                <div v-if="!$store.getters.isAuthenticated" class=" v-hidden-md-and-up" style=" padding: 14px; ">
                    <v-btn elevation="4" variant="tonal" @click="$router.push('/auth/register')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); margin-right: 15px;">Register</v-btn>
                    <v-btn elevation="4" variant="tonal" @click="$router.push('/auth/login')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); ">Login</v-btn>
                </div>
                <div v-else style="height: 64px;  width: 64px; padding: 8px; margin-left: auto;">
  <v-btn color="white" v-bind="props" icon="mdi-account" :ripple="false"></v-btn>
</div>

            
       
              </div>
  
</template>



           
                <v-list
                style=" 
                    visibility: visible;
                    opacity: 1;
                    
                    background-color: #273d53;
                    color: #ffffff;
                    
                    margin-top: 65px;
                    min-width: 100px;">
                <v-list-item @click="$emit('ShowAccountOknoo')"
                    >Account</v-list-item>
                   
                <v-list-item @click="logout()"
                >Logout</v-list-item>
               
                </v-list>

            </v-menu>
        </v-app-bar>
        <v-main>
        <div style="
    text-align: center;
    color: #ffffff;
    ">
          <div>
            <router-view/>
          </div>
        </div>
      </v-main>  
    </v-layout>
</template>
<script>
import NavigationHeader from '../components/NavBBar2/NavigationHeader.vue';
import NavigationList from '../components/NavBBar2/NavigationList.vue';
export default {
  components: { NavigationHeader, NavigationList },
  data() {
    return {
      drawer: null,
      rail: false,
      showRbsb: window.innerWidth >= 1280,
      windowWidth: 0
    };
  },
  created() {
    window.addEventListener("resize", this.updateRbsbVisibility);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateRbsbVisibility);
  },
  mounted() {
  this.windowWidth = window.innerWidth;
  window.addEventListener('resize', this.handleResize);
},
beforeDestroy() {
  window.removeEventListener('resize', this.handleResize);
},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    updateRbsbVisibility() {
      this.showRbsb = window.innerWidth >= 1280;
    },
    handleResize() {
    this.windowWidth = window.innerWidth;
  },
  },
  computed: {
  buttonLabel() {
    return this.windowWidth > 400 ? 'Deposit' : 'D';
  }
}
  
};
</script>
<style>
.left-rounded {
  border-radius: 3px 0px 0px 3px !important;
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
</style>




