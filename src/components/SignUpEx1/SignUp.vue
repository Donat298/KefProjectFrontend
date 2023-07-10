<template>
  <div>
  <div class="register1">
  <my-button
     @click="NoVisibleOkno"
     style="margin-right: -29%; margin-top: -13%;" 
     ><fa icon="fa-solid fa-xmark"></fa>
    </my-button>
 </div>
<v-img class="logh" src="@/assets/5opka.png" />
<h1>SignUp</h1>

<div class="register1">
  <form @submit.prevent>
    <my-input 
    v-focus
    v-model="account1.title"
    type="text"  
    placeholder="Enter Name" 
    />
    <my-input 
     v-model="account1.body"
     type="text"  
     placeholder="Enter Email"
    />
    <my-input 
    v-model="account1.body2"
    type="number"  
    placeholder="Enter Phone Number" 
    />
    <my-button
    
     @click="createAcc"
     >SignUp <i class="fa-solid fa-check" style="color:white;"></i>
    </my-button>
    
    
  </form>
</div>
</div>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      account1: {
        title: '',
        body: '',
        body2: ''
      }
    }
  },
  methods: {
    createAcc() {
      this.account1.id = Date.now();
      this.$emit('create', this.account1)
      this.account1 = {
      title:  '',
      body:  '',
      body2:  ''
      }
    },
    NoVisibleOkno() {
      this.NoVisibleOkno.id = Date.now();
      this.$emit('cre')
    }
  }
}
</script>

<style scoped>



.logh{
    width:400px
}



</style>