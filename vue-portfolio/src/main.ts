import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import scrollReveal from './directives/scrollReveal'

const app = createApp(App)

app.directive("scroll-reveal", scrollReveal)

app.use(router)
app.mount('#app')
