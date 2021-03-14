<template>   
    <div id="main_gallery">
        <div id="gallery_cursor">
        </div>
        <div id="container_gallery">
        </div>   
    </div>  
</template>

<script>
export default {
    name: 'Gallery',
    methods: {
        loadImages() {
            const file = require.context("../assets/image/gallery", true, /\.webp$/)
            let elem 
            
            let gallery = document.getElementById('container_gallery')
            file.keys().forEach(function(key) {
                elem = document.createElement("img")
                elem.src = require(`../assets/image/gallery${key.substring(1, key.length)}`)
                elem.classList.add("image_gallery")

                gallery.appendChild(elem)
            })
        }
    },
    mounted(){
        this.loadImages()

        let gallery = document.getElementById('container_gallery')
        let gallery_cursor = document.getElementById('gallery_cursor')

        let hold = false
        let lastChord = 0
        gallery.addEventListener('mousedown', event => {
            hold = true
            lastChord = event.offsetX

            gallery_cursor.style.height = "0px"
            gallery_cursor.style.width = "0px"
        })
        gallery.addEventListener('mouseup', () => {
            hold = false
            
            gallery_cursor.style.height = "20px"
            gallery_cursor.style.width = "20px"
        })

        gallery.addEventListener('mousemove', event => {
            if (hold){                
                gallery.scrollLeft += -(event.offsetX - lastChord)*2
                lastChord = event.offsetX
            }
            mousePos(event)
        })

        function mousePos(event){
            gallery_cursor.style.top = `${event.offsetY}px`
            gallery_cursor.style.left = `${event.offsetX}px`
        }
    }
}
</script>

<style lang="scss">
#main_gallery
{
    position: relative;
    width: 100vw;
    height: 100vh;
    cursor: none;
}
#container_gallery
{
    display: flex;
    flex-direction: row;
    height: 100vh; 

    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
    display: none;
    }
}
.image_gallery
{       
    position: relative; 

    width:100%;
    height:100%;
    pointer-events: none;
}
#gallery_cursor
{
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;

    border: 5px solid #262626;
    z-index: 3;
    pointer-events: none;
}
</style>

