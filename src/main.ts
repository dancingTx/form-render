import { createApp } from 'vue';
import Element from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css/normalize.css';
import 'element-plus/lib/theme-chalk/index.css';
import './style/index.scss';
import '@/utils/load';

store.dispatch('init/registerModules');

createApp(App)
  .use(store)
  .use(router)
  .use(Element)
  .mount('#app');