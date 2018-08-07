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
                    this.url = "/api/datasources/proxy/" + instanceSettings.id + "/darksky/" + instanceSettings.jsonData.apikey + "/" + instanceSettings.jsonData.lat + "," + instanceSettings.jsonData.lon + "?units=si";
                    this.units = instanceSettings.units;
                }
                DarkSkyDatasource.prototype.query = function (options) {
                    var _this = this;
                    var query = this.buildQueryParameters(options);
                    query.targets = query.targets.filter(function (t) { return !t.hide; });
                    if (query.targets.length <= 0) {
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
                        console.log(res);
                        return _this.tableResponse(query.targets, res);
                    });
                };
                DarkSkyDatasource.prototype.tableResponse = function (targets, data) {
                    var targetName = targets[0].target;
                    var slice = data.data[targetName];
                    if (targetName == 'currently') {
                        // normalize 'currently' into data: array
                        slice = {
                            data: [lodash_1.default.clone(slice)]
                        };
                    }
                    console.log("slice");
                    console.log(slice);
                    var res = {
                        "type": "table",
                        columns: [],
                        rows: []
                    };
                    if (slice.data.length) {
                        // extract columns
                        res.columns = lodash_1.default.map(slice.data[0], function (v, k) {
                            console.log(k + "," + v);
                            var col = {
                                text: k,
                                type: typeof (v) === 'string' ? 'string' : 'number'
                            };
                            if (k.match(/[Tt]ime/)) {
                                col.type = 'time';
                            }
                            return col;
                        });
                        // extract rows
                        console.log("slice.data");
                        console.log(slice.data);
                        res.rows = lodash_1.default.map(slice.data, function (row) {
                            return lodash_1.default.map(res.columns, function (col) {
                                if (row[col.text] === undefined)
                                    return null;
                                // time to millisec
                                return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
                            });
                        });
                        console.log("table");
                        console.log(res);
                    }
                    // return res;
                    return {
                        data: [res]
                    };
                };
                DarkSkyDatasource.prototype.queryResponse = function (targets, data) {
                    var res = {
                        data: []
                    };
                    res.data = lodash_1.default.map(targets, function (target) {
                        var slice = data.data[target.target]; // currently...
                        console.log(slice);
                        var sliceData = {
                            target: target.target,
                            datapoints: lodash_1.default.map(slice.data, function (d, i) {
                                return [d.temperatureLow, d.time * 1000];
                            }),
                        };
                        return sliceData;
                    });
                    return res;
                };
                DarkSkyDatasource.prototype.testDatasource = function () {
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