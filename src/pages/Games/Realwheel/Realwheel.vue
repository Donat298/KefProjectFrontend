<template>

    <Anime></Anime>
  </template>
  

  
       
<script>
import Anime from "./Anime.vue";
export default {
  components: {
    Anime,
  },
}
</script>
  <style scoped>
  
  @media (max-width: 800px) {
    .bet-div {
      width: 100%;
      order: 2; /* Change the order to make it appear below */
      border-radius: 0px 0px 10px 10px !important;
    }
    .betseto {
      order: 1; /* Change the order to make it appear above */
      border-radius: 10px 10px 0px 0px !important;
    }
    .bet-form {
      flex-direction: column;
      display: flex;
      align-items: center;
        /* Center align form elements */
    }
    
    /* Add a rule to remove max-width on .mx-auto when screen width is less than 800px */
    .widFh {
      max-width:95% !important; /* This will override the max-width: 90%; */
    }
  }
  .logh {
  justify-content: space-between;
  height: 450px;
  width: 450px;
}



  


  
  </style>
  
  
  