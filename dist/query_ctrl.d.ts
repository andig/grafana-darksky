import { QueryCtrl } from 'app/plugins/sdk';
export declare class DarkSkyQueryCtrl extends QueryCtrl {
    private templateSrv;
    static templateUrl: string;
    private types;
    constructor($scope: any, $injector: any, templateSrv: any);
    getOptions(query: any): any;
    refresh(): void;
}
