<template>
    <div class="jjl">
        <div
            style="
                max-width: 90%;
                width: 460px;
                align-items: center;
                max-height: 100%;
                justify-content: center;
                overflow-y: auto;
            "
        >
            <div
                style="
                    
                    max-width: 420px;
                    margin-left: auto;
                    margin-right: auto;
                "
            >
                <div
                    style="
                        display: flex;
                        max-width: 100%;
                        width: 340px;
                        height: 191.25px;
                        margin: auto;
                        margin-bottom: 20px;
                        
                    "
                >
                    <v-img
                        style="margin: auto"
                       
                       
                        src="@/assets/kef.png"
                    ></v-img>
                </div>
                <v-card
                    class="mx-auto pa-8 pb-8"
                    elevation="8"
                    rounded="lg"
                    style="background-color: #384f62; border: 7px solid #384f62"
                >
                    <div
                        style="color: white"
                        class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                    >
                        Email
                    </div>

                    <v-text-field
                        density="compact"
                        placeholder=""
                        variant="solo"
                        v-model="email"
                    ></v-text-field>

                    <div
                        style="color: white"
                        class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                    >
                        Password
                    </div>

                    <v-text-field
                        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder=""
                        variant="solo"
                        @click:append-inner="visible = !visible"
                        v-model="password"
                    ></v-text-field>


                    
                    <div style=" align-items: center;" >
                       <div class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                        style="color: red; text-align: left ;
                        " >{{ errorMessage }}⠀</div>
                    </div>

                    <v-btn
                        block
                        
                        color="blue"
                        @click="login(email, password)"
                        size="large"
                    >
                        Log In
                    </v-btn>

                    

                    <v-card-text class="text-center" style="max-width: 192px; margin: auto; 
                    margin-top: 20px; padding: 0px;" >
                        <a
                            class="text-blue text-decoration-none"
                            href="/auth/register"
                            rel="noopener noreferrer"
                            
                            
                        >
                            Sign up now</a>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        
    </div>
</template> 
  
  <script>
export default {
    data: () => ({
        visible: false,
        email: "",
        password: "",
        errorMessage: ""
    }),

    methods: {
        login(email, password) {
            
            this.$store
                .dispatch("login", { email, password })
                .then((res) => {
                    console.log("Login success!");
                    this.$router.replace({name: "home"})
                })
                .catch((err) => {
                    console.log("LoginView error " + err);
                    this.errorMessage = err;
                });
        },
    },
};
</script>
  
  <style>
.jjl {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #15212c;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
}

::-webkit-scrollbar {
  width: 0px;
  
  
}
</style>