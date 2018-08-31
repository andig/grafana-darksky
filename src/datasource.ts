import _ from "lodash";

type ApiCallDefinition = {
  dataset: string,
  timestamps: Array<number>
}

type Metric = {
  text: string,
  value: string
}

export class DarkSkyDatasource {

  datasourceName: string;
  apiUrl: string;
  apiOptions: string;
  metrics: Metric[];

  /** @ngInject **/
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.datasourceName = instanceSettings.name;

    let config = instanceSettings.jsonData;
    let credentials = `${config.apikey}/${config.lat},${config.lon}`;
    this.apiUrl = `/api/datasources/proxy/${instanceSettings.id}/darksky/${credentials}`;
    this.apiOptions = `units=${config.unit}&lang=${config.language}`;
  }

  metricFindQuery(query) {
    // cache metrics query
    if (this.metrics) {
      return this.metrics;
    }

    return this.doRequest({
      data: query
    }).then(res => {
      // get all properties from forecast query
      const datasets = ['currently', /*'minutely',*/ 'hourly', 'daily'];
      let metrics = _.transform(datasets, (metrics, dataset) => {
        let props = res.data[dataset];
        if (props && _.isArray(props.data)) {
          props = props.data.length ? props.data[0] : {};
        }
        metrics.push(... _.filter(_.keys(props), key => key != 'time'));
      }, [] as string[]);

      this.metrics = _.map(_.uniq(_.sortBy(metrics)), metric => ({
        text: metric, 
        value: metric,
      }));

      return this.metrics;
    });
  }

  query(options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      return this.$q.when({ data: [] });
    }

    if (this.templateSrv.getAdhocFilters) {
      query.adhocFilters = this.templateSrv.getAdhocFilters(this.datasourceName);
    } else {
      query.adhocFilters = [];
    }

    let apiCalls = this.getApiCalls(query.range, query.maxDataPoints);
    let requests = _.map(apiCalls.timestamps, ts => this.doRequest({
      url: `${this.apiUrl},${ts}?${this.apiOptions}`,
      data: query
    }));

    if (apiCalls.timestamps.length >= 10) {
      console.warn(`DarkSky will execute ${apiCalls.timestamps.length} api.`);
    }

    return Promise.all(requests).then(response => {
      // extraxt data from json result structure
      let data = _.transform(response, (data, res) => {
        // select currently datapoint
        let dataset = _.get(res, `data.${apiCalls.dataset}`);
        if (apiCalls.dataset == 'currently') {
          data.push(dataset);
          return;
        }

        // select timestamps inside query range
        data.push(... _.filter(dataset.data, res => {
          let timeMS = res.time * 1000;
          return timeMS >= query.range.from && timeMS <= query.range.to;
        }));
      }, [] as any[]);

      // sort by timestamp
      data = _.sortBy(data, 'time')

      // table query?
      return (_.filter(query.targets, { type: 'table' }).length)
        ? this.tableResponse(query.targets, data)
        : this.timeseriesResponse(query.targets, data);
    });
  }

  getApiCalls(range, maxDataPoints): ApiCallDefinition {
    let dataset = 'hourly', step = 1;
    let hours = range.to.diff(range.from, 'hours');

    let date = range.from.clone().startOf('day');
    let timestamps: any[] = [date.unix()];

    // not same day?
    if (range.to.date() !== range.from.date()) {
      if (hours > 7 * 24) { // daily queries - daily
        dataset = 'daily';
        if (maxDataPoints) { // limit number of queries
          let days = range.to.diff(range.from, 'days');
          step = Math.max(step, Math.floor(days / maxDataPoints));
        }
      };

      // create one timestamp per additional day
      date.add(step, 'day');
      while (date.isBefore(range.to)) {
        timestamps.push(date.unix());
        date.add(step, 'day');
      }
    }

    return {
      dataset: dataset,
      timestamps: timestamps,
    }
  }

  tableResponse(targets, data) {
    // use first metric for table query
    let timeframe = targets[0].target;

    let columns = _.map(_.head(data) as any, (val, key) => ({
      text: key,
      type: (key.match(/[Tt]ime/)) ? 'time' : (typeof (val) === 'string' ? 'string' : 'number')
    }));

    let rows = _.map(data, row => {
      return _.map(columns as any[], col => {
        if (row[col.text] === undefined) return null;

        // time to millisec
        return col.type == 'time' ? row[col.text] * 1000 : row[col.text];
      })
    });

    return {
      data: [{
        type: "table",
        columns: columns,
        rows: rows,
      }]
    };
  }

  timeseriesResponse(targets, data) {
    let res = {
      data: _.map(targets, target => ({
        target: target.target,
        datapoints: _.map(data, d => [d[target.target], d.time * 1000]),
      }))
    }

    return res;
  }

  buildQueryParameters(options) {
    // remove placeholder targets
    options.targets = _.filter(options.targets, target => target.target !== 'select metric');
    // apply variables
    options.targets = _.map(options.targets, target => ({
      target: this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
      refId: target.refId,
      hide: target.hide,
      type: target.type
    }));

    return options;
  }

  testDatasource() {
    return this.doRequest({}).then(response => (response.status == 200) 
      ? { status: 'success', message: 'Data source is working', title: 'Success' }
      : { status: 'error', message: `Data source returned status ${response.status}`, title: 'Error' }
    );
  }

  doRequest(options) {
    // call with pre-defined default options
    return this.backendSrv.datasourceRequest(_.assign({
      url: this.apiUrl,
      method: 'GET',
    }, options)).then(response => {
      let calls = _.get(response.headers(), 'x-forecast-api-calls');
      if (calls > 400) {
        console.warn(`DarkSky noticed you've already executed ${calls} api calls. Free limit is 1000.`);
      }
      return response;
    });
  }

  annotationQuery(options) {
    return [];
  }
}