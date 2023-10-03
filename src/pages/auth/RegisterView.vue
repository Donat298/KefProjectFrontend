


<template>
  <div class="jjl">
    <div style="
    width: 460px;
    max-height: 100%;
    align-items: center;
    max-width: 90%;
    justify-content: center; 
    overflow-y: auto;">
      <div style=" max-width: 420px; margin-left: auto; margin-right: auto;">
          <div style="display: flex; max-width: 100%; width: 340px;height: 190px; margin: auto; margin-bottom: 20px;">
            <img style="margin-left: auto; 
                margin-right: auto; width: 100%; height: auto; 
                background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')" />
      </div>
  <v-card
    class="mx-auto pa-8 pb-8 mb-5"
    elevation="8"
    rounded="lg"
    style="background-color: rgb(37, 56, 74) ; border: 7px solid rgb(37, 56, 74);"
  >
  <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      Username
    </div>

    <v-text-field
      density="compact"
      placeholder=""
      v-model="username"
      variant="solo"
      :readonly="loading"
      @input="removeSpaces('username')"
    ></v-text-field>

    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      Email
    </div>

    <v-text-field
      density="compact"
      placeholder=""
      v-model="email"
      variant="solo"
      :readonly="loading"
      @input="removeSpaces('email')"
    ></v-text-field>

    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      password
    </div>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder=""
      v-model="password"
      variant="solo"
      @click:append-inner="visible = !visible"
      :readonly="loading"
      @input="removeSpaces('password')"
    ></v-text-field>

    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      password confirm
    </div>

    <v-text-field
      :append-inner-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="visible2 ? 'text' : 'password'"
      density="compact"
      placeholder=""
      v-model="password_confirm"
      variant="solo"
      @click:append-inner="visible2 = !visible2"
      :readonly="loading"
      @input="removeSpaces('password_confirm')"
    ></v-text-field>


    <div style=" align-items: center;" >
                       <div class="text-subtitle-1 text-color-white d-flex align-center justify-space-between"
                        style="color: red; text-align: left ;
                        " >{{ errorMessage }}⠀</div>
                    </div>
    <v-btn
     
      block
      class="mb-8"
      @click="register(username, email, password, password_confirm)"
      size="large"
      type="submit"
      style="background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));"
      :loading="loading"
      :ripple="false"
    >
    REG
    <template v-slot:loader>
                            <v-progress-circular :size="25" :width="1"
      indeterminate
    
    ></v-progress-circular>
      </template>
    </v-btn>
  </v-form>
  <v-card-text class="text-center text-white" style=" margin: auto; 
                    margin-top: 20px; padding: 0px;" >Already registered? 
                        <a
                            class="text-white "
                            href="/auth/login"             
                        >
                            Login</a>
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
    visible2: false,
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    errorMessage: "",
    loading: false,
    form: false,
       
  }),


  methods: {
    removeSpaces(fieldName) {
    // Get the current value of the field
    let value = this[fieldName];

    // Remove spaces from the value
    value = value.replace(/\s/g, '');

    // Update the field with the modified value
    this[fieldName] = value;
  },
      register(username, email, password, password_confirm) {
           
            this.$store
                .dispatch("register", { username, email, password, password_confirm })
                .then((res) => {
                    console.log("Register success!");
                    this.$router.replace({name: "home"})
                })
                .catch((err) => {
                    console.log("Register error " + err);
                    this.errorMessage = err;
                });
        },
        onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    }
}
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