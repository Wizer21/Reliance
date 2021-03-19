<template>
    <div>
        <Loader @updateMute="setIsMuted"/>
        <!-- <Main /> -->        
    </div>
</template>

<script>
import Loader from './pages/Loader.vue'
// import Main from './pages/Main.vue'
export default {
  name: 'App',
  components: { Loader },
  method: {
    setIsMuted(){
        console.log("inapp")
    }
  }
}
</script>
