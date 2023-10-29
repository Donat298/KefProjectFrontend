<template>

<div>
    <v-btn rounded="lg" elevation="0" :ripple="false"
    style="background:linear-gradient(230deg,rgb(99, 254, 202), rgb(127, 255, 244));
     margin-right: 15px; height: 40px; font-size: 17px;"><strong><slot></slot></strong></v-btn>
</div>
</template>

<script>
export default {
    name: 'Defbutton',
}

</script>

<style>

</style>