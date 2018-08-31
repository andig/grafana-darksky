## DarkSky Datasource - weather and forecast data for Grafana

This plugin allows to history weather conditions and forecast data as returned by the [DarkSky](https://darksky.net) API.

![dashboard](https://raw.githubusercontent.com/andig/grafana-darksky/gh-pages/dashboard.png)

### Requirements

1. API key

   Register for a DarkSky API key at [DarkSky](https://darksky.net). The free plan will allow 1000 API calls per day.

2. Geo location

   Weather data will be available for the location defined when creating the data source. If unsure you can alwayds use [Google Maps](https://maps.google.com) or IP location APIs like [ipgeolocation.io](https://ipgeolocation.io).

### Configuration

Example configuration:

![config](https://raw.githubusercontent.com/andig/grafana-darksky/gh-pages/config.png)
