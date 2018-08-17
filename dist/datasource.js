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
                    var apiUrl = lodash_1.default.filter(instanceSettings.meta.routes, { path: 'darksky' })[0].url;
                    var credentials = instanceSettings.jsonData.apikey + "/" + instanceSettings.jsonData.lat + "," + instanceSettings.jsonData.lon + "?units=" + instanceSettings.jsonData.unit;
                    this.darkSky = apiUrl + "/" + credentials;
                    this.url = "/api/datasources/proxy/" + instanceSettings.id + "/darksky/" + credentials;
                    this.units = instanceSettings.units;
                }
                DarkSkyDatasource.prototype.metricFindQuery = function (query) {
                    // console.log("metricFindQuery");
                    // console.log(query);
                    var timeframes = ['currently', 'minutely', 'hourly', 'daily'];
                    // metrics for table
                    if (query == 'table') {
                        return lodash_1.default.map(timeframes, function (timeframe) {
                            return { text: timeframe, value: timeframe };
                        });
                    }
                    // metrics for timeseries
                    return this.doRequest({
                        url: this.url,
                        data: query,
                        method: 'GET'
                    }).then(function (res) {
                        var metrics = [];
                        // get all properties from forecast query
                        lodash_1.default.each(timeframes, function (key) {
                            var props = res.data[key];
                            if (props && lodash_1.default.isArray(props.data)) {
                                props = props.data.length ? props.data[0] : {};
                            }
                            metrics.push.apply(metrics, lodash_1.default.filter(lodash_1.default.keys(props), function (key) {
                                return key != "time";
                            }));
                        });
                        // create metrics as properties x timeframes
                        var metricsByTime = [];
                        lodash_1.default.each(lodash_1.default.uniq(lodash_1.default.sortBy(metrics)), function (el) {
                            var s = lodash_1.default.map(timeframes, function (timeframe) {
                                return { text: el + " (" + timeframe + ")", value: timeframe + "." + el };
                            });
                            // console.log(s);
                            metricsByTime.push.apply(metricsByTime, s);
                            return s;
                        });
                        return metricsByTime;
                    });
                };
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
                    console.log(this.darkSky);
                    return this.doRequest({
                        url: this.url,
                        data: query,
                        method: 'GET'
                    }).then(function (res) {
                        // table query?
                        if (lodash_1.default.filter(query.targets, { type: 'table' }).length) {
                            return _this.tableResponse(query.targets, res);
                        }
                        else {
                            return _this.timeseriesResponse(query.targets, res);
                        }
                    });
                };
                DarkSkyDatasource.prototype.tableResponse = function (targets, data) {
                    // console.log("tableResponse");
                    // use first metric for table query
                    var timeframe = targets[0].target;
                    var slice = data.data[timeframe];
                    // normalize 'currently' into data: array
                    if (timeframe == 'currently') {
                        slice = {
                            data: [lodash_1.default.clone(slice)]
                        };
                    }
                    var columns = [], rows = [];
                    if (slice.data.length) {
                        // extract columns
                        columns = lodash_1.default.map(slice.data[0], function (v, k) {
                            return {
                                text: k,
                                type: (k.match(/[Tt]ime/)) ? 'time' : (typeof (v) === 'string' ? 'string' : 'number')
                            };
                        });
                        // extract rows
                        rows = lodash_1.default.map(slice.data, function (row) {
                            return lodash_1.default.map(columns, function (col) {
                                if (row[col.text] === undefined)
                                    return null;
                                // time to millisec
                                return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
                            });
                        });
                    }
                    // return res;
                    return {
                        data: [{
                                type: "table",
                                columns: columns,
                                rows: rows,
                            }]
                    };
                };
                DarkSkyDatasource.prototype.timeseriesResponse = function (targets, data) {
                    // console.log("timeseriesResponse");
                    var res = {
                        data: lodash_1.default.map(targets, function (target) {
                            var _a = target.target.split('.'), timeframe = _a[0], metric = _a[1];
                            var slice = data.data[timeframe]; // currently...
                            return {
                                target: target.target,
                                datapoints: lodash_1.default.map(slice.data, function (d) {
                                    return [d[metric], d.time * 1000];
                                }),
                            };
                        })
                    };
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
                DarkSkyDatasource.prototype.doRequest = function (options) {
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
                            type: target.type
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