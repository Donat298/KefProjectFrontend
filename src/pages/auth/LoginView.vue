<template>
    <div class="jjl">
 
        <div style="max-width: 90%; max-height: 100%; width: 420px;">
          <div style="display: flex; max-width: 100%; width: 306px; height: 171px; margin: auto; margin-bottom: 20px;">
            <img style=" width: 100%; 
             background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')" />
          </div>
          <v-card class="mx-auto px-8 pt-8 pb-4" elevation="0" rounded="lg  "
           style="background-color: rgb(37, 56, 74); border: 7px solid rgb(37, 56, 74)">
            <v-form v-model="form" @submit.prevent="onSubmit">
           
                    <v-text-field
                        density="compact"
                        placeholder="Email"
                        variant="solo"
                        v-model="email"
                        style="margin-top: 15px;"
                        :readonly="loading"
                        @input="removeSpaces('email')"
                        hide-details="true"
                    ></v-text-field>
                    

                  
                    <v-text-field
                        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Password"
                        variant="solo"
                        style="margin-top: 45px;"
                        @click:append-inner="visible = !visible"
                        v-model="password"
                        @input="removeSpaces('password')"
                        :readonly="loading"
                        hide-details="true"
                    ></v-text-field>
                    


                    
           
                    <div style="display: flex;
                     align-items: center; justify-content: center;  color: red; min-height: 45px;">
                        {{ errorMessage }}
                    </div>

                    <v-btn
                        block
                        rounded="lg"
                        type="submit"
                        style="height: 46px; 
                        background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));"
                        :ripple="false"
                        :loading="loading"
                        @click="login(email, password)"
                        size="large"
                    >
               <strong>Log In </strong>
                        <template v-slot:loader>
                            <v-progress-circular :size="25" :width="2"
      indeterminate
    
    ></v-progress-circular>
      </template>
                    </v-btn>
                </v-form>
                    

                    <v-card-text class="text-white" style="text-align: center;
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
        removeSpaces(fieldName) {
    // Get the current value of the field
    let value = this[fieldName];

    // Remove spaces from the value
    value = value.replace(/\s/g, '');

    // Update the field with the modified value
    this[fieldName] = value;
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
    
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    overflow-y: auto;
}


</style>
