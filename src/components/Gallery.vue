<template>   
    <div id="main">
        <div id="container_gallery" >
        </div>   
    </div>  
</template>

<script>
export default {
    name: 'Gallery',
    methods: {
        loadImages() {
            const file = require.context("../assets/image/gallery", true, /\.webp$/)
            let gallery = document.getElementById('container_gallery')
            let container 
            let elem 
            
            file.keys().forEach(function(key) {
                elem = document.createElement("img")
                elem.src = require(`../assets/image/gallery${key.substring(1, key.length)}`)
                elem.className = "image_gallery"
                elem.style.pointerEvents = "none"

                container = document.createElement("div")
                container.className = "image_holder"
                container.style.pointerEvents = "none"
                container.appendChild(elem)

                gallery.appendChild(container)
            })
        }
    },
    mounted(){
        this.loadImages()

        let gallery = document.getElementById('container_gallery')
        let hold = false
        let lastChord = 0
        gallery.addEventListener('mousedown', event => {
            hold = true
            lastChord = event.offsetX
        })
        gallery.addEventListener('mouseup', () => {
            hold = false
        })

        gallery.addEventListener('mousemove', event => {
            if (hold){                
                gallery.scrollLeft += -(event.offsetX - lastChord)
                lastChord = event.offsetX
            }
        })
    }
}
</script>

<style lang="scss"  scoped>
#main
{
    position: relative;
    width: 100vw;
    height: 100vh;
}
#container_gallery
{
    display: flex;
    flex-direction: row;
    height: 100vh; 

    overflow: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
    display: none;
    }
}
.image_holder
{
    position: relative;
    width: auto;
    height: auto;
}
.image_gallery
{       
    position: absolute; 
    max-width:100%;
    max-height:100%;
    object-fit: scale-down;
}
</style>
