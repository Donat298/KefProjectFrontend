<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
  </template>
  
  <script>
  export default {
    name: 'my-input',
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
  </script>


<style scoped>
.input {
  width: 90%;
  height: 50px;
  padding: 12px 20px;
  margin: 8px 0px;
  display: block;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #4d3da0;
  background-color: rgb(40, 40, 57);
  border-radius: 4px;
  box-sizing: border-box;
  color:#ffffff;
} 
</style>