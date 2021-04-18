import { Module, MutationTree, ActionTree } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import router, { routes } from '@/router/index';
import { loadModules } from '@/utils/load';
import Layout from '@/layout/index.vue';
import {
  RootState, InitState, PayloadProps, RouteInfo,
} from '../type';
import { SET_INIT_INFO } from '../mutations-type';

type Route = Array<RouteRecordRaw> | RouteRecordRaw
type State = { [key: string]: any }

// default 0 with first route
const retrieveRoutePath = (route: Route, anchor:number) => (
  (Array.isArray(route) && route.length) ? route[anchor].path : (route as RouteRecordRaw).path
);

const rebuildRoutes = (route: Route, anchor = 0) => ({
  path: retrieveRoutePath(route, anchor),
  component: Layout,
  children: Array.isArray(route) ? route : [route],
});

const state:InitState = {
  routes: [],
  configs: [],
};

const mutations: MutationTree<InitState> = {
  [SET_INIT_INFO](_state: State, { key, value }) {
    if (Object.prototype.hasOwnProperty.call(_state, key)) {
      // eslint-disable-next-line no-param-reassign
      _state[key] = value;
    }
  },
};

const actions: ActionTree<InitState, RootState> = {
  registerModules({ commit }) {
    const modules = loadModules();
    const configs:Array<RouteInfo> = [];
    const asyncRoutes:Array<RouteRecordRaw> = [];
    modules.forEach((module:State) => {
      // merge routes
      const route = rebuildRoutes(module.routes, 0);
      router.addRoute(route);
      asyncRoutes.push(route);
      // add routes info
      const info: RouteInfo = {};
      Object.keys(module).forEach((key) => {
        if (key === 'routes') {
          info.path = retrieveRoutePath(module[key], 0);
          return;
        }
        info[key as keyof RouteInfo] = module[key];
      });
      configs.push(info);
    });

    const dispatch = [
      { key: 'routes', value: routes.concat(asyncRoutes) },
      { key: 'configs', value: configs },
    ];
    dispatch.forEach((item) => {
      commit(SET_INIT_INFO, item);
    });
  },
};

const module: Module<InitState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
export default module;
