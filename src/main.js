import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import './style/index.scss'
import './icons'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'medium'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
