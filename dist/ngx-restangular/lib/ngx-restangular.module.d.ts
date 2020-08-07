import { ModuleWithProviders, InjectionToken } from '@angular/core';
export declare const CONFIG_OBJ: InjectionToken<string>;
export declare class RestangularModule {
    constructor(parentModule: RestangularModule);
    static forRoot(configFunction?: (provider: any, ...arg: any[]) => void): ModuleWithProviders<any>;
    static forRoot(providers?: any[], configFunction?: (provider: any, ...arg: any[]) => void): ModuleWithProviders<any>;
}
