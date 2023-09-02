
<template>
  <v-layout  class="">
  
    <v-navigation-drawer
    style="z-index: 3; min-height: 100%; background-color: #1d2f3f ; border-right: 2px solid #1d2f3f;"
    :rail="rail"
    v-model="drawer"
    
    rail-width="74"
    width="240"
  >

    <div  style="height: 64px; ">
      
      <button v-if="rail " style="width: 100%; height: 64px;color: #ffffff; background-color: #15212c00;" 
                    @click="rail = false"><fa icon="fas fa-angle-double-right" /></button>
    </div>
    <NavigationList/>
  

  </v-navigation-drawer>
  <v-footer v-if="!showRbsb" height="64" style="background-color: #15212c; overflow-x: auto; z-index: 3" app name="footer">
  
    <v-btn rounded="xl" @click="this.drawer = !this.drawer; rail = false" elevation="4" class="mx-auto glow-button ma-4" :ripple="false"
       style="max-width: calc(33.33% - 10px); min-width: 5px; color: #ffffff; display: flex; flex-direction: column; align-items: center; text-align: center;">
       <v-icon style="color: #ffffff;" icon="mdi-menu"></v-icon>
       <span style="color: #ffffff;  font-size: 13px;">Menu</span>
</v-btn>

  <v-btn rounded="xl" to="/wheel" elevation="4" class="mx-auto glow-button ma-4" :ripple="false"
         style="max-width: calc(33.33% - 10px); min-width: 5px;">
         <v-icon icon="mdi-cards"></v-icon>
         <span style="color: #ffffff;  font-size: 13px;">Games</span>
    
  </v-btn>
  <v-btn rounded="xl" elevation="4" class="mx-auto glow-button ma-4" :ripple="false"
  to="/chat" style="max-width: calc(33.33% - 10px);  min-width: 5px;" >
         <v-icon icon="mdi-chat"></v-icon>
         <span style="color: #ffffff;  font-size: 13px;">Chat</span>
    
  </v-btn>
 
</v-footer>




      <v-app-bar    :elevation="5" style="z-index: 1; background-color: #15212c ;">
     
            
       
          <button v-if="!rail && showRbsbbtn" style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
     @click="rail = true"><fa icon="fas fa-angle-double-left" /></button>          
                    <div v-if="rail " style="width: 64px; height: 64px; "></div>

            


                <button  v-if="!showRbsbbtn && showRbsb" style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
     @click="drawer = true"><fa icon="fas fa-angle-double-right" /></button>
                 
          
                  <div v-if="$store.getters.isAuthenticated" style=" 
                   overflow-x: auto; /* Add this to enable horizontal scrolling when necessary */
    white-space: nowrap; max-height: 64px; max-width: 1200px; 
   margin: auto;  align-items: center;
   display: grid;  grid-template-columns: 1fr auto 1fr; width: 100%;

    ">   
                    <div  style="justify-self: start; display: flex;  position:relative; " >
          
          <button  style="color: #ffffff;  background-color: #15212c00;    padding: 0 1vw;" 
          @click="$router.push('/')">  <v-img  style=" max-height: 64px; max-width: 90px;
background-color: rgba(127, 255, 212, 0); 
 " :src="require('@/assets/kefu.svg')"/></button>




          </div>
     
          <v-menu location="center"  transition="slide-y-transition">
          
            <template v-slot:activator="{ props }">
            
   
      
      <div  style=" flex: 1; display: flex;  justify-content: center; align-items: center; ">
        <div v-bind="props" class="left-rounded pa-4"  style="
          height: 48px; background-color: #0c141b;  display: flex; align-items: center;" elevation="0">
<div style="color: #ffffff;  display: flex; align-items: center; text-align: center;">
  <span style="max-width: 12ch; line-height: 1.5;     font-size: var(--text-size-default); font-weight: 600;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inherit;    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline; box-sizing: border-box;">
 {{ $store.getters.userDetail[selectedCurrency] }}
</span>
  <img style="margin-left: 10px;  width: 22px; " :src="getCurrencyImagePath(selectedCurrency)" />
  
<fa icon="fa-solid fa-chevron-down" style="color: #ffffff;height: 14px; margin-left: 10px;"></fa>
</div>





</div>

<v-btn    :ripple="false" @click="$emit('ShowDepositOknoo')" color="black"  style=" 
font-size: 17px; 
height: 48px;   border-radius: 0px 5px 5px 0px;
background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); ">
<strong>{{ buttonLabel }} </strong>
</v-btn>
        
</div>

            </template>
       
