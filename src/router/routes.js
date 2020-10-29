import Layout from '@/Layout'
import Dashboard from '@/views/index.vue'
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

export default routes
