<template>

<div>
    <v-btn  rounded="lg" elevation="0"  :ripple="false"  color="black"  style=" 
font-size: 17px; 
height: 46px;   
background: linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244)); ">
<strong><slot></slot> </strong>
</v-btn>

</div>
</template>

<script>
export default {
    name: 'def2button',
}

</script>

<style>

</style>