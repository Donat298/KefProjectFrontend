<template>
  <transition name="slide">
    <div v-if="showSnackbar" class="custom-snackbar">
      <div class="snackbar-content">
        <span>{{ message }}</span>
      </div>
      <button class="snackbar-action" @click="closeSnackbar">Close</button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showSnackbar: false,
      message: '',
    };
  },
  methods: {
  openSnackbar(message) {
    this.message = message;
    this.showSnackbar = true;

    if (this.snackbarTimeout) {
      // Clear the previous timeout if it exists
      clearTimeout(this.snackbarTimeout);
    }

    // Automatically close the snackbar after 3 seconds
    this.snackbarTimeout = setTimeout(() => {
      this.closeSnackbar();
    }, 3000);
  },
  closeSnackbar() {
    this.showSnackbar = false;
    this.message = '';
    clearTimeout(this.snackbarTimeout); // Clear the timeout when closing manually
  },
},
};
</script>

<style scoped>
.custom-snackbar {
  position: fixed;
  top: 70px;
  right: 20px;
  background-color: #2e4659;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 50px rgba(99, 254, 202, 0.316);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  z-index: 5;
}


.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}


.slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(120%); /* Start off-screen to the right */
}

/* Reverse the animation for slide-leave and slide-enter-to */

.slide-enter-active {
  transition: transform 0.3s ease-in-out;
}


.slide-enter-to /* .slide-enter-active in <2.1.8 */ {
  transform: translateX(0%); /* Slide out to the left */
}

.slide-enter-from {
    transform: translateX(120%); /* Start off-screen to the right */
}

.snackbar-content {
  flex-grow: 1;
  overflow: hidden;
}

.snackbar-action {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
</style>
Look, the problem in this code is that if you click the close button before 3 seconds have passed, then if you open it next time, the time will be much less, how to fix it.