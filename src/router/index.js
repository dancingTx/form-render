import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({ routes })
router.afterEach(() => {
  store.dispatch('getComponents')
  store.dispatch('getFormConf')
})
export default router
