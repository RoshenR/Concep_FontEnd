import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import scrollReveal from './directives/scrollReveal'
import './style.css'

const app = createApp(App)

app.directive("scroll-reveal", scrollReveal)

app.use(router)
app.mount('#app')
