<template>
  <div>
    <div name="" style="background-color: #152c20; width: 100%; position: relative; aspect-ratio: 3/2;">
      <div style="display: flex; justify-content: center; align-items: center;">

   

</div>
    </div>

    <div>
      <p>Wheel Rotation: {{ wheelrotation }}</p>
      <!-- to understand whether props are transmitted -->
  </div>
  </div>
</template>

<script>
import wheelsvg from "@/assets/GameObjects/Originalwheel.vue";
import wheelpointersvg from "@/assets/GameObjects/Wheelpointer.vue";
export default {
  components: {
    wheelsvg, wheelpointersvg
  },

  props: {
    wheelrotation: {
      type: Number,
      required: true
    },
    start: {
      type: Boolean,
      default: false,
    }
  }
};
</script>
