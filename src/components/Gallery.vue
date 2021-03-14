<template>   
    <div id="main">
        <div id="container_gallery" >
        </div>   
    </div>  
</template>

<script>
export default {
    name: 'Gallery',
    data() {
        return {
            galleryStack: []
        }
    },
    methods: {
        loadImages() {
            const file = require.context("../assets/image/gallery", true, /\.webp$/)
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

                console.log("this", this)
                this.galleryStack.push(container)
            })
        }
    },
    mounted(){
        this.loadImages()
        let gallery = document.getElementById('container_gallery')
        for (let image of this.galleryStack){
            gallery.appendChild(image)
        }

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
    justify-content: space-between;

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
    width: 1500px;
    height: 100vh;

    display: flex;
    align-items: center;
}
.image_gallery
{       
    position: absolute; 
    max-width:100%;
    max-height:100%;
    object-fit: contain;
}
</style>
