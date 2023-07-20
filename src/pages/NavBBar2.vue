<template>
    <v-layout  class="">

      
        <v-navigation-drawer style="height: 3000px; z-index: 3;  background-color: rgb(21, 33, 44) ; 
         border-right: 2px solid #273d53;"
        :rail="rail"
        v-model="drawer"
        elevation="0"
        rail-width="80"
        width="240"
        
       
      
        
      >
      <div style="">
      <div style="height: 128px; align-items: center;"><my-button2 @click="$router.push('/')" style=" min-height: 64px;
       background-color: #a04d3d00;
       width: 100%;
       padding: 8px 0px;
       
    
       
        
      border: #4d3da000;"><v-img  v-if="!rail" style="margin-left: auto; width: 200px; 
      margin-right: auto;" src="@/assets/kef.png" ></v-img></my-button2></div>

    <v-list
          density="compact"
          nav
          color="teal"
          class="pa-2"
          
        >
        <v-card  color="rgb(37, 56, 74)" elevation="0" class="pa-2 pb-1"> 
          <v-card-actions @click="show = !show" class="pb-1">
            <v-list-item rounded="lg" style="color: #ffffff;"  prepend-icon="mdi-home" title="Main" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider class="mb-1" color="white"></v-divider>

        <v-list-item rounded="lg" style="color: #ffffff;" to="/" prepend-icon="mdi-home" title="Home" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/games" prepend-icon="mdi-cube" title="Games" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/image" prepend-icon="mdi-image" title="Image" ></v-list-item>
      </div>
    </v-expand-transition>
          
        </v-card>


        <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;" class="pa-2 pb-1"> 
          <v-card-actions @click="show2 = !show2" class="pb-1">
            <v-list-item rounded="lg" style="color: #ffffff;"  prepend-icon="mdi-movie-search-outline" title="Tests" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show2 ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show2">
        <v-divider class="mb-1" color="white"></v-divider>

          
          <v-list-item rounded="lg" style="color: #ffffff;" to="/SignUptest1" prepend-icon="mdi-login" title="SignUptest1" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/SignUptest2" prepend-icon="mdi-login" title="SignUptest2" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/chat" prepend-icon="mdi-chat" title="Chat" ></v-list-item>
        
        </div>
      </v-expand-transition>
    </v-card>
        </v-list>
    </div>
      </v-navigation-drawer>

    

        <v-app-bar    :elevation="5" style="z-index: 1; background-color: #15212c ;
">
                
            <div v-if="showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            <button v-if="!rail " style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
       @click="rail = true"><fa icon="fas fa-angle-double-left" /></button>
       
                    <button v-if="rail " style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click="rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>


                    <div v-if="!showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            
                    <button style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click="drawer = true; rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>
            
                    
            <v-menu location="center"  transition="scale-transition">
            
                <template v-slot:activator="{ props }">
                    
                    
                   
       
                    
                    <v-row  style="max-width: 1250px; height: 64px; max-height: 64px; background-color: #15212c; margin: 0 auto; ">
                       
                        <v-col
                            cols="auto" 
                            style="margin-left: auto;  align-content: center; height: 64px;  max-height: 64px; padding: 0px; "
                        >
                        
                            <div v-if="!$store.getters.isAuthenticated" class=" v-hidden-md-and-up"
                             style=" padding: 14px;">
                                <v-btn
                                    elevation="4"
                                    variant="tonal"
                                    @click="$router.push('/auth/register')"
                                
                                    style="
                                        background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
                                        margin-right: 15px;
              
                                    "
                                >
                                    Register
                                </v-btn>
                                <v-btn
                                    elevation="4"
                                    variant="tonal"
                                    @click="$router.push('/auth/login')"
                                    style="
                                        background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
                                        
                                    "
                                >
                                    Login
                                </v-btn>
                            </div>
                            
                            <div v-else style="height: 64px; padding: 8px;">
                                <v-btn
                                    color="white"
                                    v-bind="props"
                                    icon="mdi-account"
                                >
                                </v-btn>
                            </div>
                            
                        </v-col>
                       
                    </v-row>
                    
                </template>
                
                <v-list
                style="
                    background-color: #273d53;
                    color: #ffffff;
                    
                    margin-top: 65px;
                    min-width: 100px;
                    
                    
                "
                >
                <v-list-item @click="$emit('ShowAccountOknoo')"
                    >Account</v-list-item>

                <v-list-item @click="logout()"
                >Logout</v-list-item>
               
                </v-list>

            </v-menu>
        </v-app-bar>

       
        


        <v-main>
        <div style="/*font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
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

import SidebarLink from '@/pages/NavBBar/SidebarLink.vue'





export default {
    components: { SidebarLink },
  data() {
    return {
      drawer: null,
      rail: false,
      showRbsb: window.innerWidth >= 1280,
      show: true,
      show2: true,
        
    
   
        
    };
  },
  
 
 
  
  created() {
    // Add a listener for window resize events to toggle the showRbsb property based on the screen width
    window.addEventListener("resize", this.updateRbsbVisibility);
  },
  destroyed() {
    // Remove the event listener when the component is destroyed to prevent memory leaks
    window.removeEventListener("resize", this.updateRbsbVisibility);
  },
  methods: {
    logout() {
          this.$store.dispatch("logout");
        },
    updateRbsbVisibility() {
      // Update the showRbsb property based on the screen width
      this.showRbsb = window.innerWidth >= 1280;
    },
  },
 
  

}





</script>
<style>
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
    height: 3000px !important;
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
    height: 0px;
    max-height: 0px;
    opacity: 0.2;
    transition: inherit;
    border-style: solid;
    border-width: thin 0 0 0;
}

</style>





