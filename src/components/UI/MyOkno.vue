<template>
    <div class="okno" v-if="show === true">
        <div class="okno2">
          <slot></slot>
        </div>
    </div>
</template>




<script>
export default{
    name: 'my-okno',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods :{
    }
}
</script>



<style scoped>
.okno {
  z-index: 2;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  position:fixed;
  display: flex;
 
  
  

} 
.okno2 {
 
 margin: auto;
 background: rgb(31, 31, 47);
 min-height: 50px;
 min-width: 300px;
 max-height: 90%;
 padding: 80px 150px;
 
 overflow-y:auto;
  
 border: 7px solid #4d3da0;
 border-radius: 40px;
 box-sizing: border-box;
}
/* width */
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