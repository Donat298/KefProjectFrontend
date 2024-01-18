<template>
    <div class="ppj">
    <div  @mousedown="onMouseDown" @mouseup="onMouseUp" class="jja" >
      <div style="max-height: 90%; width: 100%; ">
        <div @mousedown.stop  @mouseup.stop="onMouseUpCheck" class="insidedivglob" >
          <div style="display: flex; justify-content: space-between; align-items: center;
          padding: 5px 10px 10px 10px; ">
            <div style="color: #ffffff; padding: 10px;">
              Promocode  
              <font-awesome-icon  style="color: #ffffff; "  :icon="['fas', 'percent']" />
             
            </div>
              <button @click.stop="$emit('HidePromocodeOknoo')" style="cursor: pointer; 
               color: #ffffff;
              min-height: 35px;  min-width: 35px; ">
      
      <font-awesome-icon class="mx-auto mr-3" style="color: #ffffff; "  :icon="['fas', 'xmark']" />
              </button>
          </div>

<Promocodelogic></Promocodelogic>




        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

  import Promocodelogic from '@/pages/Promocode/Promocodelogic.vue';
  export default {
    components: {
      Fa, Promocodelogic
    },
    data() {
      return {
     
      }
    },
    
    methods: {
      

      onMouseDown(event) {
        if (event.button === 0) {
        this.mousePressed = true;
        }
      },
      onMouseUpCheck(event) {
        if (event.button === 0) {
        this.mousePressed = false;
        }
      },
      onMouseUp() {
        if (this.mousePressed) {
          // Emit the custom event when the button is pressed and released
          this.$emit('HidePromocodeOknoo');
        } 
         this.mousePressed = false;
      },
     
      
    },
   
  }
  </script>
  
  
    <style scoped>
    .jja {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;   display: flex;    align-items: center;
  
    z-index: 4;
  
    } 
  
    .ppj{
      top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    position: fixed; 
    z-index: 4;
    overflow-y: auto;
    }
  
  .insidedivglob{

    background-color: #1d2f3f; 
        border-radius: 10px; max-width: 90%; margin: auto; max-height: 90%; width: 500px;
  }
    
    ::-webkit-scrollbar {
      width: 5px;
      
      
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #15212c;
      border-radius: 30px;  
      margin-block: 15px; 
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #2c4257;
      border-radius: 30px;
    }


    </style>
    
  