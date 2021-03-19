<template>
    <div id="app">
        <Loader @updateMute="updateMuted" />
        <Main />        
    </div>
</template>

<script>
import Loader from './pages/Loader.vue'
import Main from './pages/Main.vue'

export default {
    name: 'App',
    components: { Loader, Main },
    methods: {
        updateMuted(){
            console.log("inapp")
        }
    },
    mounted(){
        this.updateMuted()
    }
}
</script>
