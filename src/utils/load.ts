import { ModuleProps } from '@/packages/type';

export const loadModules = (): Array<ModuleProps> => {
  const requireAll = require.context('@/packages', true, /(index\.ts)$/);
  return requireAll.keys().map((item) => requireAll(item).default);
};

export default {
  loadModules,
};
