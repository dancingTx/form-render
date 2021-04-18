import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Layout from '@/layout/index.vue';

export const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/index',
  // },
  // {
  //   path: '/index',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/',
  //       name: 'index',
  //       component: () => import('@/views/index.vue'),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
