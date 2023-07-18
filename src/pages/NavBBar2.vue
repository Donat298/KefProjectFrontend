<template>
    <v-layout class="">

      
        <v-navigation-drawer style=" background-color: #15212c;  border-right: 3px solid #273d53;"
        v-model="drawer"
        elevation="0"
        
        
      >
      <div style="">
      <div style=""><my-button2 @click="$router.push('/')" style=" height: 100%;
       background-color: #a04d3d00;
       width: 100%;
       padding: 0px 0px;
       
    
       
        
      border: #4d3da000;"><v-img  class="kefsize" style="margin-left: auto; 
      margin-right: auto;" src="@/assets/kef.png" ></v-img></my-button2></div>

    <v-list
          density="compact"
          nav
          color="teal"
        >
          <v-list-item rounded="lg" style="color: #ffffff;" to="/" prepend-icon="mdi-home" title="Home" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/games" prepend-icon="mdi-cube" title="Games" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/image" prepend-icon="mdi-image" title="Image" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/SignUptest1" prepend-icon="mdi-login" title="SignUptest1" ></v-list-item>
          <v-list-item rounded="lg" style="color: #ffffff;" to="/SignUptest2" prepend-icon="mdi-login" title="SignUptest2" ></v-list-item>
        </v-list>
    </div>
      </v-navigation-drawer>


      
  


        <v-app-bar :elevation="0" style="z-index: 0; background-color: #273d53;
">
            <div style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            <button v-if="drawer" style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
       @click.stop="drawer = !drawer"><fa icon="fas fa-angle-double-left" /></button>
                    <button v-if="!drawer" style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click.stop="drawer = !drawer"><fa icon="fas fa-angle-double-right" /></button>
                    </div>
            <v-menu transition="scale-transition">
            
                <template v-slot:activator="{ props }">
                    
                    
                   
       
                    
                    <v-row  style="max-width: 1250px; height: 64px; max-height: 64px; background-color: #273d53; margin: 0 auto; ">
                       
                        <v-col
                            cols="auto" 
                            style="margin-left: auto; align-content: center; height: 64px;  max-height: 64px; padding: 0px; "
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
                    background-color: #384f62;
                    color: #ffffff;
                    margin-top: 15px;
                    margin-right: 15px;
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
      rail: true,
    
   
        
    };
  },
  methods: {
        logout() {
            this.$store.dispatch("logout");
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


</style>



You can do the same with this code.

