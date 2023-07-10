<template>
  <div>

    
  <transition-group name="user-list">
    <div v-if="accounts.length > 0">
    
      <transition-group name="user-list">
        <Acc-Item
        
         v-for:="account1 in accounts"
         :account1="account1"
         :key="account1.id"
         @remove="$emit('remove', account1)"
        />
        </transition-group>
    </div>
  
    
  
  </transition-group>
  
  
  </div>   
</template>

<script>

import AccItem from "../SignUpEx1/AccItem.vue"

export default {
  
  components: {
      AccItem
  },
  props: {
      accounts: {
          type: Array,
          required: true
       }
  },
  methods: {

  }
}
</script>

<style scoped>







.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.3s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateY(130px);
}
.user-list-move {
  transition: transform 0.3s ease;
}

</style>

