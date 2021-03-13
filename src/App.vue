<template>
  <Hero/>
  <Release/>
  <Album/>
  <div id="test">
  </div>
</template>

<script>
import Hero from './components/Hero.vue'
import Album from './components/Album.vue'
import Release from './components/Release.vue'

export default {
  name: 'App',
  components: { Hero, Album, Release }
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

    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
#test
{
  height: 100vh;
  width: 100vw;
  background-color: black;
}
</style>
