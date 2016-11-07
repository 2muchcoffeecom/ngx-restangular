import { OpaqueToken } from "@angular/core";
export declare const RESTANGULAR: OpaqueToken;
export declare function RestangularFactory(...config: any[]): () => {
    fn: any;
    arrServices: any[];
};
