System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var DarkSkyDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            DarkSkyDatasource = (function () {
                function DarkSkyDatasource(instanceSettings, backendSrv, templateSrv, $q) {
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.$q = $q;
                    console.log("DarkSkyDatasource");
                    console.log(instanceSettings);
                    this.type = instanceSettings.type;
                    this.name = instanceSettings.name;
                    this.url = "/api/datasources/proxy/" + instanceSettings.id + "/darksky/" + instanceSettings.jsonData.apikey + "/" + instanceSettings.jsonData.lat + "," + instanceSettings.jsonData.lon;
                    this.units = instanceSettings.units;
                }
                DarkSkyDatasource.prototype.query = function (options) {
                    var query = this.buildQueryParameters(options);
                    query.targets = query.targets.filter(function (t) { return !t.hide; });
                    if (query.targets.length <= 0) {
                        console.log("empty");
                        console.log(this.$q);
                        console.log(this.$q.when({ data: [] }));
                        return this.$q.when({ data: [] });
                    }
                    if (this.templateSrv.getAdhocFilters) {
                        query.adhocFilters = this.templateSrv.getAdhocFilters(this.name);
                    }
                    else {
                        query.adhocFilters = [];
                    }
                    console.log("query");
                    console.log(query);
                    return this.doRequest({
                        url: this.url,
                        data: query,
                        method: 'GET'
                    }).then(function (res) {
                        console.log("query");
                        console.log(res);
                        return res;
                    });
                };
                DarkSkyDatasource.prototype.testDatasource = function () {
                    console.log("testDatasource");
                    console.log(this.url);
                    return this.doRequest({
                        url: this.url,
                        method: 'GET',
                    }).then(function (response) {
                        if (response.status === 200) {
                            return { status: "success", message: "Data source is working", title: "Success" };
                        }
                    });
                };
                DarkSkyDatasource.prototype.annotationQuery = function (options) {
                    return [];
                };
                DarkSkyDatasource.prototype.metricFindQuery = function (query) {
                    return [
                        { text: 'currently', value: 'currently' },
                        { text: 'hourly', value: 'hourly' },
                        { text: 'daily', value: 'daily' },
                    ];
                };
                DarkSkyDatasource.prototype.doRequest = function (options) {
                    // options.withCredentials = this.withCredentials;
                    // options.headers = this.headers;
                    return this.backendSrv.datasourceRequest(options);
                };
                DarkSkyDatasource.prototype.buildQueryParameters = function (options) {
                    var _this = this;
                    //remove placeholder targets
                    options.targets = lodash_1.default.filter(options.targets, function (target) {
                        return target.target !== 'select metric';
                    });
                    var targets = lodash_1.default.map(options.targets, function (target) {
                        return {
                            target: _this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
                            refId: target.refId,
                            hide: target.hide,
                            type: target.type || 'timeserie'
                        };
                    });
                    options.targets = targets;
                    return options;
                };
                return DarkSkyDatasource;
            })();
            exports_1("DarkSkyDatasource", DarkSkyDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map