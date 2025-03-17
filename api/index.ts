import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import deviceRouter from "./routes/device.routes";

// const app = new Hono().basePath('/api')
const app = new Hono()
app.use(cors())

app.get('/', (c) => {
  return c.json({ message: "Hello World" })
})

// app.route("/devices", deviceRouter);


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
