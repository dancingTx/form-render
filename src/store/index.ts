import {
  createStore, createLogger, StoreOptions, Module,
} from 'vuex';
import { RootState } from './type';

const debug: boolean = process.env.NODE_ENV !== 'production';
type Modules = {[key: string]: Module<any, RootState> }

const requireAll = require.context('./module', false, /\.ts$/);
const modules:Modules = requireAll.keys().reduce((total: Modules, path) => {
  const moduleName = path.replace(/\.\/(\w+)\.ts$/, '$1');
  const moduleCore = requireAll(path).default;
  // eslint-disable-next-line no-param-reassign
  total[moduleName] = moduleCore;
  return total;
}, {});
const store: StoreOptions<RootState> = {
  strict: true,
  modules,
  plugins: debug ? [createLogger()] : [],
};
export default createStore<RootState>(store);
