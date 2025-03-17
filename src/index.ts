import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import deviceRouter from "./routes/device.routes";
import MqttService from "./services/mqtt.service"

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  MqttService.publish("HomeConnect/ESP32Light", "ON")
  return c.text('mqtt ok !')
})

app.route("/devices", deviceRouter);


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

