import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
const router = new VueRouter({ routes })
router.afterEach(() => {
  // 获取json
  store.dispatch('getComponents')
  store.dispatch('getFormConf')
  // 取消加载动画
  const spinner = document.querySelector('.spinner')
  spinner.parentNode.removeChild(spinner)
})
export default router
