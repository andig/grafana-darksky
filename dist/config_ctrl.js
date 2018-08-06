///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var DarkSkyConfigCtrl;
    return {
        setters:[],
        execute: function() {
            DarkSkyConfigCtrl = (function () {
                /** @ngInject */
                function DarkSkyConfigCtrl($scope) {
                    this.unitOptions = [{ name: 'SI', value: 'SI' }];
                    console.log("DarkSkyConfigCtrl");
                    console.log($scope);
                }
                DarkSkyConfigCtrl.templateUrl = 'partials/config.html';
                return DarkSkyConfigCtrl;
            })();
            exports_1("DarkSkyConfigCtrl", DarkSkyConfigCtrl);
        }
    }
});
//# sourceMappingURL=config_ctrl.js.map