<template>
    <div v-if="$store.getters.isAuthenticated"  class="glob">
      <div style="overflow-y:auto;  margin-left: auto; margin-right: auto; width: 100%;">
       
    <v-img class="logh" src="@/assets/5opka.png" />
    
    <h1 class="wet" style="margin-bottom: 30px;">Create your Account</h1>
    
      <div class="register1">
          <div class="wett">
           <my-button2  @click="showOkno">Create Account <fa icon="fa-solid fa-user-plus"></fa>
           </my-button2>
           
          </div> 
          <div>
              <input class="wet2" v-if="accounts.length > 0"
              placeholder="Search Account Name"
              style="display: block;max-width: 210px;margin-bottom: 35px;"
              v-model="searchQuery"
              v-focus
              type="text">
          </div>  
          
        <my-okno :show="oknoVisible">
          <SignUp
        @create="createAcc"
        @cre="NoVisibleOkno"
        @search3="showSearch"
        />
        </my-okno>
    
        <AccList 
          :accounts="SASP"
          @remove="deleteAcc"
        />
      </div>
    </div>
    
     </div>
     <IfnotAuth v-if="!$store.getters.isAuthenticated"></IfnotAuth>
   
    </template>
    
    <script>
    import SignUp from '@/components/SignUpEx1/SignUp.vue';
    import IfnotAuth from "@/components/IfnotAuth/IfnotAuth.vue";
    import AccList from '@/components/SignUpEx1/AccList.vue';
    
    
    export default {
      name: 'App',
      components:{
        
        SignUp, AccList,IfnotAuth
        
        
      },
      data() {
        return {
          accounts: [],
          oknoVisible: false,
          oknooVisible: false,
          sectedSord:'',
          searchQuery:''
        }
      },
      methods: {
        createAcc(account1) {
          this.accounts.push(account1);
          this.oknoVisible = false;
          this.searchVisible = true;
        },
        deleteAcc(account1) {
          
          this.accounts = this.accounts.filter(a => a.id !== account1.id)
        },
        showOkno() {
          this.oknoVisible = true;
        },
        showOknoo() {
          this.oknooVisible = true;
        },
        NoVisibleOkno() {
          this.oknoVisible = false;
        },
        NoVisibleOknoo() {
          this.oknooVisible = false;
        },
      },
      computed: {
        SASP() {
          return this.accounts.filter(account1 => account1.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
      }
    }
    </script>
    
<style>

.glob {
  top:64px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color:#15212c00;
  position: fixed;
  display: flex;
  
  
  
  

  
  
}
.logh {
  
  margin-bottom: -20px;
  width: 450px;
  margin: auto;

}
.custom-font {
  font-family: cursive;
}
.wet {
font-size: 60px;

}
.wett{
  margin-bottom: 55px;
}
.wet2{
  border-radius: 5px;
    
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: #4d3da0;
    padding: 12px 20px;
    border: 10px solid #4d3da0;
    cursor: pointer;
    margin-bottom: 35px;
    margin-top:-20px;
    font-size: 20px;
    color: #ffffff;



}



    
    </style>
    