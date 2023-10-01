<template>

        <img
          class="reveal-clamp-animation mx-auto"
          style=" background-color: rgba(127, 255, 212, 0); width:177px; height:100px;"
          :src="require('@/assets/kefu.svg')"
        />
   
  </template>

<script>
</script>
<style scoped>
.reveal-clamp-animation {
  animation: reveal-clamp 0.8s ease-in-out infinite;
}

@keyframes reveal-clamp {
  0% {
    transform: translateX(-50%) scaleX(0.1) scaleY(0.5);
    opacity: 0.3;
  }
  13% {
    transform: translateX(-5%) scaleX(0.8) scaleY(0.8);
    opacity: 0.7;
  }
  25% {
    transform: translateX(-2%) scaleX(0.95) scaleY(0.95);
    opacity: 0.8;
  }
  50% {
    transform: translateX(0%) scaleX(1) scaleY(1);
    opacity: 1;
  }
  75% {
    transform: translateX(2%) scaleX(0.95) scaleY(0.95);
    opacity: 0.8;
  }
  88% {
    transform: translateX(5%) scaleX(0.8) scaleY(0.8);
    opacity: 0.7;
  }
  100% {
    transform: translateX(50%) scaleX(0.1) scaleY(0.5);
    opacity: 0.3;
  }
}
</style>