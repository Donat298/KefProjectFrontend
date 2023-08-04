<template>
  <div class="jja" @click.stop="$emit('HideAccountOknoo')">

     <div v-if="showAccComponent" @click.stop="$emit('HideAccountOknoo')" style="
        max-height: 90%;
        width: 100%;
        overflow-y:auto; ">
        <div @click.stop style="       
        max-height: 90%;
         width: 600px;
        min-height: 50px;       
        box-sizing: border-box;       
        margin: auto;">   
    <v-card
      elevation="0"    
      rounded="lg"
      style="background-color: rgb(37, 56, 74); display: flex; width: 600px;" 
    >   
    <div style="background-color: rgb(37, 56, 74);  width: 50%; padding: 20px 10px;">
        <div style="margin: 0 auto; height: 70px; width:70px ; display: flex;">
      <v-avatar 

        color="white"
        size="70"
        rounded="lg"      
      >
      <v-icon  icon="mdi-account" size="xx-large"></v-icon>     
      </v-avatar>
    </div>
   
    <div style="color: #ffffff;   margin-top: 10px; text-align: center;">
        {{ $store.getters.userDetail.username }}     
      </div>      
      <div style="color: #ffffff;  text-align: center;">
        {{ $store.getters.userDetail.email }}     
      </div>      
    </div>  
    <div style="width: 50%;  background-color: #213141; padding: 20px 10px;">
         
      <v-card class=" pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b00" style="
            height: 48px; display: flex; align-items: center; justify-content: center;" elevation="0">
    <div  style="color: #ffffff;   ">
      {{ $store.getters.userDetail.balance }} 
    </div>
    <img style="width: 20px; max-height: 20px; margin-left: 10px;" :src="require('@/assets/Cryptologos/tether-usdt-logo.svg')" />
  </v-card>
    </div >
    </v-card>
      </div>  
      </div>

      <div v-if="showAccComponent === false" @click.stop="$emit('HideAccountOknoo')"
      style=" overflow-y:auto; max-height: 90%; width: 100%; ">
        <div @click.stop style="
        width: 300px;
        margin: auto;
        
        align-items: center;
        min-height: 50px;
        max-width: 90%;
        
        margin: auto;">  
    <v-card  
    elevation="0"  
    rounded="lg"
    style="background-color: rgb(37, 56, 74);  margin-left: auto; margin-right: auto; " 
    >
  
    <div style="background-color: rgb(37, 56, 74);  align-items: center;  padding: 20px 10px; ">
        <div style="margin: auto; display: flex;">
      <v-avatar 
        style="margin-left: auto; margin-right: auto;"
        color="white"
        size="70"
        rounded="lg"      
      >
      <v-icon  icon="mdi-account" size="xx-large"></v-icon>     
      </v-avatar>
    </div>   
    <div style="color: #ffffff;   margin-top: 10px; text-align: center;">
        {{ $store.getters.userDetail.username }}     
      </div> 
      <div style="color: #ffffff;  text-align: center;">
        {{ $store.getters.userDetail.email }}     
      </div>         
    </div>  
    <div style="width: 50%; background-color: #213141; padding: 20px 10px;
     width: 100%;">
      <v-card class=" pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b00" style="
            height: 48px; display: flex; align-items: center; justify-content: center;" elevation="0">
    <div  style="color: #ffffff;   ">
      {{ $store.getters.userDetail.balance }} 
    </div>
    <img style="width: 20px; max-height: 20px; margin-left: 10px;" :src="require('@/assets/Cryptologos/tether-usdt-logo.svg')" />
  </v-card>    
    </div >
    </v-card>
        </div> 
      </div>
     
</div>
</template>
<script>
export default {
  data() {
    return {
      showAccComponent: true,
      isResolutionBelowThreshold: window.innerWidth < 900,
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const screenWidth = window.innerWidth
      const isBelowThreshold = screenWidth < 900
      if (isBelowThreshold) {
        this.showAccComponent = false;
      } else {
        this.showAccComponent = true;
      }
    }
  }
}
</script>
<style scoped>
.jja {
top: 0;
bottom: 0;
right: 0;
left: 0;
background: rgba(0,0,0,0.5);
backdrop-filter: blur(5px);

position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
z-index: 4;
} 

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #15212c;
  border-radius: 30px;  
  margin-block: 15px; 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c4257;
  border-radius: 30px;
}
</style>
