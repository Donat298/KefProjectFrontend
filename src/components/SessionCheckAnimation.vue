

<template>
  <div class="okno3">
      <div class="okno4">
             <v-progress-circular style="width: 100%;"
class="margg"
color="blue-lighten-3"
indeterminate
:size="128"
:width="12"
></v-progress-circular>
<v-alert style="max-width: 400px; margin-top: 30px; "
    density="compact"
    type="error"
    title="Oioi"
    text="The site is down due to technical work with the server, hope that your data is not destroyed."
  ></v-alert>

      </div>
  </div>
</template>




<script>

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
z-index: 2;
} 
.okno4 {
  
  max-width: 90%;

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