# DarkSky Datasource - weather and forecast data for Grafana

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7QSA9U4DN9JAQ)

This plugin allows to graph historic weather conditions and forecast data as returned by the [DarkSky](https://darksky.net) API.

![dashboard](https://raw.githubusercontent.com/andig/grafana-darksky/gh-pages/dashboard.png)

## Requirements

1. API key

   Register for a DarkSky API key at [DarkSky](https://darksky.net). The free plan will allow 1000 API calls per day.

2. Geo location

   Weather data will be available for the location defined when creating the data source. If unsure you can always use [Google Maps](https://maps.google.com) or IP location APIs like [ipgeolocation.io](https://ipgeolocation.io).

## Configuration

Example configuration:

![config](https://raw.githubusercontent.com/andig/grafana-darksky/gh-pages/config.png)

## Frequently asked questions

1. I've selected a metric- why does it not appear at certain zoom levels?

   The DarkSky API offers different data nodes, e.g. hourly and daily data. Not all metrics are available on all levels. During selection, this datasource offers all metrics available on any level of DarkSky data. If in doubt which metric to choose please take a look at the raw DarkSky API response.

## Development

Using Docker:

1. Clone the repo and cd into the folder grafana-darksky
1. make sure you have [yarn](https://yarnpkg.com/) installed
1. install the project dependencies: `yarn install`
1. Start the watch task with yarn: `yarn watch`
1. run the docker from the docker compose file with: `docker-compose -f "docker-compose.yml" up -d --build`
1. Open grafana at http://localhost:3000
1. Login with "admin" and password "admin"
1. Now you can get started