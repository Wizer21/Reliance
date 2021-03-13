<template>   
    <div id="main">
        <video id="storm_container">
            <source src="../assets/video/storm.webm" type="video/webm">        
        </video>    
        <div id="filter">
        </div>
        <div id="release_content">
            <div id="release_text">
                <h1>
                    OUR DISCONNECT
                </h1>
                <div id="visible_sub">
                    <p>
                        Out March 23
                    </p>
                </div>
            </div>
            <img src="../assets/image/disconnect.jpg" alt="image" id="cover_release">
        </div>   
    </div>
</template>

<script>
export default {
    name: 'Release',
    data() {
        return {
            loop: true
        }
    },
    methods: {
        sillLoop(){
            setTimeout(() => {
                if (this.loop){
                    document.getElementById('storm_container').currentTime = 0
                    this.sillLoop()
                }
            }, 4000)
        }
    },
    mounted(){
        document.getElementById("storm_container").play()

        let cover = document.getElementById('cover_release')
        let storm = document.getElementById('storm_container')
        let filter = document.getElementById('filter')
        let sub = document.getElementById('visible_sub').children[0]
        console.log(storm)
        cover.addEventListener('mouseenter', () => {
            filter.style.opacity = 1
            storm.style.opacity = 1
            storm.currentTime = 0
            sub.style.top = 0
            storm.play()

            this.loop = true
            this.sillLoop()
        })
        cover.addEventListener('mouseleave', () => {            
            filter.style.opacity = 0        
            storm.style.opacity = 0
            sub.style.top = '-2em'

            this.loop = false

            setTimeout(() => {
                storm.pause()            
            }, 400)
        })
    }
}
</script>

<style scoped>
#main
{
    width: 100vw;
    height: 100vh;
    background: #312b47;
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
}
#cover_release
{
    position: relative;

    height: 35em;
    width: 35em;
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
    transition-duration: 400ms;

}
#release_text
{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 3em;
}
#release_text h1
{
    color: white;
    font-size: 4em;
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
</style>