<v-list
elevation="5"
:ripple="false"
style=" 
  visibility: visible;
  opacity: 1;
  background-color: #162a3c;
  color: #ffffff;
  margin-top: 65px;
  min-width: 100px;
  " 
>

<v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;" :ripple="false">
  <div class="hhdd" >
    {{ $store.getters.userDetail.balanceeur }}
    <div class="ml-2 hhpp" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
      <img 
        style="display: flex; align-items: center; 
        width: 22px; max-height: 25px; margin-left: 15px;" 
        :src="getCurrencyImagePath('balanceeur')" 
      />
      <div class="ml-2" style="min-width: 60px; ">
        EUR
      </div>
    </div>
  </div>
</v-list-item>

<v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;"  :ripple="false">
  <div class="hhdd" >
    {{ $store.getters.userDetail.balancebtc }}
    <div class="ml-2 hhpp" >
      <img 
        style="display: flex; align-items: center; 
        width: 22px; max-height: 25px; margin-left: 15px;" 
        :src="getCurrencyImagePath('balancebtc')" 
      />
      <div class="ml-2" style="min-width: 60px; ">
        BTC
      </div>
    </div>
  </div>
</v-list-item>

<v-list-item @click="selectCurrency('balance')" style="height: 40px;
 align-items: center;"  :ripple="false">
  <div class="hhdd" > <!-- Add align-items: center; here -->
    {{ $store.getters.userDetail.balance }}
    <div class="ml-2 hhpp" >
      <img 
        style="display: flex; align-items: center; 
        width: 22px; max-height: 25px; margin-left: 15px;" 
        :src="getCurrencyImagePath('balance')" 
      />
      <div class="ml-2" style="min-width: 60px; ">
        USDT
      </div>
    </div>
  </div>
</v-list-item>

<v-list-item @click="selectCurrency('balanceeth')" style="height: 40px;
 align-items: center;"  :ripple="false">
  <div class="hhdd"> <!-- Add align-items: center; here -->
    {{ $store.getters.userDetail.balanceeth }}
    <div class="ml-2 hhpp" >
      <img 
        style="display: flex; align-items: center; 
        width: 22px; max-height: 25px; margin-left: 15px;" 
        :src="getCurrencyImagePath('balanceeth')" 
      />
      <div class="ml-2" style="min-width: 60px; ">
        ETH
      </div>
    </div>
  </div>
</v-list-item>
</v-list>

          </v-menu>
          
          <v-menu location="center"  transition="slide-y-transition">
          
          <template v-slot:activator="{ props}" >
          
          
            <div style="display: flex; align-items: center; justify-content: center; height: 64px; width: 64px; margin-left: auto;
           ">

  <my-button2 v-bind="props" style="display: flex; align-items: center; justify-content: center; 
  background-color: #15212c; height: 48px; width: 64px; border-radius: 50px;">
  <fa icon="fa-solid fa-user fa-2xl" style="color: #ffffff;height: 20px; "></fa>
</my-button2>


</div>
</template>

            
            <v-list
            elevation="5"
            style=" 
                visibility: visible;
                opacity: 1;
                
                background-color: #162a3c;
                color: #ffffff;
                
                margin-top: 65px;
                min-width: 100px;">
            <v-list-item style="height: 50px; display: flex;" @click="$emit('ShowAccountOknoo')" :ripple="false"
                > <fa icon="fa-solid fa-user fa-2xl" class="mx-auto mr-3" style="color: #ffffff;"></fa> Account </v-list-item>
               
            <v-list-item style="height: 50px;" @click="logout()" :ripple="false"
            ><fa icon="fa-solid fa-right-from-bracket" class="mx-auto mr-3" style="color: #ffffff;"></fa> Logout</v-list-item>
           
            </v-list>
       
        </v-menu>
       
        </div>


        
        <div v-if="!$store.getters.isAuthenticated" style="

    max-height: 64px;
    max-width: 1200px;
    margin: auto;
    display: flex;
    width: 100%;
    overflow-x: auto; /* Add this to enable horizontal scrolling when necessary */
    white-space: nowrap; /* Prevent button text from wrapping */
">
    <button style="color: #ffffff; background-color: #15212c00; padding: 0 1vw;"  @click="$router.push('/')">
        <v-img style="max-height: 64px; max-width: 90px;
         background-color: rgba(127, 255, 212, 0);" :src="require('@/assets/kefu.svg')"/>
    </button>

    <div style="padding: 14px; margin-left: auto; max-height: 64px;  ">
        <v-btn elevation="4"  @click="$router.push('/auth/register')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
         margin-right: 15px; font-size: 17px;"><strong>Register</strong></v-btn>
        <v-btn elevation="4"  @click="$router.push('/auth/login')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244));
        font-size: 17px;"><strong> Login</strong> </v-btn>
    </div>
