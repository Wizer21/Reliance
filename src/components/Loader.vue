<template>   
    <div id="loader">        
        <div @click="toggleMute" id="control_button">
            <img :src="mute_icon" alt="M">
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
            document.getElementById('loader').style.height = "0px"
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
    background-color: #262626;

    transition-duration: 2000ms;
}
#control_button img
{
    height: 10vw;
    width: 10vw;
    cursor: pointer;
}
</style>