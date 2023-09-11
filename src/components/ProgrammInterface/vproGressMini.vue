<template>

        <img
          class="reveal-clamp-animation"
          style=" background-color: rgba(127, 255, 212, 0);"
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
    transform: translateX(-50%) scaleX(0.1) scaleY(1.5);
    opacity: 0.3;
  }
  13% {
    transform: translateX(-20%) scaleX(0.8) scaleY(1.2);
    opacity: 0.7;
  }
  25% {
    transform: translateX(-10%) scaleX(0.9) scaleY(1.1);
    opacity: 0.8;
  }
  50% {
    transform: translateX(0%) scaleX(1) scaleY(1);
    opacity: 1;
  }
  75% {
    transform: translateX(10%) scaleX(0.9) scaleY(1.1);
    opacity: 0.8;
  }
  88% {
    transform: translateX(20%) scaleX(0.8) scaleY(1.2);
    opacity: 0.7;
  }
  100% {
    transform: translateX(50%) scaleX(0.1) scaleY(1.5);
    opacity: 0.3;
  }
}
</style>