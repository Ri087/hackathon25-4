import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import deviceRouter from "./routes/device.routes";
import "./services/mqtt.service";
import { connectDB } from './config/database';
import openaiRouter from "./routes/openai.routes";

const app = new Hono()

app.use(cors())

connectDB().then(() => {
  console.log("🔌 Connexion à la base de données établie")
});

app.get("/", (c) => {
  return c.text(`Votre clé OpenAI: ${process.env.OPENAI_API_KEY}`);
});

app.route("/devices", deviceRouter);
app.route("/openai", openaiRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

