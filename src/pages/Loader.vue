<template>   
    <div id="loader">     
        <div @click="toggleMute" id="control_button">
            <img :src="mute_icon" alt="M" id="control_image">
        </div>   
        <div id="wave">
        </div>   
    </div>
</template>

<script>
export default {
    name: 'Loader',
    data(){
        return {   
            videoMute: true,         
            mute_icon: require('../assets/icon/volume_off-24px.svg'),
        }
    },
    methods: {                    
        toggleMute() {
            if (this.videoMute){
                this.videoMute = false
                this.mute_icon = require('../assets/icon/volume_up-24px.svg')
            }
            else{
                this.videoMute = true
                this.mute_icon = require('../assets/icon/volume_off-24px.svg')
            }            
            this.$emit('updateMute', this.videoMute)
        },
        close(){             
            const loader = document.getElementById('loader')
            const control_button = document.getElementById('control_button')

            loader.style.height = "0px"
            control_button.style.opacity = "0"  
            document.getElementById('wave').style.opacity = "0"  

            setTimeout(() => {
                loader.style.display = "none"
            }, 1500)
        }
    },
    mounted(){
        let control_button = document.getElementById('control_button')
        let wave = document.getElementById('wave')

        control_button.addEventListener('click', () => {
            wave.style.animation = `${this.$style['waveup']} 500ms`

            setTimeout(() => {
                if (control_button.matches(':hover')){
                    wave.style.animation = `${this.$style['wavereset_hover']} 500ms`
                }
                else {
                    wave.style.animation = `${this.$style['wavereset_not_hover']} 500ms`
                }
            }, 500)
        })    
        control_button.addEventListener('mouseover', () => {
            wave.style.transform = "scale(1.3)"
        })    
        control_button.addEventListener('mouseleave', () => {
            wave.style.transform = "scale(1)"
        })
    }
}
</script>

<style scoped>
#loader
{
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
    background-color: #0c0c0c;

    transition-duration: 1500ms;
}
#control_button
{    
    transition-duration: 1500ms;
}
#control_image
{
    position: relative;
    height: 8vw;
    cursor: pointer;
    transition: opacity 1000ms;
    transition: height 500ms;
    z-index: 5;
}
#control_image:hover
{
    height: 9.6vw;
}
#wave
{
    position: absolute;
    height: 12vw;
    width: 12vw;
    z-index: 1;
    border-radius: 50%;

    border: 2px solid rgb(75, 75, 75);
    transition-duration: 500ms;
    animation-fill-mode: forwards;
}
</style>

<style module>
@keyframes waveup {
    0%{
        opacity: 1;
        transform: scale(1);
    }
    100%{
        opacity: 0;
        transform: scale(5);
    }    
}
@keyframes wavereset_hover {
    0%{
        opacity: 0;
        transform: scale(0);
    }
    100%{
        opacity: 1;
        transform: scale(1.3);
    }    
}
@keyframes wavereset_not_hover {
    0%{
        opacity: 0;
        transform: scale(0);
    }
    100%{
        opacity: 1;
        transform: scale(1);
    }    
}
</style>