<template>
    <div v-if="!$store.getters.isAuthenticated"
    style=" top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
 
  display: flex;"><div style="padding-bottom: 40px; margin: auto;"> <div style="">
   
  
  <div style="margin-bottom: 30px; "><h1> Login or Register First!</h1></div>
  <span>
    <v-btn 
                                    elevation="4"
                                    size="large"
                                    variant="tonal"
                                    href="/auth/register"
                                    style="

                                        background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
                                        margin-right: 15px;
                                        color: black;
                                    "
                                >
                                    Register
                                </v-btn>
                                <v-btn
                                    size="large"
                                    elevation="4"
                                    variant="tonal"
                                    @click="$router.push('/auth/login')"
                                    style="
                                        background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
                                        margin-right: 5px;
                                        color: black;
                                    "
                                >
                                    Login
                                </v-btn>
                            </span>

  </div> 
</div>
  
  </div>





</template>
<script></script>