<template>
    <div data-scroll-container>
        <Hero data-scroll-section id="hero" ref="heroref"/>
        <Release data-scroll-section id="release" />
        <Album data-scroll-section id="album" />
        <Gallery data-scroll-section id="gallery" />
        <Shop data-scroll-section id="shop" ref="shopref"/>
        <Footer data-scroll-section id="footer" />
    </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";

import Hero from '../components/Hero.vue'
import Album from '../components/Album.vue'
import Release from '../components/Release.vue'
import Gallery from '../components/Gallery.vue'
import Shop from '../components/Shop.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Main',
    components: { Hero, Album, Release, Gallery, Shop, Footer },  
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
                lerp: 0.07,
                smartphone: {
                smooth: true,
                direction: 'vertical',
                gestureDirection: 'vertical',
                },
                tablet: {
                smooth: true,
                direction: 'vertical',
                gestureDirection: 'vertical',
                },
            })
        },
        start(isMuted){
            this.$refs.heroref.start(isMuted)

            setTimeout(() => {                
                this.scroll.update()
            }, 1500)
        }
    },
    mounted() {      
        this.setScroll()

        let updating = false
        this.scroll.on('scroll', () => {
            let half_win = window.innerHeight / 2
            let new_color = ""

            if (!updating){
                if( half_win > document.getElementById('footer').getBoundingClientRect().top ){
                    new_color = "#1b1b1b"
                }
                else if (half_win > document.getElementById('shop').getBoundingClientRect().top){
                    new_color = "#262626"
                    this.$refs.shopref.deploy()
                }
                else if( half_win > document.getElementById('gallery').getBoundingClientRect().top ){
                    new_color = "#212121"
                }
                else if( half_win > document.getElementById('album').getBoundingClientRect().top ){
                    new_color = "#262626"
                }
                else if( half_win > document.getElementById('release').getBoundingClientRect().top ){
                    new_color = "#312b47"
                }
                else if( half_win > document.getElementById('hero').getBoundingClientRect().top ){
                    new_color = "#312b47"
                }

                document.getElementById('app').style.backgroundColor = new_color

                updating = true
                setTimeout(() => {
                updating = false
                }, 200)
            }   
        })

        window.addEventListener('resize', () => {
            this.scroll.update()
        })
    }
}
</script>

<style>
@import '../assets/css/locomotive-scroll.css';

@font-face {
    font-family: Roboto light;
    src: url(../assets/font/Roboto-Light.ttf) format('truetype');
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
</style>
