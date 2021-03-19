<template>   
    <div id="loader">        
        <div @click="toggleMute" id="control_button">
            <img :src="mute_icon" alt="M" id="control_image">
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
                document.getElementById("video_container").muted = false
                this.mute_icon = require('../assets/icon/volume_up-24px.svg')
            }
            else{
                this.videoMute = true
                document.getElementById("video_container").muted = true
                this.mute_icon = require('../assets/icon/volume_off-24px.svg')
            }

            this.$emit('update')
        },
        close_elem() {
            const loader = document.getElementById('loader')
            const control_image = document.getElementById('control_image')

            loader.style.height = "0px"
            control_image.style.opacity = "0"
            

            setTimeout(() => {
                loader.style.display = "none"
            }, 1500)
        }
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
#control_image
{
    height: 10vw;
    width: 10vw;
    cursor: pointer;
    transition-duration: 1000ms;
}
</style>