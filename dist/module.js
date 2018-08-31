define(["app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config_ctrl.ts":
/*!************************!*\
  !*** ./config_ctrl.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DarkSkyConfigCtrl = /** @class */function () {
    /** @ngInject **/
    function DarkSkyConfigCtrl($scope) {
        console.log("DarkSkyConfigCtrl");
        console.log($scope);
        console.log(this);
        this.units = [{ name: 'SI', value: 'si' }, { name: 'Auto', value: 'auto' }, { name: 'US', value: 'us' }, { name: 'CA', value: 'ca' }, { name: 'UK', value: 'uk2' }];
        this.languages = [{ name: 'Arabic', value: 'ar' }, { name: 'Azerbaijani', value: 'az' }, { name: 'Belarusian', value: 'be' }, { name: 'Bulgarian', value: 'bg' }, { name: 'Bosnian', value: 'bs' }, { name: 'Catalan', value: 'ca' }, { name: 'Czech', value: 'cs' }, { name: 'Danish', value: 'da' }, { name: 'German', value: 'de' }, { name: 'Greek', value: 'el' }, { name: 'English', value: 'en' }, { name: 'Spanish', value: 'es' }, { name: 'Estonian', value: 'et' }, { name: 'Finnish', value: 'fi' }, { name: 'French', value: 'fr' }, { name: 'Hebrew', value: 'he' }, { name: 'Croatian', value: 'hr' }, { name: 'Hungarian', value: 'hu' }, { name: 'Indonesian', value: 'id' }, { name: 'Icelandic', value: 'is' }, { name: 'Italian', value: 'it' }, { name: 'Japanese', value: 'ja' }, { name: 'Georgian', value: 'ka' }, { name: 'Korean', value: 'ko' }, { name: 'Cornish', value: 'kw' }, { name: 'Norwegian', value: 'nb' }, { name: 'Dutch', value: 'nl' }, { name: 'Polish', value: 'pl' }, { name: 'Portuguese', value: 'pt' }, { name: 'Romanian', value: 'ro' }, { name: 'Russian', value: 'ru' }, { name: 'Slovak', value: 'sk' }, { name: 'Slovenian', value: 'sl' }, { name: 'Serbian', value: 'sr' }, { name: 'Swedish', value: 'sv' }, { name: 'Tetum', value: 'tet' }, { name: 'Turkish', value: 'tr' }, { name: 'Ukrainian', value: 'uk' }, { name: 'Chinese', value: 'zh' }];
        this.current.jsonData.unit = this.current.jsonData.unit || 'si';
        this.current.jsonData.language = this.current.jsonData.language || 'en';
    }
    DarkSkyConfigCtrl.templateUrl = 'partials/config.html';
    return DarkSkyConfigCtrl;
}();
exports.DarkSkyConfigCtrl = DarkSkyConfigCtrl;

/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DarkSkyDatasource = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DarkSkyDatasource = /** @class */function () {
    /** @ngInject **/
    function DarkSkyDatasource(instanceSettings, backendSrv, templateSrv, $q) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.$q = $q;
        this.datasourceName = instanceSettings.name;
        var config = instanceSettings.jsonData;
        var credentials = config.apikey + "/" + config.lat + "," + config.lon;
        this.apiUrl = "/api/datasources/proxy/" + instanceSettings.id + "/darksky/" + credentials;
        this.apiOptions = "units=" + config.unit + "&lang=" + config.language;
    }
    DarkSkyDatasource.prototype.metricFindQuery = function (query) {
        var _this = this;
        // cache metrics query
        if (this.metrics) {
            return this.metrics;
        }
        return this.doRequest({
            data: query
        }).then(function (res) {
            // get all properties from forecast query
            var datasets = ['currently', /*'minutely',*/'hourly', 'daily'];
            var metrics = _lodash2.default.transform(datasets, function (metrics, dataset) {
                var props = res.data[dataset];
                if (props && _lodash2.default.isArray(props.data)) {
                    props = props.data.length ? props.data[0] : {};
                }
                metrics.push.apply(metrics, _lodash2.default.filter(_lodash2.default.keys(props), function (key) {
                    return key != 'time';
                }));
            }, []);
            _this.metrics = _lodash2.default.map(_lodash2.default.uniq(_lodash2.default.sortBy(metrics)), function (metric) {
                return {
                    text: metric,
                    value: metric
                };
            });
            return _this.metrics;
        });
    };
    DarkSkyDatasource.prototype.query = function (options) {
        var _this = this;
        var query = this.buildQueryParameters(options);
        query.targets = query.targets.filter(function (t) {
            return !t.hide;
        });
        if (query.targets.length <= 0) {
            return this.$q.when({ data: [] });
        }
        if (this.templateSrv.getAdhocFilters) {
            query.adhocFilters = this.templateSrv.getAdhocFilters(this.datasourceName);
        } else {
            query.adhocFilters = [];
        }
        var apiCalls = this.getApiCalls(query.range, query.maxDataPoints);
        var requests = _lodash2.default.map(apiCalls.timestamps, function (ts) {
            return _this.doRequest({
                url: _this.apiUrl + "," + ts + "?" + _this.apiOptions,
                data: query
            });
        });
        if (apiCalls.timestamps.length >= 10) {
            console.warn("DarkSky will execute " + apiCalls.timestamps.length + " api.");
        }
        return Promise.all(requests).then(function (response) {
            // extraxt data from json result structure
            var data = _lodash2.default.transform(response, function (data, res) {
                // select currently datapoint
                var dataset = _lodash2.default.get(res, "data." + apiCalls.dataset);
                if (apiCalls.dataset == 'currently') {
                    data.push(dataset);
                    return;
                }
                // select timestamps inside query range
                data.push.apply(data, _lodash2.default.filter(dataset.data, function (res) {
                    var timeMS = res.time * 1000;
                    return timeMS >= query.range.from && timeMS <= query.range.to;
                }));
            }, []);
            // sort by timestamp
            data = _lodash2.default.sortBy(data, 'time');
            // table query?
            return _lodash2.default.filter(query.targets, { type: 'table' }).length ? _this.tableResponse(query.targets, data) : _this.timeseriesResponse(query.targets, data);
        });
    };
    DarkSkyDatasource.prototype.getApiCalls = function (range, maxDataPoints) {
        var dataset = 'hourly',
            step = 1;
        var hours = range.to.diff(range.from, 'hours');
        var date = range.from.clone().startOf('day');
        var timestamps = [date.unix()];
        // not same day?
        if (range.to.date() !== range.from.date()) {
            if (hours > 7 * 24) {
                // daily queries - daily
                dataset = 'daily';
                if (maxDataPoints) {
                    // limit number of queries
                    var days = range.to.diff(range.from, 'days');
                    step = Math.max(step, Math.floor(days / maxDataPoints));
                }
            }
            ;
            // create one timestamp per additional day
            date.add(step, 'day');
            while (date.isBefore(range.to)) {
                timestamps.push(date.unix());
                date.add(step, 'day');
            }
        }
        return {
            dataset: dataset,
            timestamps: timestamps
        };
    };
    DarkSkyDatasource.prototype.tableResponse = function (targets, data) {
        // use first metric for table query
        var timeframe = targets[0].target;
        var columns = _lodash2.default.map(_lodash2.default.head(data), function (val, key) {
            return {
                text: key,
                type: key.match(/[Tt]ime/) ? 'time' : typeof val === 'string' ? 'string' : 'number'
            };
        });
        var rows = _lodash2.default.map(data, function (row) {
            return _lodash2.default.map(columns, function (col) {
                if (row[col.text] === undefined) return null;
                // time to millisec
                return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
            });
        });
        return {
            data: [{
                type: "table",
                columns: columns,
                rows: rows
            }]
        };
    };
    DarkSkyDatasource.prototype.timeseriesResponse = function (targets, data) {
        var res = {
            data: _lodash2.default.map(targets, function (target) {
                return {
                    target: target.target,
                    datapoints: _lodash2.default.map(data, function (d) {
                        return [d[target.target], d.time * 1000];
                    })
                };
            })
        };
        return res;
    };
    DarkSkyDatasource.prototype.buildQueryParameters = function (options) {
        var _this = this;
        // remove placeholder targets
        options.targets = _lodash2.default.filter(options.targets, function (target) {
            return target.target !== 'select metric';
        });
        // apply variables
        options.targets = _lodash2.default.map(options.targets, function (target) {
            return {
                target: _this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
                refId: target.refId,
                hide: target.hide,
                type: target.type
            };
        });
        return options;
    };
    DarkSkyDatasource.prototype.testDatasource = function () {
        return this.doRequest({}).then(function (response) {
            return response.status == 200 ? { status: 'success', message: 'Data source is working', title: 'Success' } : { status: 'error', message: "Data source returned status " + response.status, title: 'Error' };
        });
    };
    DarkSkyDatasource.prototype.doRequest = function (options) {
        // call with pre-defined default options
        return this.backendSrv.datasourceRequest(_lodash2.default.assign({
            url: this.apiUrl,
            method: 'GET'
        }, options)).then(function (response) {
            var calls = _lodash2.default.get(response.headers(), 'x-forecast-api-calls');
            if (calls > 400) {
                console.warn("DarkSky noticed you've already executed " + calls + " api calls. Free limit is 1000.");
            }
            return response;
        });
    };
    DarkSkyDatasource.prototype.annotationQuery = function (options) {
        return [];
    };
    return DarkSkyDatasource;
}();
exports.DarkSkyDatasource = DarkSkyDatasource;

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = __webpack_require__(/*! ./datasource */ "./datasource.ts");

var _query_ctrl = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");

var _config_ctrl = __webpack_require__(/*! ./config_ctrl */ "./config_ctrl.ts");

exports.Datasource = _datasource.DarkSkyDatasource;
exports.QueryCtrl = _query_ctrl.DarkSkyQueryCtrl;
exports.ConfigCtrl = _config_ctrl.DarkSkyConfigCtrl;

/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DarkSkyQueryCtrl = undefined;

var _sdk = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

// import './css/query-editor.css!'
var DarkSkyQueryCtrl = /** @class */function (_super) {
    __extends(DarkSkyQueryCtrl, _super);
    /** @ngInject **/
    function DarkSkyQueryCtrl($scope, $injector, templateSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.types = [{ text: 'Time series', value: 'timeseries' }, { text: 'Table', value: 'table' }];
        _this.target.target = _this.target.target || 'select metric';
        _this.target.type = _this.target.type || (_this.panelCtrl.panel.type === 'table' ? 'table' : 'timeseries');
        return _this;
    }
    DarkSkyQueryCtrl.prototype.getOptions = function (query) {
        return this.datasource.metricFindQuery(this.target.type);
    };
    DarkSkyQueryCtrl.prototype.refresh = function () {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    };
    DarkSkyQueryCtrl.templateUrl = 'partials/query.editor.html';
    return DarkSkyQueryCtrl;
}(_sdk.QueryCtrl);
exports.DarkSkyQueryCtrl = DarkSkyQueryCtrl;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map