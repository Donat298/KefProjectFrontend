
<template>
    <v-layout  class="">
      <v-navigation-drawer
      style="z-index: 3; min-height: 100%; background-color: #192635 ; border-right: 2px solid #192635;"
      :rail="rail"
      v-model="drawer"
      elevation="0"
      rail-width="74"
      width="240"
    >
      <NavigationHeader v-if="!rail"/>
      <NavigationList/>
    
  
    </v-navigation-drawer>
        <v-app-bar    :elevation="5" style="z-index: 1; background-color: #15212c ;">
                
            <div v-if="showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            <button v-if="!rail " style="color: #ffffff; background-color: #15212c00; width: 64px; height: 64px;" 
       @click="rail = true"><fa icon="fas fa-angle-double-left" /></button>
       
                    <button v-if="rail " style="width: 64px; height: 64px;color: #ffffff; background-color: #15212c00;" 
                      @click="rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>


                    <div v-if="!showRbsb" style="justify-self: start; display: block;  position:fixed; background-color: ;" >
            
                    <button style="width: 64px; height: 64px;color: #ffffff;  background-color: #15212c00;" 
                      @click="drawer = true; rail = false"><fa icon="fas fa-angle-double-right" /></button>
                    </div>
            
                    <div style="max-width: 1250px; width: 1250px;   max-height: 64px; 
     margin: 0 auto; justify-content: center; align-items: center; display:flex;">        
            <v-menu location="center"  transition="slide-y-transition">
            
              <template v-slot:activator="{ props }">
              
     
        
        <div style=" flex: 1; display: flex;  justify-content: center; align-items: center; ">
          <v-card :ripple="false" v-bind="props" class="left-rounded pa-4" v-if="$store.getters.isAuthenticated" color="#0c141b" style="
            height: 48px; margin-left: 64px; display: flex; align-items: center;" elevation="0">
   <div style="color: #ffffff; font-size: 18px;   min-height: 30px;  text-align: center; display: flex;
    align-items: center; justify-content: center;">
    {{ $store.getters.userDetail[selectedCurrency] }}
</div>


<img style="display: flex; align-items: center; 
width: 22px; max-height: 25px; margin-left: 10px;" :src="getCurrencyImagePath(selectedCurrency)" />
 
  </v-card>

<v-btn  v-if="$store.getters.isAuthenticated" :ripple="false" @click="$emit('ShowDepositOknoo')" color="black"  style=" 
height: 48px;   border-radius: 0px 5px 5px 0px;
background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); ">
  {{ buttonLabel }}
</v-btn>
          
</div>
 
</template>
         
<v-list
elevation="7"
  style=" 
    visibility: visible;
    opacity: 1;
    background-color: #0c141b;
    color: #ffffff;
    margin-top: 65px;
    min-width: 100px;
    " 
>

  <v-list-item @click="selectCurrency('balanceeur')" style="height: 40px; align-items: center;">
    <div style="display: flex; justify-content: flex-end; align-items: center;">
      {{ $store.getters.userDetail.balanceeur }}
      <div class="ml-2" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
        <img 
          style="display: flex; align-items: center; 
          width: 22px; max-height: 25px; margin-left: 10px;" 
          :src="getCurrencyImagePath('balanceeur')" 
        />
        <div class="ml-2" style="min-width: 60px; ">
          EUR
        </div>
      </div>
    </div>
  </v-list-item>

  <v-list-item @click="selectCurrency('balancebtc')" style="height: 40px; align-items: center;">
    <div style="display: flex; justify-content: flex-end; align-items: center;">
      {{ $store.getters.userDetail.balancebtc }}
      <div class="ml-2" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
        <img 
          style="display: flex; align-items: center; 
          width: 22px; max-height: 25px; margin-left: 10px;" 
          :src="getCurrencyImagePath('balancebtc')" 
        />
        <div class="ml-2" style="min-width: 60px; ">
          BTC
        </div>
      </div>
    </div>
  </v-list-item>

  <v-list-item @click="selectCurrency('balance')" style="height: 40px;
   align-items: center;">
    <div style="display: flex; justify-content: flex-end; align-items: center;"> <!-- Add align-items: center; here -->
      {{ $store.getters.userDetail.balance }}
      <div class="ml-2" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
        <img 
          style="display: flex; align-items: center; 
          width: 22px; max-height: 25px; margin-left: 10px;" 
          :src="getCurrencyImagePath('balance')" 
        />
        <div class="ml-2" style="min-width: 60px; ">
          USDT
        </div>
      </div>
    </div>
  </v-list-item>

  <v-list-item @click="selectCurrency('balanceeth')" style="height: 40px;
   align-items: center;">
    <div style="display: flex; justify-content: flex-end; align-items: center;"> <!-- Add align-items: center; here -->
      {{ $store.getters.userDetail.balanceeth }}
      <div class="ml-2" style="min-width: 100px; display: flex; justify-content: flex-end; align-items: center;">
        <img 
          style="display: flex; align-items: center; 
          width: 22px; max-height: 25px; margin-left: 10px;" 
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
            
            <template v-slot:activator="{ props}">
       
              <div v-if="!$store.getters.isAuthenticated" class=" v-hidden-md-and-up" style=" padding: 14px; ">
                  <v-btn elevation="4" variant="tonal" @click="$router.push('/auth/register')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); margin-right: 15px;">Register</v-btn>
                  <v-btn elevation="4" variant="tonal" @click="$router.push('/auth/login')" style="background: linear-gradient(230deg,aquamarine, rgb(127, 255, 244)); ">Login</v-btn>
              </div>
              <div v-else style="display: flex; align-items: center; justify-content: center; height: 64px; width: 64px; margin-left: auto;">
    <!-- <v-btn color="white" v-bind="props" icon="mdi-account" :ripple="false"></v-btn>-->
    <my-button2 v-bind="props" style="display: flex; align-items: center; justify-content: center; 
    background-color: #15212c; height: 48px; width: 48px; border-radius: 50px;">
    <fa icon="fa-solid fa-user fa-2xl" style="color: #ffffff;height: 20px; "></fa>
</my-button2>

</div>

</template>
      
              <v-list
              elevation="7"
              style=" 
                  visibility: visible;
                  opacity: 1;
                  
                  background-color: #273d53;
                  color: #ffffff;
                  
                  margin-top: 65px;
                  min-width: 100px;">
              <v-list-item style="height: 40px;" @click="$emit('ShowAccountOknoo')"
                  >Account</v-list-item>
                 
              <v-list-item style="height: 40px;" @click="logout()"
              >Logout</v-list-item>
             
              </v-list>

          </v-menu>
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
      showRbsb: window.innerWidth >= 1280,
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
  },
  destroyed() {
    window.removeEventListener("resize", this.updateRbsbVisibility);
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
      this.showRbsb = window.innerWidth >= 1280;
    },
    handleResize() {
    this.windowWidth = window.innerWidth;
  },
  },
  computed: {
  buttonLabel() {
    return this.windowWidth > 400 ? 'Wallet' : 'W';
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
</style>




