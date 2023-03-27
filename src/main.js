/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import store from './store/store.js';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import router from './router'

const app = createApp(App)
registerPlugins(app)

app.use(router);
app.use(store);
app.mount('#app')
