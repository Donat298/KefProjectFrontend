<template>
<div class="account1">
    <div class="wet">
      <div><strong style="color: #ffffff; ">Name:</strong> {{ account1.title }}</div>
      <div><strong style="color: #ffffff; ">Email:</strong> {{ account1.body }}</div>
      <div><strong style="color: #ffffff;">Phone number:</strong> {{ account1.body2 }}</div>
    </div> 
    <div class="register1" style="margin-left: auto;">
      
        <my-button2 
        @click="$emit('remove', account1)"
  
        ><fa icon="fa-solid fa-trash-can" style="color: #ffffff;"></fa></my-button2>
        
      
    </div>
      
</div>


</template>
<script>

export default {
   props: {
      account1:{
           type: Object,
           required: true,
      }
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
.wet{
  font-size: 20px;
  


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


</style>