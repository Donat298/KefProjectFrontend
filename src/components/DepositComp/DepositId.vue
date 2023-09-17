<template>
  <div style="margin: 10px ; word-break: break-word;
    white-space: pre-wrap; color:#ffffff;">
Be sure to click on the (Made a transaction) button after transferring crypto.
</div>
<div style="width: 100%;
    display: flex;
    flex-shrink: 0;
    ">
<div style="position: relative;
    flex-grow: 1;
    width: 100%;
    display: flex;"> 
    
    <v-btn @click="selectedComponent = 'Deposit'" elevation="8"  :ripple="false" 
          style="color: #ffffff; background-color: #2e4659;  
          text-align: center; flex-grow: 1; flex-shrink: 1; margin: 10px;">
            <span style="color: #ffffff; font-size: 13px;">Made a transaction</span>
          </v-btn></div>
</div>








</template>
<script>
</script>