<template>   
    <div>
        <div id="shop_header" data-scroll data-scroll-speed="5" data-scroll-direction="horizontal">
        </div>
        <div id="shirt_block" data-scroll data-scroll-speed="-3" data-scroll-direction="horizontal">
            <div class="image_holder">
                <img :src="urls.shirt" alt="shirt">
            </div>
            <div id="shirt_text">
                <p class="shop_price">
                    15$
                </p>
                <h2 class="shop_title">
                    House Shirt
                </h2>
            </div>
        </div>
        <div id="sleeve_block" data-scroll data-scroll-speed="3" data-scroll-direction="horizontal">
            <div id="sleeve_text">
                <p class="shop_price">
                    25$
                </p>
                <h2 class="shop_title">
                    House Long Sleeve
                </h2>
            </div>
            <div class="image_holder">
                <img :src="urls.sleeve" alt="shirt" >
            </div>
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
            },
            transitionDone: false
        }
    },
    methods: {
        deploy() {
            if (!this.transitionDone){
                this.transitionDone = true
                
                let letters = document.getElementsByClassName('title_letter')
                for ( let obj of letters){
                    obj.style.transform = "translate(0px, -50px)"
                }
            }
        }
    },
    mounted() {
        let shop_header = document.getElementById('shop_header')

        let elem
        let delay = 0
        for (let letter of "Reliance Merch"){
            elem = document.createElement('p')
            elem.className = "title_letter"
            elem.textContent = letter
            elem.style.transitionDelay = `${delay}ms`

            delay += 150

            shop_header.appendChild(elem)            
        }
    }
}
</script>

<style scoped>
#shop
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;

    width: 100vw;
}
#shirt_block
{
    position: relative;
    margin-left: 10vw;
    margin-right: auto;

    display: flex;
    flex-direction: row;
}
#shirt_text
{
    display: flex;
    flex-direction: column;    
    color: white;

    justify-content: flex-end;
}
#sleeve_text
{
    display: flex;
    flex-direction: column;    
    color: white;

    text-align: right;
    justify-content: flex-end;
}
#sleeve_block
{    
    position: relative;
    margin-left: auto;
    margin-right: 10vw;
    
    display: flex;
    flex-direction: row;
}
.image_holder
{
    position: relative;
    height: 30vw;
    width: 30vw;

    min-height: 300px;
    min-width: 300px;

    transition-duration: 200ms;
}
.image_holder img
{
    object-fit: cover;
    height: 100%;
    width: 100%;

    min-height: 300px;
    min-width: 300px;
}
.shop_title
{
    font-size: 3em;
    margin: 0px;
}
.shop_price
{
    font-size: 2em;
    margin: 0px;
}
#shop_header
{
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    
    margin: 0px;
    margin-left: auto;
    margin-right: 10vw;

    overflow: hidden;
}
</style>

<style>
.title_letter
{    
    position: relative;
    color: white;
    font-size: 4em;
    transition-duration: 1000ms;
    transform: translate(0, -150px);
    min-width: 20px;
}
</style>