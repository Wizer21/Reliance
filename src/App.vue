<template>
  <div data-scroll-container id="container">
    <Hero data-scroll-section id="hero" />
    <Release data-scroll-section id="release" />
    <Album data-scroll-section id="album" />
    <Gallery data-scroll-section id="gallery" />
    <Shop data-scroll-section id="shop" ref="shopref"/>
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
import Shop from './components/Shop.vue'

export default {
  name: 'App',
  components: { Hero, Album, Release, Gallery, Shop },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    setScroll() {
      this.scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      })
    },
  },
  mounted() {
    this.setScroll();

    let updating = false
    this.scroll.on('scroll', () => {
      let halh_win = window.innerHeight / 2
      let new_color = ""

      if (!updating){
        if (halh_win > document.getElementById('shop').getBoundingClientRect().top){
          new_color = "#262626"
          this.$refs.shopref.deploy()
        }
        else if( halh_win > document.getElementById('gallery').getBoundingClientRect().top ){
          new_color = "#000000"
        }
        else if( halh_win > document.getElementById('album').getBoundingClientRect().top ){
          new_color = "#262626"
        }
        else if( halh_win > document.getElementById('release').getBoundingClientRect().top ){
          new_color = "#312b47"
        }
        else if( halh_win > document.getElementById('hero').getBoundingClientRect().top ){
          new_color = "#262626"
        }

        document.getElementById('app').style.backgroundColor = new_color

        updating = true
        setTimeout(() => {
          updating = false
        }, 200)
      }    
    })
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
  position: relative;
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

  transition: background-color 1000ms;
}
#test
{
  height: 100vh;
  width: 100vw;
  background-color: black;
}
</style>
