<template>
  <div data-scroll-container class="container">
    <Hero data-scroll-section/>
    <Release data-scroll-section/>
    <Album data-scroll-section/>
    <Gallery data-scroll-section/>
    <div id="test" data-scroll-section>
    </div>
  </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";

import Hero from './components/Hero.vue'
import Album from './components/Album.vue'
import Release from './components/Release.vue'
import Gallery from './components/Gallery.vue'

export default {
  name: 'App',
  components: { Hero, Album, Release, Gallery },
  methods: {
    setScroll() {
      new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      })
    },
  },
  mounted() {
    this.setScroll();
  }
}
</script>

<style>
@import './assets/css/locomotive-scroll.css';

@font-face {
font-family: Roboto light;
src: url(./assets/font/Roboto-Light.ttf) format('truetype');
}
*{  
  box-sizing: border-box;
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
