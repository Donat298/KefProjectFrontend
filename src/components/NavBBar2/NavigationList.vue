<template>
    <v-list
          density="compact"
          nav
          color="teal"
          class="pa-2"
          
        >
        <v-card  color="rgb(37, 56, 74)" elevation="0"> 
          <v-card-actions  @click="show = !show" class=" ma-2">
            <v-list-item  rounded="lg" style="color: #ffffff;"  title="Main" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      
      height="40"
      width="40"
      color="white"
        :icon="show ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
      
    </v-card-actions>
    <v-expand-transition >
      <div v-show="show">
        <v-divider :thickness="2" color="white"></v-divider>
        <v-card color="rgb(37, 56, 74)" elevation="0" class="pb-2 pt-2 ">
        <v-list-item class="mr-2 ml-2 mb-2"  style="color: #ffffff;  "
         to="/" prepend-icon="mdi-home" title="Home" ></v-list-item>
          
          <v-list-item class=" mr-2 ml-2 mb-2"  style="color: #ffffff;  " 
          to="/image" prepend-icon="mdi-image" title="Image" ></v-list-item>
        </v-card>
        </div>
    </v-expand-transition>
          
        </v-card>


        <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;"> 
          <v-card-actions height="40" @click="show2 = !show2" class=" ma-2">
            <v-list-item rounded="lg" style="color: #ffffff;"   title="Tests" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show2 ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show2">
        <v-divider :thickness="2"  color="white"></v-divider>

        <v-card color="rgb(37, 56, 74)" elevation="0" class="pb-2 pt-2 ">
          <v-list-item class=" mr-2 ml-2" style="color: #ffffff;  " 
          to="/SignUptest1" prepend-icon="mdi-login" title="SignUptest1" ></v-list-item>
          <v-list-item class=" mr-2 ml-2"  style="color: #ffffff;  " 
          to="/SignUptest2" prepend-icon="mdi-login" title="SignUptest2" ></v-list-item>
          <v-list-item class=" mr-2 ml-2 " style="color: #ffffff;  "
           to="/chat" prepend-icon="mdi-chat" title="Chat" ></v-list-item>
        </v-card>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card color="rgb(37, 56, 74)" elevation="0" style="margin-top: 8px;"> 
          <v-card-actions height="40" @click="show3 = !show3" class=" ma-2">
            <v-list-item rounded="lg" style="color: #ffffff;"   title="Games" ></v-list-item>

      <v-spacer></v-spacer>

      <v-btn 
      height="40"
      width="40"
      color="white"
        :icon="show3 ? 'mdi-chevron-down' : 'mdi-chevron-right'"
        
      ></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show3">
        <v-divider :thickness="2"  color="white"></v-divider>

        <v-card color="rgb(37, 56, 74)" elevation="0" class="pb-2 pt-2 ">
          <v-list-item class=" mr-2 ml-2 mb-2"  style="color: #ffffff;  "
           to="/wheel" prepend-icon="mdi-cube" title="Wheel" ></v-list-item>
           <v-list-item class=" mr-2 ml-2 mb-2"  style="color: #ffffff;  "
           to="/BalanceManag" prepend-icon="mdi-cube" title="BalanceManag" ></v-list-item>
          
        </v-card>
        </div>
      </v-expand-transition>
    </v-card>
        </v-list>
  </template>
  
  <script>

  
  export default {
    
    data() {
    return {
      drawer: null,
      rail: false,
      showRbsb: window.innerWidth >= 1280,
      show: true,
      show2: true,
      show3: true,
      
        
    
   
        
    };
  }
}
  </script>
  