<template>
    <div>
      <v-btn rounded="lg" elevation="5" :ripple="false"
      style="background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));
       margin-right: 15px; height: 40px; font-size: 17px; display: flex; justify-content: center; align-items: center;">
       <slot></slot></v-btn>
    </div>
  </template>
  
  <script>
  export default {
      name: 'Defbutton',
  }
  </script>
  
  <style scoped>
  
  </style>