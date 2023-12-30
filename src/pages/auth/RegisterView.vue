


<template>
  <div class="jjl">
    <div style="max-width: 90%; max-height: 100%; width: 420px;   
    ">
         <div style="display: flex; max-width: 100%; width: 306px; height: 171px; margin: auto; margin-bottom: 20px;">
            <img style=" width: 100%; 
             background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')" />
          </div>
          <v-card class="mx-auto px-8 pt-8 pb-4" elevation="0" rounded="lg  "
           style="background-color: rgb(37, 56, 74); border: 7px solid rgb(37, 56, 74); ">
  <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >

                    <v-text-field
                        density="compact"
                        placeholder="Username"
                        variant="solo"
                        v-model="username"
                        style="margin-top: 15px;"
                        :readonly="loading"
                        @input="removeSpaces('username')"
                        hide-details="true"
                    ></v-text-field>
                    
   

  
                    <v-text-field
                        density="compact"
                        placeholder="Email"
                        variant="solo"
                        v-model="email"
                        style="margin-top: 45px;"
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



                    
    
                    
        
   <div v-if="errorMessage" style="display: flex;  justify-content: center;
     color: red;  min-height: 45px;"> <p style="margin-top: auto;">
                        {{ errorMessage }}
                      </p>
                    </div>



                    <div style="display: flex; align-items: center;
                     margin: auto; width: 100%; min-height: 65px;">
  <label class="container" >
    <input type="checkbox" v-model="agree" required checked="checked">
    <div class="checkmark">
      <font-awesome-icon v-if="agree" style="color: rgb(37, 56, 74); margin: auto;" :icon="['fas', 'check']" />
    </div>
  </label>
  <div  class="text-grey">
    I accept the
    <a class="text-grey" href="/terms" target="_blank">
      Terms & Conditions
    </a>
  </div>
</div>  
    <v-btn
                        block
                        rounded="lg"
                        type="submit"
                        style="height: 46px; 
                        background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));"
                        :ripple="false"
                        :loading="loading"
                        @click="register(username, email, password, agree)"
                        size="large"
                    >
                    <strong>REG</strong>
                        <template v-slot:loader>
                            <v-progress-circular :size="25" :width="2"
      indeterminate
    
    ></v-progress-circular>
      </template>
                    </v-btn>

  </v-form>

                    <v-card-text class="text-white" style="text-align: center;
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

</template> 

<script>
  export default {
  data: () => ({
    visible: false,
    username: "",
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
    form: false,
    agree: false,
       
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
      register(username, email, password, agree) {
    
           
            this.$store
                .dispatch("register", { username, email, password, agree })
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
overflow-y: auto;
}

/* Hide the default checkbox */
.container input {
 position: absolute;
 opacity: 0;
 cursor: pointer;
 height: 0;
 width: 0;


}

.container {
 display: block;
 position: relative;
 cursor: pointer;
 font-size: 20px;
 user-select: none;

padding-right: 10px;

}

/* Create a custom checkbox */
.checkmark {

 position: relative;
 top: 0;
 left: 0;
 height: 27px;
 width: 27px;
 background-color: white;
 border-radius: 5px;
 display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {

 transition: all 0.2s;
 opacity: 1;
 background-image: linear-gradient(45deg, rgb(99, 254, 202) 0%, rgb(127, 255, 244) 100%);
}

.container input ~ .checkmark {
 transition: all 0.2s;
 opacity: 1;

}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
 content: "";
 position: absolute;
 opacity: 0;
 transition: all 0.2s;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
 opacity: 1;
 transition: all 0.2s;
}

/* Style the checkmark/indicator */

</style>