<template>   
    <div>   
        <div id="footer_title">
            <p class="footer_text left" data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal">
                Thank to
            </p>
            <p class="footer_text" data-scroll data-scroll-speed="-10" data-scroll-direction="horizontal">
                Reliance
            </p>
            <p class="footer_text left smol" data-scroll data-scroll-speed="25" data-scroll-direction="horizontal">
                for allowing me to realize this project
            </p>
        </div>  
        <div id="footer_body">
            <div id="icon_list_container">
            </div>     
            <img :src="require('../assets/image/gallery/12.webp')" alt="group" data-scroll data-scroll-speed="-5" data-scroll-direction="vertical" data-scroll-call>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            icon_list: [
                {
                    url: require("../assets/social_icon/web.svg"),
                    path: "https://www.relianceband.com/",
                    name: "relianceband.com"
                },                
                {
                    url: require("../assets/social_icon/instagram.svg"),
                    path: "https://www.instagram.com/reliancebandoc/?hl=fr",
                    name: "instagram"
                },                
                {
                    url: require("../assets/social_icon/twitter.svg"),
                    path: "https://twitter.com/relianceband",
                    name: "twitter"
                },                
                {
                    url: require("../assets/social_icon/facebook.svg"),
                    path: "https://www.facebook.com/RelianceBandOC",
                    name: "facebook"
                },                
                {
                    url: require("../assets/social_icon/spotify.svg"),
                    path: "https://open.spotify.com/artist/2rs68VOQjmZRDPXmw1mD6h",
                    name: "spotify"
                },                
                {
                    url: require("../assets/social_icon/applemusic.svg"),
                    path: "https://music.apple.com/gb/artist/reliance/1453608052",
                    name: "apple music"
                },                
                {
                    url: require("../assets/social_icon/youtube.svg"),
                    path: "https://www.youtube.com/channel/UCUS-DPIjwjIJ-udid7xFjxQ",
                    name: "youtube"
                },
            ]
        }
    },
    mounted(){
        let icon_list_container = document.getElementById('icon_list_container')
        let elem
        let url_a
        let text
        let text_container
        let container

        for (let obj of this.icon_list){            
            text = document.createElement('p')
            text.textContent = obj.name
            text.className = "icon_name"
            text.dataset.scroll = ""
            text.dataset.scrollSpeed = 8
            text.dataset.scrollDirection = "horizontal"

            text_container = document.createElement('div')
            text_container.className = "text_container"
            text_container.appendChild(text)

            elem = document.createElement('img')
            elem.src = obj.url
            elem.className = "social_icon"

            url_a = document.createElement('a')
            url_a.href = obj.path
            url_a.target = "_blank"
            url_a.appendChild(elem)

            container = document.createElement('div')
            container.className = "icon_holder"
            container.appendChild(text_container)
            container.appendChild(url_a)

            container.dataset.scroll = ""
            container.dataset.scrollSpeed = -2
            container.dataset.scrollDirection = "horizontal"

            icon_list_container.appendChild(container)
        }
    }
}
</script>

<style scoped>
#footer
{
    width: 100vw;

    margin-bottom: 100vh;
}
#footer_title
{
    display: flex;
    flex-direction: column;
    margin: 10vw;

    white-space:nowrap;
}
.footer_text
{
    color: #e0e0e0;
    font-size: 15vw;
    margin: 0px;
}
.smol
{
    font-size: 8vw;
}
.center
{
    text-align: center;
}
.left
{
    text-align: left;
}
#icon_list_container
{
    display: flex;
    flex-direction: column;
}
#footer_body
{
    display: flex;
    flex-direction: row;    
    justify-content: space-around;
}
#footer_body img
{
    height: 50vh;
    z-index: -1;
}
</style>

<style>
.icon_holder
{
    display: flex;
    flex-direction: row;

    justify-content: flex-start;
    margin-top: 2vh;
    margin-bottom: 2vh;
}
.social_icon
{
    position: relative;
    height: 5vw;
    width: 5vw;
    transition-duration: 400ms;
}
.social_icon:hover
{
    transform: translateY(-10px) scale(1.2);
    transition-duration: 400ms;
}
.text_container
{
    width: 100%;
    overflow: hidden;
}
.icon_name
{
    color: #e0e0e0;
    font-size: 4vw;
    text-align: right;
    margin: 0px;
    
}
</style>