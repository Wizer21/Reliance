<template>   
    <div id="main">
        <div class="image_holder">
            <img :src="urls.shirt" alt="shirt">
        </div>
        <div class="image_holder">
            <img :src="urls.sleeve" alt="shirt">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shop',
    data() {
        return {
            urls: {
                shirt : require("../assets/image/shop/t_shirt_house.png"),
                sleeve: require("../assets/image/shop/sleeve_reliance.png")
            }
        }
    },
    mounted(){
        let objects = document.getElementsByClassName('image_holder')

        for (let obj of objects){
            let rect = obj.getBoundingClientRect()

            obj.addEventListener('mousemove', event => {
                let _mouseX = event.offsetX - rect.width/2;
                let _mouseY = event.offsetY - rect.height/2;

                if (_mouseX <= 0 && _mouseY >= 0){
                    _mouseX = -_mouseX
                }

                console.log(`skew(${_mouseX / 10}deg, ${_mouseY / 10}deg`)

                obj.style.transform = `skew(${_mouseX / 10}deg, ${_mouseY / 10}deg`
            })

              
            obj.addEventListener('mouseleave', () => {
                console.log("out")
            })         
        }
    }
}
</script>

<style scoped>
#main
{
    width: 100vw;
    height: 100vh;
    background: #2e2e2e;
}
.image_holder
{
    position: relative;
    height: 30vw;
    width: 30vw;

    transition-duration: 200ms;
}
.image_holder img
{
    position: relative;
    object-fit: cover;
    height: 100%;
    width: 100%;
    background-color: red;
}
</style>
