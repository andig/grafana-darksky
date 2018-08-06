/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export declare class DarkSkyConfigCtrl {
    static templateUrl: string;
    current: any;
    /** @ngInject */
    constructor($scope: any);
    unitOptions: {
        name: string;
        value: string;
    }[];
}
