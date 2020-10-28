import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({ routes })
router.afterEach(() => {
  store.dispatch('components/getComponents')
  store.dispatch('components/getFormConf')
})
export default router
