export declare class DarkSkyDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    type: string;
    name: string;
    units: string;
    url: string;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    testDatasource(): any;
    annotationQuery(options: any): any[];
    metricFindQuery(query: any): {
        text: string;
        value: string;
    }[];
    doRequest(options: any): any;
    buildQueryParameters(options: any): any;
}
