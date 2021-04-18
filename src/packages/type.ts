import { RouteRecordRaw } from 'vue-router';

export interface ModuleProps {
    name: string,
    icon: string,
    routes: Array<RouteRecordRaw>
}
