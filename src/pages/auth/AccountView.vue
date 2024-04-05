
<template>

<div class="ppj">
  <div @mousedown="onMouseDown" @mouseup="onMouseUp" class="jja" >


    <div  style="max-height: 90%; width: 100%;">
      <div  @mousedown.stop  @mouseup.stop="onMouseUpCheck" class="authglobpage">
        
        <v-card elevation="0" rounded="lg" class="vcardauth"
   >
      
<div v-if="showAccComponent" style="display: flex; width: 100%;">
          <div style="background-color: #1d2f3f; width: 50%; padding: 5px 10px 20px 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; ">
          <div style="color: #ffffff; padding: 10px;">
            Account   
            <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'user']" />      
          </div>
          </div>  
  <AvatarbTn></AvatarbTn>
    <div style="color: #ffffff;   margin-top: 10px; text-align: center;  font-size: 20px; padding: 5px; ">
        {{ $store.getters.userDetail.username }}     
      </div>      
      <div style="color: #ffffff;  text-align: center; font-size: 17px; padding: 5px;">
        {{ $store.getters.userDetail.email }}     
      </div> 
      <div style="color: #ffffff;  text-align: center; font-size: 17px; padding: 5px;">
        Joined to Kef  {{ formatDate($store.getters.userDetail.created_at) }}  
      </div> 
       
    </div>  

    <div style="width: 50%; background-color: #15212c; padding: 5px 10px 20px 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; height: 45.5px;">
         
       
            <button @click.stop="$emit('HideAccountOknoo')" style="cursor: pointer; margin-left: auto;
             color: #ffffff;
            min-height: 35px;  min-width: 35px; ">
   
             
   <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'xmark']" />
            </button>
         
       
        </div>
         
      <v-card class=" pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b00" style="
            height: 70px; display: flex; align-items: center; justify-content: center;" elevation="0">
    <div  style="color: #ffffff;  min-height: 30px; text-align: center; display: flex;
    align-items: center; justify-content: center;  ">
      {{ $store.getters.userDetail.balanceusdt }} USDT
    </div>
    
    <img style="width: 22px; max-height: 25px; margin-left: 10px;" :src="require('@/assets/Cryptologos/usdt.svg')" />
  </v-card>
    </div >

  </div>

  <div v-else>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 10px; ">
            <div style="color: #ffffff; padding: 10px;">
            Account       <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'user']" />
          </div>
            <button @click.stop="$emit('HideAccountOknoo')" style="cursor: pointer; 
             color: #ffffff;
            min-height: 35px;  min-width: 35px; ">
              <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'xmark']" />
            </button>
        </div>
        <AvatarbTn></AvatarbTn> 
    <div style="color: #ffffff;   margin-top: 10px; text-align: center;  font-size: 20px; ">
        {{ $store.getters.userDetail.username }}     
      </div>      
      <div style="color: #ffffff;  text-align: center; font-size: 17px;">
        {{ $store.getters.userDetail.email }}     
      </div> 
      <div style="color: #ffffff;  text-align: center; font-size: 17px;">
        Joined to Kef  {{ formatDate($store.getters.userDetail.created_at) }}  
      </div>   
        
        <div style="background-color: #1d2f3f; align-items: center; padding: 20px 10px;">     
    </div>  
    <div style="width: 50%; background-color: #15212c; padding: 20px 10px; width: 100%;">
           
      <v-card class=" pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b00" style="
            height: 48px; display: flex; align-items: center; justify-content: center;" elevation="0">
    <div  style="color: #ffffff;   min-height: 30px; text-align: center; display: flex;
    align-items: center; justify-content: center;  ">
      {{ $store.getters.userDetail.balanceusdt }} USDT
    </div>
    <img style="width: 22px; max-height: 25px;  margin-left: 10px;" :src="require('@/assets/Cryptologos/usdt.svg')" />
  </v-card>    
    </div >
  </div>
    </v-card>
      </div>  
      </div>




     
</div>

</div>
</template>
<script>
import AvatarbTn from '@/pages/auth/AvatarbTn.vue'
export default {
  components: { AvatarbTn        
  },
  data() {
    return {
      showAccComponent: true,
      isResolutionBelowThreshold: window.innerWidth < 900,
    };
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const screenWidth = window.innerWidth;
      this.showAccComponent = screenWidth >= 800;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    onMouseDown(event) {
      if (event.button === 0) {
      this.mousePressed = true;
      }
    },
    onMouseUpCheck(event) {
      if (event.button === 0) {
      this.mousePressed = false;
      }
    },
    onMouseUp() {
      if (this.mousePressed) {
        // Emit the custom event when the button is pressed and released
        this.$emit('HideAccountOknoo');
      } 
       this.mousePressed = false;
    },
  },
};
</script>

<style scoped>


@media (max-width: 800px) {
  .authglobpage {
    
    width: 300px; margin: auto; align-items: center; max-width: 90%; margin: auto;

  }

  .vcardauth{

    background-color: #1d2f3f; margin-left: auto; margin-right: auto;

  }

}
@media (min-width: 800px) {
  .authglobpage {
    max-height: 90%; width: 600px;  margin: auto;


  } 
  .vcardauth{
    background-color: #1d2f3f; display: flex; width: 600px;

  }


}
  .jja {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;   display: flex;    align-items: center;

  z-index: 4;

  } 



.ppj{
    top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  position: fixed; 
  z-index: 4;
  overflow-y: auto;
  }


/* Scrollbar styles */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #15212c;
  border-radius: 30px;
  margin-block: 15px;
}

::-webkit-scrollbar-thumb {
  background: #2c4257;
  border-radius: 30px;
}
</style>
