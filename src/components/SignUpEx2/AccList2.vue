<template>
  <div>
    
    
    

  <div v-for="item in todos" :key="item.Name" class="account1">
    <div class="wet">
    <div><strong style="color: #ffffff; ">Name:</strong> {{item.Name}}</div>
      <div><strong style="color: #ffffff; ">Email:</strong> {{item.Email}}</div>
      <div><strong style="color: #ffffff;">Phone number:</strong> {{item.Phonenumber}}</div>
    </div>
    
   <div class="register1" style="margin-left: auto;">
    <my-button2 @click="$emit('deleteUser', item._id)"
    ><fa icon="fa-solid fa-trash-can" style="color: #ffffff;"></fa></my-button2>
  </div>
  </div>
  
  </div>   
</template>

<script>


export default {
  components: {
    
    
  },
  
  props: {
      todos: Object,
  }, 
  
  methods: {
    
    
    
    

  }
  
}
</script>

<style scoped>
.account1 {
  border:1px;
  width: 650px;
  padding: 7px 20px;
  margin: 30px ;  
  box-sizing: border-box;
  display:flex;
  
  
  border-radius: 5px;      
    margin-left: auto;
    margin-right: auto;
    background-color: #4d3da0;
    padding: 12px 20px;
    border: 10px solid #4d3da0;
    cursor: pointer;
    margin-bottom: 30px;
    font-size: 20px;
    color: #ffffff;
    
}
.register1 button{
    border-radius: 5px;
    
  display: block;
  
  background-color: #4d3da0;
  padding: 12px 15px;
  border: 2px solid #ffffff;
  cursor: pointer;
  margin-bottom: 13px;
  margin-top: 13px;
  font-size: 20px;
  color: #ffffff;
}
.wet{
  font-size: 20px;
  


}



</style>

