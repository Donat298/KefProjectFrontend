<template>
    <div class="okno3">
        <div class="okno4">
          <slot></slot>
        </div>
    </div>
</template>




<script>
export default{
    name: 'my-okno',
}
</script>



<style scoped>
.okno3 {

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
 
} 
.okno4 {
    
    
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
    background: rgb(31, 31, 47);
    border-radius: 30px;  
    margin-block: 23px;
    display: flex;
    
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(62, 62, 90);
    border-radius: 30px;
  }
</style>