export interface RootState {
    data?: string
}
export interface InitState {
    routes: [],
    configs: []
}

export interface PayloadProps {
    key: string,
    value: any,
    storage?: string
}

export interface RouteInfo {
    path?: string,
    name?: string,
    icon?: string
}
