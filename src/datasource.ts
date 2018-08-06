import _ from "lodash";

export class DarkSkyDatasource {

  type: string;
  name: string;
  units: string;
  url: string;

  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    console.log("DarkSkyDatasource");
    console.log(instanceSettings);

    this.type = instanceSettings.type;
    this.name = instanceSettings.name;

    this.url = `/api/datasources/proxy/${instanceSettings.id}/darksky/${instanceSettings.jsonData.apikey}/${instanceSettings.jsonData.lat},${instanceSettings.jsonData.lon}`;
    this.units = instanceSettings.units;
  }

  query(options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      console.log("empty");
      console.log(this.$q);
      console.log(this.$q.when({data: []}));
      return this.$q.when({data: []});
    }

    if (this.templateSrv.getAdhocFilters) {
      query.adhocFilters = this.templateSrv.getAdhocFilters(this.name);
    } else {
      query.adhocFilters = [];
    }

    console.log("query");
    console.log(query);

    return this.doRequest({
      url: this.url,
      data: query,
      method: 'GET'
    }).then(res => {
      console.log("query");
      console.log(res);
      return res;
    });
  }

  testDatasource() {
    console.log("testDatasource")
    console.log(this.url)
    return this.doRequest({
      url: this.url,
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  annotationQuery(options) {
    return [];
  }

  metricFindQuery(query) {
    return [
      { text: 'currently', value: 'currently' },
      { text: 'hourly', value: 'hourly' },
      { text: 'daily', value: 'daily' },
    ];
  }

  doRequest(options) {
    // options.withCredentials = this.withCredentials;
    // options.headers = this.headers;
    return this.backendSrv.datasourceRequest(options);
  }

  buildQueryParameters(options) {
    //remove placeholder targets
    options.targets = _.filter(options.targets, target => {
      return target.target !== 'select metric';
    });

    var targets = _.map(options.targets, target => {
      return {
        target: this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
        refId: target.refId,
        hide: target.hide,
        type: target.type || 'timeserie'
      };
    });

    options.targets = targets;

    return options;
  }
}
