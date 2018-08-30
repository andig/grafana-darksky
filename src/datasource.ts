import _ from "lodash";

export class DarkSkyDatasource {

  type: string;
  name: string;
  units: string;
  darkSky: string;
  url: string;

  /** @ngInject **/
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    console.log("DarkSkyDatasource");
    console.log(instanceSettings);

    this.type = instanceSettings.type;
    this.name = instanceSettings.name;

    var apiUrl = (_.filter(instanceSettings.meta.routes, { path: 'darksky' })[0] as any).url;
    var credentials = `${instanceSettings.jsonData.apikey}/${instanceSettings.jsonData.lat},${instanceSettings.jsonData.lon}?units=${instanceSettings.jsonData.unit}&lang=${instanceSettings.jsonData.language}`;
    this.darkSky = `${apiUrl}/${credentials}`;
    this.url = `/api/datasources/proxy/${instanceSettings.id}/darksky/${credentials}`;
    this.units = instanceSettings.units;
  }

  metricFindQuery(query) {
    // console.log("metricFindQuery");
    // console.log(query);
    const timeframes = ['currently', 'minutely', 'hourly', 'daily'];

    // metrics for table
    if (query == 'table') {
      return _.map(timeframes, timeframe => {
        return { text: timeframe, value: timeframe };
      });
    }

    // metrics for timeseries
    return this.doRequest({
      url: this.url,
      data: query,
      method: 'GET'
    }).then(res => {
      let metrics: string[] = [];

      // get all properties from forecast query
      _.each(timeframes, key => {
        var props = res.data[key];
        if (props && _.isArray(props.data)) {
          props = props.data.length ? props.data[0] : {};
        }
        var keys = _.filter(_.keys(props), key => {
          return key != "time"
        });
        metrics.push(...keys);
      });

      // create metrics as properties x timeframes
      let metricsByTime: {text:string, value:string}[] = [];
     _.each(_.uniq(_.sortBy(metrics)), el => {
        var s = _.map(timeframes, timeframe => {
          return { text: `${el} (${timeframe})`, value: `${timeframe}.${el}` };
        });
        // console.log(s);
        metricsByTime.push(...s);
        return s;
      });

      return metricsByTime;
    });
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

    console.log(this.darkSky);

    return this.doRequest({
      url: this.url,
      data: query,
      method: 'GET'
    }).then(res => {
      // table query?
      if (_.filter(query.targets, { type: 'table' }).length) {
        return this.tableResponse(query.targets, res);
      }
      else {
        return this.timeseriesResponse(query.targets, res);
      }
    });
  }

  tableResponse(targets, data) {
    // console.log("tableResponse");

    // use first metric for table query
    let timeframe = targets[0].target;
    var slice = data.data[timeframe];

    // normalize 'currently' into data: array
    if (timeframe == 'currently') {
      slice = {
        data: [_.clone(slice)]
      }
    }

    let columns: { text: string, type: string }[] = [];
    let rows: any[] = [];

    if (slice.data.length) {
      // extract columns
      columns = _.map(slice.data[0], (v,k) => {
        return {
          text: k,
          type: (k.match(/[Tt]ime/)) ? 'time' : (typeof (v) === 'string' ? 'string' : 'number')
        };
      });

      // extract rows
      rows = _.map(slice.data, row => {
        return _.map(columns, col => {
          if (row[col.text] === undefined) return null;

          // time to millisec
          return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
        })
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
  }

  timeseriesResponse(targets, data) {
    // console.log("timeseriesResponse");
    var res = {
      data: _.map(targets, target => {
        let [timeframe, metric] = target.target.split('.');
        var slice = data.data[timeframe]; // currently...

        return {
          target: target.target,
          datapoints: _.map(slice.data, d => {
            return [d[metric], d.time*1000];
          }),
        };
      })
    }

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
      return { status: "error", message: `Data source returned status ${response.status}`, title: "Error" };
    });
  }

  annotationQuery(options) {
    return [];
  }

  doRequest(options) {
    return this.backendSrv.datasourceRequest(options);
  }

  buildQueryParameters(options) {
    // remove placeholder targets
    options.targets = _.filter(options.targets, target => {
      return target.target !== 'select metric';
    });

    var targets = _.map(options.targets, target => {
      return {
        target: this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
        refId: target.refId,
        hide: target.hide,
        type: target.type
      };
    });

    options.targets = targets;

    return options;
  }
}
