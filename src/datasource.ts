import _ from 'lodash';

type ApiCallDefinition = {
  dataset: string,
  timestamps: number[],
};

type Metric = {
  text: string,
  value: string,
};

export class DarkSkyDatasource {

  datasourceName: string;
  apiUrl: string;
  apiOptions: string;
  metrics: Metric[];
  lat: number;
  lon: number;
  /** @ngInject **/
  constructor(instanceSettings, private backendSrv, private templateSrv, private $q) {
    this.datasourceName = instanceSettings.name;

    const config = instanceSettings.jsonData;
    this.lat = config.lat;
    this.lon = config.lon;
    const credentials = `${config.apikey}`;
    this.apiUrl = `/api/datasources/proxy/${instanceSettings.id}/darksky/${credentials}`;
    this.apiOptions = `units=${config.unit}&lang=${config.language}`;
  }

  metricFindQuery(query) {
    // cache metrics query
    if (this.metrics) {
      return this.metrics;
    }
    return this.doRequest({
      query,
      url: `${this.apiUrl}/${this.lat}, ${this.lon}`,
      method: 'GET',
    }).then((res: any) => {
      // get all properties from forecast query
      const datasets = ['currently', /*'minutely',*/ 'hourly', 'daily'];
      const metrics = _.transform(datasets, (metrics, dataset) => {
        let props = res.data[dataset];
        if (props && _.isArray(props.data)) {
          props = props.data.length ? props.data[0] : {};
        }
        metrics.push(..._.filter(_.keys(props), key => key !== 'time'));
      }, [] as string[]);

      this.metrics = _.map(_.uniq(_.sortBy(metrics)), metric => ({
        text: metric,
        value: metric,
      }));

      return this.metrics;
    });
  }

  query(options) {
    let query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      return this.$q.when({ data: [] });
    }

    if (this.templateSrv.getAdhocFilters) {
      query.adhocFilters = this.templateSrv.getAdhocFilters(this.datasourceName);
    } else {
      query.adhocFilters = [];
    }

    const apiCalls = this.getApiCalls(query.range, query.maxDataPoints);

    let longi = this.lon;
    let lati = this.lat;
    if (options) {
      if (options.targets) {
        longi = options.targets[0].lon;
        lati = options.targets[0].lat;
      }
    }
    const url = `${this.apiUrl}/${lati},${longi}`;
    const requests = _.map(apiCalls.timestamps, ts => this.doRequest({
      query,
      url: `${url},${ts}?${this.apiOptions}`,
      method: 'GET',
    }));

    if (apiCalls.timestamps.length >= 10) {
      console.warn(`DarkSky will execute ${apiCalls.timestamps.length} api.`);
    }

    return Promise.all(requests).then((response: any) => {
      // extraxt data from json result structure
      let data = _.transform(response, (data, res) => {
        // select currently datapoint
        const dataset = _.get(res, `data.${apiCalls.dataset}`);
        if (apiCalls.dataset === 'currently') {
          data.push(dataset);
          return;
        }

        // select timestamps inside query range
        data.push(..._.filter(dataset.data, (res: any) => {
          const timeMS = res.time * 1000;
          return timeMS >= query.range.from && timeMS <= query.range.to;
        }));
      }, [] as any[]);

      // sort by timestamp
      data = _.sortBy(data, 'time');

      // table query?
      return (_.filter(query.targets, { type: 'table' }).length)
        ? this.tableResponse(query.targets, data)
        : this.timeseriesResponse(query.targets, data);
    });
  }

  getApiCalls(range, maxDataPoints): ApiCallDefinition {
    let dataset = 'hourly', step = 1;
    const hours = range.to.diff(range.from, 'hours');

    const date = range.from.clone().startOf('day');
    const timestamps: any[] = [date.unix()];

    // not same day?
    if (range.to.date() !== range.from.date()) {
      if (hours > 7 * 24) { // daily queries - daily
        dataset = 'daily';
        if (maxDataPoints) { // limit number of queries
          const days = range.to.diff(range.from, 'days');
          step = Math.max(step, Math.floor(days / maxDataPoints));
        }
      }

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
    };
  }

  tableResponse(targets, data) {
    // use first metric for table query

    const columns = _.map(_.head(data) as any, (val, key) => ({
      text: key,
      type: (key.match(/[Tt]ime/)) ? 'time' : (typeof (val) === 'string' ? 'string' : 'number'),
    }));

    const rows = _.map(data, (row: any) => {
      return _.map(columns as any[], (col: any) => {
        if (row[col.text] === undefined) return null;

        // time to millisec
        return col.type === 'time' ? row[col.text] * 1000 : row[col.text];
      });
    });

    return {
      data: [{
        type: 'table',
        columns: columns,
        rows: rows,
      }],
    };
  }

  timeseriesResponse(targets, data) {
    const res = {
      data: _.map(targets, target => ({
        target: target.target,
        datapoints: _.map(data, d => [d[target.target], d.time * 1000]),
      })),
    };

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
      type: target.type,
      lon: target.lon,
      lat: target.lat,
    }));
    return options;
  }

  testDatasource() {
    return this.doRequest({}).then(response => (response.status === 200)
      ? { status: 'success', message: 'Data source is working', title: 'Success' }
      : { status: 'error', message: `Data source returned status ${response.status}`, title: 'Error' },
    );
  }

  doRequest(options) {
    // call with pre-defined default options
    const url = `${this.apiUrl}/${this.lat}, ${this.lon}`;
    if (options) {
      if (!options.url) {
        console.log('set default url, since no url is given');
        options.url = url;
      }
    }
    return this.backendSrv.datasourceRequest(options).then((response: any) => {
      let resHeaders = _.get(response, 'headers');
      if (!resHeaders) {
        console.warn('No headers found!');
      } else {
        let calls = 0;
        if (typeof resHeaders === 'function') {
          resHeaders = resHeaders();
          calls = _.get(resHeaders, 'x-forecast-api-calls');
        } else {
          calls = resHeaders.get('x-forecast-api-calls');
        }
        if (calls > 600) {
          console.warn(`DarkSky noticed you've already executed ${calls} api calls. Free limit is 1000.`);
        }
      }
      return response;
    });
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }
}
