<template>   
    <div>
        <div id="shirt_block" data-scroll data-scroll-speed="-3" data-scroll-direction="horizontal">
            <div class="image_holder">
                <img :src="urls.shirt" alt="shirt">
            </div>
            <div class="scaling_text" data-scroll data-scroll-speed="2" data-scroll-direction="vertical">
                <a href="https://www.relianceband.com/product-page/house-logo-t-shirt" target = "_blank">
                    <div class="text-box">
                        <p class="shop_price center" data-scroll data-scroll-speed="1" data-scroll-direction="horizontal">
                            15$
                        </p>
                        <h2 class="shop_title">
                            House Shirt
                        </h2>
                    </div>
                </a>
            </div>
        </div>        
        <div id="shop_header" data-scroll data-scroll-speed="10" data-scroll-direction="horizontal">
        </div>
        <div id="sleeve_block" data-scroll data-scroll-speed="3" data-scroll-direction="horizontal">
            <div class="scaling_text" data-scroll data-scroll-speed="2" data-scroll-direction="vertical">
                <a href="https://www.relianceband.com/product-page/house-and-leaves-long-sleeve" target = "_blank">
                    <div class="text-box right">
                        <p class="shop_price center" data-scroll data-scroll-speed="-1" data-scroll-direction="horizontal">
                            25$
                        </p>
                        <h2 class="shop_title">
                            House Long Sleeve
                        </h2>
                    </div>
                </a>
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
                    obj.style.transform = "translate(0px, -10vw)"
                    setTimeout(() => {
                        obj.style.transitionDelay = "0ms"
                    }, obj.dataset.transition_delay)
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
            elem.dataset.transition_delay = delay

            delay += 50

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
#sleeve_block
{    
    position: relative;
    margin-left: auto;
    margin-right: 10vw;
    
    padding: 1em;

    display: flex;
    flex-direction: row;
}
#shirt_block
{
    position: relative;
    margin-left: 10vw;
    margin-right: auto;

    padding: 1em;

    display: flex;
    flex-direction: row;
}
.text-box
{
    display: flex;
    flex-direction: column;    
    color: #e0e0e0;
    cursor: pointer;

    border-radius: 10px;
    width: 15em;
    height: 15em;
    padding: 1em;
    margin-top: auto;

    background-color: #212121;

    justify-content: flex-end;
    transition-duration: 400ms;
    z-index: -1;
}
.text-box:hover
{
    transform: scale(1.2);
    transition-duration: 400ms;

    background-color: #e0e0e0;
    color: #212121;
}
.right
{
    text-align: right;
}
.center
{    
    text-align: center;
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
    height: 10vw;
    display: flex;
    flex-direction: row;
    
    margin: 0px;
    margin-left: auto;
    margin-right: 10vw;

    overflow: hidden;
}
.scaling_text
{
    margin-top: auto;
}
a
{
    text-decoration: none;
}
@media (max-width: 600px) {
    #sleeve_block
    {    
        flex-direction: column;
    }
    #shirt_block
    {
        flex-direction: column;
    }
}
</style>

<style>
.title_letter
{    
    position: relative;
    color: #e0e0e0;
    font-size: 10vw;
    transform: translate(0, -20vw);
    transition-duration: 1000ms;
    min-width: 1vw;
}
.title_letter:hover
{
    transition-duration: 500ms;
    padding-left: 1vw;
    padding-right: 1vw;
}
</style>