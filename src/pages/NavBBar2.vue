<template>
    <v-layout class="rounded rounded-md">

      
        <v-navigation-drawer style="background-color: #384f62;"
        v-model="drawer"
        
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


        <v-app-bar :elevation="0" style="z-index: 1; background-color: #15212c">
            <v-menu transition="scale-transition">
                
                <template v-slot:activator="{ props }">
                    <v-btn
            color="primary"
            @click.stop="drawer = !drawer"
          >
            Toggle
          </v-btn>
                    
                    <v-row  style="max-width: 1000px; margin-left: auto; margin-right: auto; background-color: #233647; padding: 0px 0px;">
                        <v-col
                            cols="auto"
                            style="margin-left: auto;"
                        >
                        
                            <span v-if="!$store.getters.isAuthenticated">
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
                                        margin-right: 5px;
                                    "
                                >
                                    Login
                                </v-btn>
                            </span>
                            
                            <span v-else>
                                <v-btn
                                    color="white"
                                    v-bind="props"
                                    icon="mdi-account"
                                >
                                </v-btn>
                            </span>
                            
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
    data () {
      return {
        drawer: null,
      }
    },


    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
    },
};
</script>

<style>
</style>



<!--
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
-->