</div>


        <div v-if="showRbsb" style="justify-self: start;  position:static;width: 64px; height: 64px;" >
                  </div>

      </v-app-bar>


      
      <v-main>
      <div style="
  text-align: center;
  color: #ffffff;
  ">
        <div>
          <router-view/>
        </div>
      </div>
    </v-main> 
     
  </v-layout>
</template>

<script>
import NavigationHeader from '../components/NavBBar2/NavigationHeader.vue';
import NavigationList from '../components/NavBBar2/NavigationList.vue';

export default {
components: { NavigationHeader, NavigationList },
data() {
  return {
    drawer: null,
    rail: false,
    showRbsb: window.innerWidth >= 800,
    showRbsbbtn: window.innerWidth >= 1280,
    windowWidth: 0,
    selectedCurrency: this.$store.getters.selectedCurrency,
//      selectedCurrency: localStorage.getItem('selectedCurrency') || 'balanceeur', // Get from localStorage or use default
//      selectedCurrencyImage: localStorage.getItem('selectedCurrencyImage') || require('../assets/Cryptologos/euro-logo.svg'),
    selectedCurrencyImages: {
      'balance': require('../assets/Cryptologos/tether-usdt-logo.svg'),
      'balanceeur': require('../assets/Cryptologos/euro-logo.svg'),
      'balancebtc': require('../assets/Cryptologos/Currency=btc.svg'),
      'balanceeth': require('../assets/Cryptologos/Currency=Ethereum.svg'),
    },
//      logoSrc: require('../assets/Cryptologos/euro-logo.svg')
  };
},
created() {
  window.addEventListener("resize", this.updateRbsbVisibility);
  window.addEventListener("resize", this.updateRbsbVisibility2);
},
destroyed() {
  window.removeEventListener("resize", this.updateRbsbVisibility);
  window.removeEventListener("resize", this.updateRbsbVisibility2);
},
mounted() {
this.windowWidth = window.innerWidth;
window.addEventListener('resize', this.handleResize);
},
beforeDestroy() {
window.removeEventListener('resize', this.handleResize);
},
methods: {
  selectCurrency(currencyKey) {
    this.selectedCurrency = currencyKey;
    this.selectedCurrencyImage = this.selectedCurrencyImages[currencyKey];

    this.$store.commit('setSelectedCurrency', currencyKey);
  },
  getCurrencyImagePath(currencyKey){
    return this.selectedCurrencyImages[currencyKey];
  },

  logout() {
    this.$store.dispatch("logout");
  },
  updateRbsbVisibility() {
    this.showRbsb = window.innerWidth >= 800;
  },
  updateRbsbVisibility2() {
    this.showRbsbbtn = window.innerWidth >= 1280;
  },
  handleResize() {
  this.windowWidth = window.innerWidth;
},
},
computed: {
buttonLabel() {
  return this.windowWidth > 470 ? 'Wallet' : 'W';
},


}

};
</script>

<style>
.left-rounded {
border-radius: 5px 0px 0px 5px !important;
}
.v-toolbar__content > .v-btn:first-child {
  -webkit-margin-start: 0px;
  margin-inline-start: 0px;
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: 0px;
}
.v-navigation-drawer__scrim {
  z-index: 2 !important;
     position: fixed !important;
  min-height: 100% !important;
  height: calc((100% - 0px) - 0px) ;
  bottom: 0px !important;
  top: 0px !important;
}
.v-list .v-list-item--nav:not(:only-child) {
  margin-bottom: 0px  !important;
}
.v-card-actions {
  align-items: center;
  display: flex;
  flex: none;
  min-height: 40px;
  padding: 0px !important;
}
.v-divider {
  display: block;
  flex: 1 1 100%;
  max-height: 0px;
  opacity: 0.1;   
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
   margin: 0px !important; 
}
.v-list-item--density-default.v-list-item--one-line {
  min-height: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.hhdd{
  display: flex; justify-content: flex-end; align-items: center;
  
}

.hhpp{
  min-width: 100px; display: flex; justify-content: flex-end; align-items: center;
}

.glow-button {
  overflow: hidden;
  background-color: rgb(37, 56, 74);
  color: #ffffff;
  height: 64px;
  width: 100%;
  transition: transform 0.3s,;
  z-index: 0;
  width: 200px;
}



.glow-button:hover {
  transform: scale(1.05);

}
</style>