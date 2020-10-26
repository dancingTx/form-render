import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

import Dashboard from '@/views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: Dashboard
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
