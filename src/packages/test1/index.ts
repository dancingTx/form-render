import { ModuleProps } from '../type';

const module: ModuleProps = {
  name: 'test1',
  icon: 'el-icon-loading',
  routes: [
    {
      path: '/test1',
      name: 'test1',
      component: () => import('./src/index.vue'),
    },
  ],
};
export default module;
