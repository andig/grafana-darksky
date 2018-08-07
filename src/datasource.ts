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

    this.url = `/api/datasources/proxy/${instanceSettings.id}/darksky/${instanceSettings.jsonData.apikey}/${instanceSettings.jsonData.lat},${instanceSettings.jsonData.lon}?units=si`;
    this.units = instanceSettings.units;
  }

  query(options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
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
      console.log(res);
      return this.tableResponse(query.targets, res);
    });
  }

  tableResponse(targets, data) {
    var targetName = targets[0].target;
    var slice = data.data[targetName];

    if (targetName == 'currently') {
      // normalize 'currently' into data: array
      slice = {
        data: [_.clone(slice)]
      }
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
      res.columns = _.map(slice.data[0], (v,k) => {
        console.log(k+","+v);

        var col = {
          text: k,
          type: typeof(v) === 'string' ? 'string' : 'number'
        }

        if (k.match(/[Tt]ime/)) {
          col.type = 'time';
        }

        return col;
      });

      // extract rows
      console.log("slice.data");
      console.log(slice.data);
      res.rows = _.map(slice.data, row => {
        return _.map(res.columns, col => {
          if (row[col.text] === undefined) return null;

          // time to millisec
          return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
        })
      });

      console.log("table");
      console.log(res);
    }

    // return res;
    return {
      data: [res]
    };
  }

  queryResponse(targets, data) {
    var res = {
      data: []
    };


    res.data = _.map(targets, target => {
      var slice = data.data[target.target]; // currently...

      console.log(slice);

      var sliceData = {
        target: target.target,
        datapoints: _.map(slice.data, (d, i) => {
          return [d.temperatureLow, d.time*1000];
        }),
      };

      return sliceData;
    });

    return res;
  }

  testDatasource() {
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
