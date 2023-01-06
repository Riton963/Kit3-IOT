'use strict'
const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const express = require('express')
const app = express()
const port = 3003
require('dotenv').config();

/** Environment variables **/
const url: string = process.env.INFLUX_URL!;
const token: string = process.env.INFLUX_TOKEN!;
const org: string = process.env.INFLUX_ORG!;
const bucket: string = process.env.INFLUX_BUCKET!;

const influxDB = new InfluxDB({ url, token })
const writeApi = influxDB.getWriteApi(org, bucket)


app.post('/api/temperature', (req: any, res: any) => {
  let data: any = '';
  req.on('data', (chunk: any) => {
    data += chunk;
  });
  req.on('end', () => {
    const frame = JSON.parse(data);
    const code = parseInt("0x" + frame.data.substr(0,2));
    const value = (parseInt("0x0" + frame.data.substr(2, 4))) / 10;
    
    if (frame.data.length > 6) {
      let alert = parseInt("0x" + frame.data.substr(6, 4))
    };

    // Write data in influxDB
    const influxDB = new InfluxDB({ url, token })
    const writeApi = influxDB.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ region: 'west' })
    const point1 = new Point('temperature')
    .tag('sensor_id', 'TLM01')
    .floatField('value', value)
    
    writeApi.writePoint(point1)
    writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })
      });
    })

app.post('/api/humidity', (req: any, res: any,) => {
    let data: any = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      const frame = JSON.parse(data);
      const code = parseInt("0x" + frame.data.substr(0,2));
      const value = (parseInt("0x0" + frame.data.substr(2, 4))) / 10;
      if (frame.data.length > 6) {
        let alert = parseInt("0x" + frame.data.substr(6, 4))
      };
  
      // Write data in influxDB
      const influxDB = new InfluxDB({ url, token })
      const writeApi = influxDB.getWriteApi(org, bucket)
      writeApi.useDefaultTags({ region: 'west' })
      const point1 = new Point('humidity')
      .tag('sensor_id', 'TLM01')
      .floatField('value', value)
      
      writeApi.writePoint(point1)
      writeApi.close().then(() => {
        console.log('WRITE FINISHED')
      })
    });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})