System.register(['app/plugins/sdk', './css/query-editor.css!'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1;
    var DarkSkyQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {}],
        execute: function() {
            DarkSkyQueryCtrl = (function (_super) {
                __extends(DarkSkyQueryCtrl, _super);
                function DarkSkyQueryCtrl($scope, $injector, templateSrv) {
                    _super.call(this, $scope, $injector);
                    this.templateSrv = templateSrv;
                    this.types = [{ text: 'Time series', value: 'timeseries' }, { text: 'Table', value: 'table' }];
                    this.target.target = this.target.target || 'select metric';
                    this.target.type = this.target.type || ((this.panelCtrl.panel.type === 'table') ? 'table' : 'timeseries');
                }
                DarkSkyQueryCtrl.prototype.getOptions = function (query) {
                    return this.datasource.metricFindQuery(this.target.type);
                };
                DarkSkyQueryCtrl.prototype.refresh = function () {
                    this.panelCtrl.refresh(); // Asks the panel to refresh data.
                };
                DarkSkyQueryCtrl.templateUrl = 'partials/query.editor.html';
                return DarkSkyQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("DarkSkyQueryCtrl", DarkSkyQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map