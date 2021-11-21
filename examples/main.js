import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import setupHttp from './utils/http'

async function bootstrap() {
    const app = createApp(App);

    setupHttp(app)
    app.use(router)
    app.mount('#app', true);
}
bootstrap()
