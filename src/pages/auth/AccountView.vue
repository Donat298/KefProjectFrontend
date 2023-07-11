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
    
      class="mx-auto"
       
     
      rounded="lg"
      style="background-color: #384f62; border: 7px solid #213141; display: flex; width: 600px;" 
    >

   
    <div style="background-color: #384f62; ; align-items: center; width: 400px; padding: 20px 10px;">
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

    

    <div style="width: 50%;  align-items: center; background-color: #213141; padding: 20px 10px;
     width: 400px;">
      <div style="margin: auto; background-color: #2c4f5000;"> <v-card
        color="#384f6200"
        style=" height: 70px; display: flex; align-items: center; "
        rounded="lg"
        class=" pa-2"
        elevation="0"  
        ><div style="display: flex; margin: 0 auto; padding-left: 30px;"> <div  style="color: #ffffff; ">{{ $store.getters.userDetail.balance }} USDT </div>
        <v-img style="margin-left: 5px;" max-width="30" src="@/assets/Tether.png"></v-img></div></v-card>
      </div>
    </div >
    </v-card>
      </div>  
      </div>



      <div v-if="showAccComponent === false" @click.stop="$emit('HideAccountOknoo')"
      style=" overflow-y:auto; max-height: 90%; min-width: 300px;width: 100%; ">
        <div v-if="showAccComponent === false" @click.stop style="
       

        width: 300px;
   
     
        margin: auto;
        max-height: 90%;
        align-items: center;
        min-height: 50px;
        min-width: 300px;
       
        
        
        box-sizing: border-box;
        margin: auto;">  
    <v-card
      
      
      
     
      rounded="lg"
      style="background-color: #384f62; border: 7px solid #213141; width: 300px; 
      margin-left: auto; margin-right: auto; " 
    >

   
    <div style="background-color: #384f62;  align-items: center;  padding: 20px 10px; ">
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

    

    <div style="width: 50%;  align-items: center; background-color: #213141; padding: 20px 10px;
     width: 100%;">
      <div style="margin: auto; background-color: #2c4f5000;"> <v-card
        color="#384f6200"
        style=" height: 70px; display: flex; align-items: center; "
        rounded="lg"
        class=" pa-2"
        elevation="0"  
        ><div style="display: flex; margin: 0 auto; "> <div  style="color: #ffffff;  margin: auto;">{{ $store.getters.userDetail.balance }} 
          USDT </div>
        <v-img style="margin-left: 5px; max-width:30px; width: 25px;"  src="@/assets/Tether.png"></v-img></div></v-card>
      </div>
    
     
      
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
z-index: 2;
} 
.jja2 {
  

overflow-y:auto;
margin: auto;
max-height: 90%;

background: rgb(31, 31, 47);
min-height: 50px;
min-width: 300px;
padding: 80px 150px;
border: 7px solid #4d3da0;
border-radius: 40px;
box-sizing: border-box;
} 
::-webkit-scrollbar {
  width: 15px;
  
  
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