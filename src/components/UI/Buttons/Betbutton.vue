<template>
  <button
                class="submit-button mx-auto"
                type="submit"
                rounded="lg" 
                style=" color: #15212c;
                background: linear-gradient(230deg,#63feca, #7ffff4);
                 margin-right: 8px; min-width: 100px;
                 font-size: 17px;"
           
              ><strong><slot></slot></strong>
                <font-awesome-icon style="color: #15212c; margin-left: 5px;" :icon="['fas', 'check']" />
              </button>

</template>
<script>
export default {
   name: 'bet-btn',

};

</script>

<style>

.submit-button {
  max-height: 46px; 
 padding: 10px;
 border-radius: 8px;
  color: rgb(99, 254, 202); 
  background-color: #15212c;
}
</style>