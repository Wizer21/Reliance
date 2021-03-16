<template>   
    <div>
        <video id="storm_container">
            <source src="../assets/video/storm.webm" type="video/webm">        
        </video>    
        <div id="filter">
        </div>
        <div id="release_content">
            <div id="release_text">
                <h1 id="title_release">
                    OUR DISCONNECT
                </h1>
                <div id="visible_sub">
                    <p>
                        Out March 23
                    </p>
                </div>
            </div>
            <div id="image_container" data-scroll data-scroll-speed="2" data-scroll-direction="horizontal">
                <img src="../assets/image/disconnect.jpg" alt="image" id="cover_release">
            </div>
        </div>   
    </div>
</template>

<script>
export default {
    name: 'Release',
    data() {
        return {
            mouse_in: true
        }
    },
    mounted(){
        let cover = document.getElementById('cover_release')
        let storm = document.getElementById('storm_container')
        let filter = document.getElementById('filter')
        let sub = document.getElementById('visible_sub').children[0]
        let title_release = document.getElementById('title_release')
        let image_container = document.getElementById('image_container')
        let release_text = document.getElementById('release_text')

        cover.addEventListener('mouseenter', () => {
            filter.style.opacity = 1
            sub.style.top = 0

            storm.style.opacity = 1
            storm.currentTime = 0
            storm.play()

            release_text.style.transform = "translate(-20px)"
            cover.style.animation = `${this.$style["fluid"]} 1s infinite alternate ease-in-out`
            title_release.style.animation = `${this.$style["fluid"]} 1s infinite alternate ease-in-out`

            this.mouse_in = true
        })
        cover.addEventListener('mouseleave', () => {            
            filter.style.opacity = 0        
            storm.style.opacity = 0
            sub.style.top = '-2em' 
            storm.style.transform = "translate(0px, 0px)"

            release_text.style.transform = "translate(0px)"

            cover.style.animation = ""
            title_release.style.animation = ""

            this.mouse_in = false
        })

        let rect = cover.getBoundingClientRect()
        cover.addEventListener('mousemove', event => {
            if (this.mouse_in){
                let _mouseX = event.offsetX - rect.width/2;
                let _mouseY = event.offsetY - rect.height/2;

                image_container.style.transform = `translate(${_mouseX / 10}px, ${_mouseY / 10}px`
            }
        })

        storm.addEventListener('ended', () => {
            console.log('end')
            storm.currentTime = 0
            storm.play()
        })
    }
}
</script>

<style scoped>
#release
{
    width: 100vw;
    height: 100vh;
}
#release_content
{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 100%;

    z-index: 3;
    transition-duration: 100ms;
}
#storm_container
{
    position: absolute;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    transition-duration: 400ms;
    object-fit: cover;
}
#filter
{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(0deg, #312b47, rgba(0, 0, 0, 0.7));
    z-index: 2;
    
    opacity: 0;
    transition-duration: 200ms;
}
#release_text
{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    padding: 3em;

    transition-duration: 400ms;
}
#release_text h1
{
    color: white;
    font-size: 4vw;
    margin: 0px;
    text-align: right;
}
#visible_sub
{
    height: 10em;
    width: auto;
    overflow: hidden;
}
#visible_sub p
{
    position: relative;
    color: white;
    font-size: 4em;
    margin: 0px;
    top: -2em;
    transition-duration: 800ms;
}
#cover_release
{
    position: relative;

    height: 35vw;
    width: 35vw;

    min-height: 300px;
    min-width: 300px;
}
</style>

<style lang="scss" module>
@keyframes fluid {
0%{
    transform: skew(-(random(5)) + deg, 0deg)
}
20%{
    transform: skew(-(random(5)) + deg, 0deg)
}
40%{
    transform: skew(-(random(5)) + deg, 0deg)
}
60%{
    transform: skew(-(random(5)) + deg, 0deg)
}
80%{
    transform: skew(-(random(5)) + deg, 0deg)
}
100%{
    transform: skew(-(random(5)) + deg, 0deg)
}
}
</style>