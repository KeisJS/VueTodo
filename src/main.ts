import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupWorker } from 'msw';

if (import.meta.env.VITE_USE_DEV_HTTP_MOCK) {
  const handlers = await import('/src/components/todo/mock/todoMock')

  setupWorker(...handlers.default).start({
    onUnhandledRequest: 'bypass',
  })
}

const app = createApp(App)

app.use(router)

app.mount('#app')
