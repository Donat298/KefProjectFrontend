<template>
    <v-layout class="rounded rounded-md">

      
        <v-navigation-drawer style="background-color: #15212c;  border-right: 2px solid #273d53;"
        v-model="drawer"
        elevation="0"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>


      
  


        <v-app-bar :elevation="0" style="z-index: 1; background-color: #273d53;
">
            <div style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            <button v-if="drawer" style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
       @click.stop="drawer = !drawer"><fa icon="fas fa-angle-double-left" /></button>
                    <button v-if="!drawer" style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click.stop="drawer = !drawer"><fa icon="fas fa-angle-double-right" /></button>
                    </div>
            <v-menu transition="scale-transition">
            
                <template v-slot:activator="{ props }">
                    
                    
                   
       
                    
                    <v-row  style="max-width: 1250px; height: 64px;  background-color: #273d53; margin: auto; ">
                        <v-img   style="margin-right: auto; margin-top: auto;margin-bottom: auto; 
                        margin-left: 50px;  max-width: 100px; min-height: 64px" src="@/assets/kef.png" ></v-img>
                        <v-col
                            cols="auto" 
                            style="margin-left: auto; align-content: center; height: 64px; padding: 0px; "
                        >
                        
                            <div v-if="!$store.getters.isAuthenticated" style="height: 64px; padding: 14px; ">
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
            <div class="app">
          <div>
            <router-view />
          </div>
        </div>
      </v-main>

        
    </v-layout>


    
</template>

<script>
export default {
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

