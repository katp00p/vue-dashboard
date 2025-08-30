import './style.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useShortcutsStore } from '@/stores/shortcuts'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const shortcuts = useShortcutsStore(pinia)
shortcuts.hydrate()
shortcuts.$subscribe((_mutation, state) => {
  localStorage.setItem('shortcuts.settings.v1', JSON.stringify(state.settings))
})

app.mount('#app')
