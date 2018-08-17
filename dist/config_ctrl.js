///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var DarkSkyConfigCtrl;
    return {
        setters:[],
        execute: function() {
            DarkSkyConfigCtrl = (function () {
                /** @ngInject */
                function DarkSkyConfigCtrl($scope) {
                    console.log("DarkSkyConfigCtrl");
                    console.log($scope);
                    console.log(this);
                    this.units = [
                        { name: 'SI', value: 'si' },
                        { name: 'Auto', value: 'auto' },
                        { name: 'US', value: 'us' },
                        { name: 'CA', value: 'ca' },
                        { name: 'UK', value: 'uk2' },
                    ];
                    this.current.jsonData.unit = this.current.jsonData.unit || 'si';
                }
                DarkSkyConfigCtrl.templateUrl = 'partials/config.html';
                return DarkSkyConfigCtrl;
            })();
            exports_1("DarkSkyConfigCtrl", DarkSkyConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map