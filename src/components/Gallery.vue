<template>   
    <div>
        <div id="container_gallery">
        </div>   
    </div>  
</template>

<script>
export default {
    name: 'Gallery',
    methods: {
        loadImages() {
            let file = require.context("../assets/image/gallery", true, /\.webp$/)
            const position = [0, 50, 30, 0, 60, 0, 30, 50, 10, 50, 40, 15, 50, 60, 10, 50, 20]
            const directions = [-1, 2, 1, -1, 2, 0, 1, 2, -1, 2, 1, -1, 2, 0, 1, 2, 2]
            let elem 
            let container

            file = file.keys()
            
            let gallery = document.getElementById('container_gallery')
            for (let i = 0; i < file.length; i++){

                elem = document.createElement("img")
                elem.src = require(`../assets/image/gallery${file[i].substring(1, file[i].length)}`)
                elem.classList.add("image_gallery")
                elem.style.left = `${position[i]}vw`

                container = document.createElement("div")
                container.classList.add("image_container")

                container.dataset.scroll = ""
                container.dataset.scrollSpeed = directions[i]
                container.dataset.scrollDirection = "horizontal"

                container.appendChild(elem)


                gallery.appendChild(container)
            }
        }
    },
    mounted(){
        this.loadImages()
    }
}
</script>

<style lang="scss">
#gallery
{
    position: relative;
    width: 100vw;
}
#container_gallery
{
    display: flex;
    flex-direction: column;

    padding-top: 20vh;
    padding-bottom: 50vh;
}
.image_container
{
    width: 100vw;
    height: 30vh;
}
.image_gallery
{       
    position: relative; 
    max-height: 60vh;

    transition-duration: 300ms;
    z-index: 1;
}
.image_gallery:hover
{
    position: relative;
    transition-duration: 300ms;
    transform: scale(1.2);
    z-index: 5;
}
@media (max-width: 600px) {    
    .image_container
    {
        height: 50vh;
    }
}
</style>

