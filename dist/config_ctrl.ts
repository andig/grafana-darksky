///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

export class DarkSkyConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;

  /** @ngInject */
  constructor($scope) {
    console.log("DarkSkyConfigCtrl");
    console.log($scope);
  }

  unitOptions = [{ name: 'SI', value: 'SI' }];
}
