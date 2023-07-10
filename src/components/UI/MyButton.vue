<template>
    <button class="register1">
        <slot></slot>

    </button>
</template>




<script>
export default{
    name: 'my-button'
}
</script>



<style scoped>
.register1 button{
    border-radius: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(40, 40, 57);
  padding: 12px 20px;
  border: 2px solid #4d3da0;
  cursor: pointer;
  margin-bottom: 30px;
  color: rgb(115, 115, 115);
  
  
  
  
} 
</style>