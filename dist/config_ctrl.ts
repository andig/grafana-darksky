///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

export class DarkSkyConfigCtrl {
  static templateUrl = 'partials/config.html';
  current: any;
  private units: any;

  /** @ngInject */
  constructor($scope) {
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
}
