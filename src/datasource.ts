import _ from "lodash";

export class DarkSkyDatasource {

  type: string;
  name: string;
  // darkSky: string;
  apiOptions: string;
  url: string;

  /** @ngInject **/
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    console.log("DarkSkyDatasource");
    console.log(instanceSettings);

    this.type = instanceSettings.type;
    this.name = instanceSettings.name;

    var credentials = `${instanceSettings.jsonData.apikey}/${instanceSettings.jsonData.lat},${instanceSettings.jsonData.lon}`;
    // var apiUrl = (_.filter(instanceSettings.meta.routes, { path: 'darksky' })[0] as any).url;
    // this.darkSky = `${apiUrl}/${credentials}`;
    this.apiOptions = `units=${instanceSettings.jsonData.unit}&lang=${instanceSettings.jsonData.language}`;
    this.url = `/api/datasources/proxy/${instanceSettings.id}/darksky/${credentials}`;
  }

  metricFindQuery(query) {
    const timeframes = ['currently', 'minutely', 'hourly', 'daily'];

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

      return _.map(_.uniq(_.sortBy(metrics)), metric => {
        return {
          text: metric,
          value: metric
        };
      });
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

    console.log("query");
    console.log(query);

    let apiCalls = this.getApiCalls(query.range);
    // console.log("apiCalls");
    // console.log(apiCalls);

    let requests = _.map(apiCalls.timestamps, ts => {
      return this.doRequest({
        url: `${this.url},${ts}?${this.apiOptions}`,
        data: query,
        method: 'GET'
      });
    });

    return Promise.all(requests).then(response => {
      let data: any[] = [];
      _.each(response, res => {
        if (apiCalls.dataset == 'currently') {
          data.push(res.data.currently);
        }
        else {
          // select timestamps inside query range
          let filtered = _.filter(res.data[apiCalls.dataset].data, res => {
            let timeMS = res.time * 1000;
            return timeMS >= query.range.from && timeMS <= query.range.to;
          });
          // sort by timestamp
          data.push(...filtered);
        }
      });
      
      data = _.sortBy(data, 'time')

      // table query?
      return (_.filter(query.targets, { type: 'table' }).length) 
        ? this.tableResponse(query.targets, data)
        : this.timeseriesResponse(query.targets, data);
    });
  }

  getApiCalls(range) {
    let dataset = 'hourly';
    let hours = range.to.diff(range.from, 'hours');
    let date = range.from.clone().startOf('day');
    let timestamps: any[] = [date.unix()];

    // not same day?
    if (range.to.date() !== range.from.date()) {
      if (hours > 7 * 24) { // daily queries - daily
        dataset = 'daily';
      };

      // create one timestamp per additional day
      do {
        date.add(1, 'day');
        timestamps.push(date.unix());
      } while (date.isBefore(range.to));
    }

    return {
      dataset: dataset,
      timestamps: timestamps,
    }
  }

  tableResponse(targets, data) {
    // use first metric for table query
    let timeframe = targets[0].target;

    let columns: { text: string, type: string }[] = [];
    let rows: any[] = [];

    if (data.length) {
      // extract columns
      columns = _.map(data[0], (v,k) => {
        return {
          text: k,
          type: (k.match(/[Tt]ime/)) ? 'time' : (typeof (v) === 'string' ? 'string' : 'number')
        };
      });

      // extract rows
      rows = _.map(data, row => {
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
    var res = {
      data: _.map(targets, target => {
        let [timeframe, metric] = target.target.split('.');

        return {
          target: target.target,
          datapoints: _.map(data, d => {
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
