import { QueryCtrl } from 'grafana/app/plugins/sdk';
// import './css/query-editor.css!'

export class DarkSkyQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  
  private types: {text: string, value: string}[];

  /** @ngInject **/
  constructor($scope, $injector, private templateSrv)  {
    super($scope, $injector);

    this.types = [{ text: 'Time series', value: 'timeseries' }, { text: 'Table', value: 'table' }];

    this.target.target = this.target.target || 'select metric';
    this.target.type = this.target.type || ((this.panelCtrl.panel.type === 'table') ? 'table' : 'timeseries');
  }

  getOptions(query) {
    return this.datasource.metricFindQuery(this.target.type);
  }

  refresh() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}
