<template>
  <transition  name="slide">
    <v-card v-if="showSnackbar" style="   " class="custom-snackbar">
      <div class="snackbar-content">
        <span>{{ message }}</span>
      </div>
      <button class="snackbar-action" @click="closeSnackbar">Close</button>
    </v-card>
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
    }, 100000);
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
  margin-top: 70px;
  right: 20px;
  background-color: #37556b;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 6px 6px 0px rgb(127, 229, 255);
  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-between;
  max-width: 300px;
  z-index: 5;
  transition: transform 0.6s cubic-bezier(.87,0,1,.6);
}

.custom-snackbar + .custom-snackbar {
  top: calc(90px); /* Adjust the spacing between snackbars here */
}
.slide-leave-active {
  transition: transform 0.6s cubic-bezier(.87,0,1,.6);
}


.slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(200%); /* Start off-screen to the right */
}

/* Reverse the animation for slide-leave and slide-enter-to */

.slide-enter-active {
 
  transition: transform 0.6s cubic-bezier(0,.4,.12,1);
}


.slide-enter-to /* .slide-enter-active in <2.1.8 */ {
  transform: translateX(0%); /* Slide out to the left */
}

.slide-enter-from {
    transform: translateX(200%); /* Start off-screen to the right */
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
  margin-left: 10px;
}
</style>
