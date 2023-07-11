<template>
    <v-layout class="rounded rounded-md">

        <v-app-bar :elevation="0" style="z-index: 1; background-color: #15212c">
            <v-menu transition="scale-transition">
                
                <template v-slot:activator="{ props }">
                    
                    <v-row  style=" background-color: #15212c; padding: 0px 20px;">
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
                        margin-top: 25px;
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
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
          
        };
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






v-else