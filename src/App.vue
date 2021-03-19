<template>
    <div id="app">
        <Loader @updateMute="updateMuted" ref="loader"/>
        <Main ref="main" />        
    </div>
</template>

<script>
import Loader from './pages/Loader.vue'
import Main from './pages/Main.vue'

export default {
    name: 'App',
    components: { Loader, Main },
    data(){
        return {
            isMute: true
        }
    },
    methods: {
        updateMuted(mute){
            this.isMute = mute
        }
    },
    mounted(){
        setTimeout(() => {
            this.$refs.loader.close()
            this.$refs.main.start(this.isMute)
        }, 1500)
    }
}
</script>
