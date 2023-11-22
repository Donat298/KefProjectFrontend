

<template>
  <div class="okno3">
      <div class="okno4">
             <vproGressMini style="width:177px; height:100px;"
></vproGressMini>


      </div>
  </div>
</template>




<script>
import vproGressMini from "../components/ProgrammInterface/vproGressMini.vue"
export default {
  components: {
    vproGressMini
  }, 
}
</script>



<style scoped>

.okno3 {

top: 0;
bottom: 0;
right: 0;
left: 0;
background: rgba(0, 0, 0, 0.5);
position: fixed;
display: flex;
z-index: 2;
} 
.okno4 {
  


margin: auto;




justify-content: center;

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