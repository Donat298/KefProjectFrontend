<template>
    <button class="register1">
        <slot></slot>

    </button>
</template>




<script>
export default{
    name: 'my-button2'
}
</script>



<style scoped>
.register1 button{
    border-radius: 5px;
    
  
  margin-left: auto;
  margin-right: auto;
  background-color: #4d3da0;
  padding: 22px 35px;
  border: 10px solid #4d3da0;
  cursor: pointer;
  font-size: 20px;
  color: #ffffff;
  
  
}



</style>