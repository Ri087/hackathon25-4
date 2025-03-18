import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import deviceRouter from "./routes/device.routes";
import "./services/mqtt.service";
import { connectDB } from './config/database';

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('mqtt ok !')
})

app.route("/devices", deviceRouter);

connectDB().then(() => {
  console.log("🔌 Connexion à la base de données établie")
});


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

