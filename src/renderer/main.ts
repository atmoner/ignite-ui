import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue'
import * as VueRouter from 'vue-router'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Home from './pages/Home.vue'
import Scaffold from './pages/Scaffold.vue'
import Version from './pages/Version.vue'
import Settings from './pages/Settings.vue'
import ChainDetail from './pages/ChainDetail.vue'
import Relayer from './pages/Relayer.vue'

 
import { BaklavaVuePlugin } from "@baklavajs/plugin-renderer-vue3";
import "@baklavajs/plugin-renderer-vue3/dist/styles.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})


const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/relayer',
        name: 'Relayer',
        component: Relayer 
      },
      {
        path: '/scaffold',
        name: 'Scaffold',
        component: Scaffold 
      },
      {
        path: '/version',
        name: 'Version',
        component: Version
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: '/chain/:name',
        name: 'ChainDetail',
        component: ChainDetail
      }
    ]
  })

  const pinia = createPinia() 


const app = createApp(App).use(vuetify).use(router).use(BaklavaVuePlugin).use(pinia);

app.mount('#app');
