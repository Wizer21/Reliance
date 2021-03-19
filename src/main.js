import {createApp, h} from 'vue'

import App from './App.vue'

// Create Routes
const routes = {
  '/': App,
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
  },
}

// Create APP 
createApp(SimpleRouter).mount('#app')  