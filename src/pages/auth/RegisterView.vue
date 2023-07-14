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


          <div style="display: flex; max-width: 100%; width: 340px;height: 191.25px; margin: auto; margin-bottom: 20px;">
  <v-img
   style="margin: auto;"
    
    src="@/assets/kef.png"
  ></v-img>

      </div>
  <v-card
    class="mx-auto pa-8 pb-8"
    elevation="8"
    
    rounded="lg"

    
    style="background-color: #384f62 ; border: 7px solid #384f62;"
  >

    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      Username
    </div>

    <v-text-field
      density="compact"
      placeholder=""
      v-model="username"
      variant="solo"
    ></v-text-field>

    <div style="color: white;" class="text-subtitle-1  text-color-white d-flex align-center justify-space-between">
      Email
    </div>

    <v-text-field
      density="compact"
      placeholder=""
      v-model="email"
      variant="solo"
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
    ></v-text-field>


    <div style="height: 35px; max-height: 35px; width: 400px;" class="text-subtitle-1 ">
                       <div style="color: red; text-align: left; " v-if="errorMessage">{{ errorMessage }}</div>
                       
                    </div>
    <v-btn
      @click="register(username, email, password, password_confirm)"
      block
      class="mb-8"
      color="blue"
      size="large"
     
    >
    REG
    </v-btn>
  
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
    errorMessage: ""
       
  }),


  methods: {
      register(username, email, password, password_confirm) {
           
            this.$store
                .dispatch("register", { username, email, password, password_confirm })
                .then((res) => {
                    console.log("Register success!");
                    this.$router.replace({name: "login"})
                })
                .catch((err) => {
                    console.log("Register error " + err);
                    this.errorMessage = err;
                });
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
z-index: 2;
}

::-webkit-scrollbar {
  width: 0px;
  
  
}
</style>