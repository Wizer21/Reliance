import {createApp, h} from 'vue'

import Loader from './pages/Loader.vue'
import Main from './pages/Main.vue'


// Create Routes
const routes = {
  '/': Loader,
  '/main': Main,
}

// Create Router
const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),
  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || Error
    },
  },

  render() {
    return h(this.CurrentComponent)
  }
}

// Create APP 
createApp(SimpleRouter).mount('#app')  