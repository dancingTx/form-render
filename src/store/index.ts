import { createStore, createLogger } from 'vuex';

const debug: boolean = process.env.NODE_ENV !== 'production';

export default createStore({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: debug ? [createLogger()] : [],
});
