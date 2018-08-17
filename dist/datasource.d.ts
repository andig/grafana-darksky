export declare class DarkSkyDatasource {
    private backendSrv;
    private templateSrv;
    private $q;
    type: string;
    name: string;
    units: string;
    darkSky: string;
    url: string;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    metricFindQuery(query: any): any;
    query(options: any): any;
    tableResponse(targets: any, data: any): {
        data: {
            type: string;
            columns: any[];
            rows: any[];
        }[];
    };
    timeseriesResponse(targets: any, data: any): {
        data: any;
    };
    testDatasource(): any;
    annotationQuery(options: any): any[];
    doRequest(options: any): any;
    buildQueryParameters(options: any): any;
}
