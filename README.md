# TP-IOT

Here is an api based on nodejs server with express framework and typescript to retrieve and store data in InfluxDB database and transcribe them to grafana

## Prerequired

- NPM => <https://nodejs.org/en/>

- Influx DB => <https://dl.influxdata.com/influxdb/releases/influxdb2-2.5.1-windows-amd64.zip>

- Grafana => <https://grafana.com/grafana/download?platform=windows>

## Getting started

First, configure your constants under the .env file

INFLUX_URL
INFLUX_TOKEN
INFLUX_ORG
INFLUX_BUCKET

## Run DB

To start the influxDB database

Run influxd.exe in bash

## Run Grafana

Run <http://localhost:3000> in navigator

connect the influxDB to grafana Data Sources -> Add data source -> select InfluxDB

exemple of flux request for this graf

![My Remote Image](https://cdn.discordapp.com/attachments/319052164951703553/1060957008771166300/image.png)

```
from(bucket:"test")
|> range(start: -10m)
|> filter(fn: (r) => r.\_measurement == "humidity" )
```

Install dependencies

```bash
npm i
```

Run API

```bash
ts-node app.ts
```
