<template>
    <div class="jjl">
      <div style="max-width: 90%; width: 460px; align-items: center; max-height: 100%; justify-content: center; overflow-y: auto;">
        <div style="max-width: 420px; margin-left: auto; margin-right: auto;">
          <div style="display: flex; max-width: 100%; width: 340px; height: 191.25px; margin: auto; margin-bottom: 20px;">
            <img style="margin-left: auto; margin-right: auto; width: 100%; height: auto; background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')" />
          </div>
          <v-card class="mx-auto pa-8 pb-8 mb-5" elevation="8" rounded="lg" style="background-color: rgb(37, 56, 74); border: 7px solid rgb(37, 56, 74)">
            <v-form v-model="form" @submit.prevent="onSubmit">
                    <div
                        style="color: white"
                        class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                    >
                        Email
                    </div>

                    <v-text-field
                        density="compact"
                        placeholder="must contain @"
                        variant="solo"
                        v-model="email"
                   
                        :readonly="loading"
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
                        placeholder="min 6 characters"
                        variant="solo"
                        @click:append-inner="visible = !visible"
                        v-model="password"
                     
                        :readonly="loading"
                    ></v-text-field>
                    


                    
                    <div style=" align-items: center;" >
                       <div class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                        style="color: red; text-align: left ;
                        " >{{ errorMessage }}⠀</div>
                    </div>

                    <v-btn
                        block
                        type="submit"
                        color="secondary"
                        :ripple="false"
                        :loading="loading"
                        @click="login(email, password)"
                        size="large"
                    >
                        Log In
                    </v-btn>
                </v-form>
                    

                    <v-card-text class="text-center text-white" style="max-width: 192px; margin: auto; 
                    margin-top: 20px; padding: 0px;" >No account? 
                        <a
                            class="text-white "
                            href="/auth/register"
                            
                            
                            
                        >
                            Sign up</a>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        
    </div>
</template> 
  
  <script>
export default {
    data: () => ({
        form: false,
        visible: false,
        email: "",
        password: "",
        errorMessage: "",
        loading: false,
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
        onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      
    },
};
</script>
  
  <style scoped>
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
Same for this