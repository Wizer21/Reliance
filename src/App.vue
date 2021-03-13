<template>
  <Hero/>
  <NextRelease/>
</template>

<script>
import Hero from './components/Hero.vue'
import NextRelease from './components/NextRelease.vue'

export default {
  name: 'App',
  components: { Hero, NextRelease }
}
</script>

<style>
@font-face {
font-family: Roboto light;
src: url(./assets/font/Roboto-Light.ttf) format('truetype');
}
*{  
    font-family: 'Roboto light';
}
body
{
    margin: 0px;
}
#app
{
    position: relative;
    overflow: hidden;              
    margin: 0px;
}
</style>
