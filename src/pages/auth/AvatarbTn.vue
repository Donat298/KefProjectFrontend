
<template>
  <div style="display: flex; align-items: center; justify-content: center;">
    <div style="width: 48px;"></div>
    <img :src="userAvatar" alt="User Avatar" style="height: 70px; width: 70px; border-radius: 50%; 
     box-shadow: 0px 0px 30px 0px rgb(127, 229, 255);
 ">
    <input type="file" ref="fileInput" @change="handleAvatarUpload" style="display: none" accept="image/*">
    

    <button @click="openFileInput" style="background: var(--color-dark-tr-e);
     height: 48px; width: 48px; border-radius: 50px;">


      <font-awesome-icon   style="color: #ffffff; height: 20px;"  :icon="['fas', 'pen']" />
    </button>
     
  

  </div> 
  <div v-if="errorMsg"
  class="text-subtitle-1 text-color-white align-center justify-space-between"
  style="color: red; 
  margin-top: 10px;  text-align: center;">{{ errorMsg }}</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useApiPrivate } from '../../utils/useApi';

export default {
  setup() {
  const store = useStore();
  const axiosPrivateInstance = useApiPrivate(store);
  const userId = ref(store.getters.userDetail._id); 
  const errorMsg = ref('');
  const MAX_IMAGE_SIZE_BYTES = 1024 * 1024; // 1MB
  // Initialize userAvatar with the value from the Vuex store
  //const userAvatar = ref(store.state.avatar);

  const userAvatar = ref(!store.state.avatar ? require('@/assets/Kefdeflogo.svg') : store.state.avatar);

  const openFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      errorMsg.value = "Please select a valid image file.";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      errorMsg.value = "The image is too large.";
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId.value);
    formData.append('avatar', file);

    try {
      const response = await axiosPrivateInstance.post('/avatar/update-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the user's avatar in the store using store.commit
      store.commit('setUserAvatar', response.data.avatar);

      // Update the userAvatar ref immediately
      userAvatar.value = response.data.avatar;

      errorMsg.value = '';
    } catch (error) {
      console.error(error);
      errorMsg.value = "An error occurred while updating the avatar.";
    }
  };

  return {
    openFileInput,
    handleAvatarUpload,
    errorMsg,
    userAvatar,
  };
},

};
</script>