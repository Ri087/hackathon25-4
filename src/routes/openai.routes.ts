import {Hono} from "hono";

import {
  createOpenAiResponse,
} from "../controllers/openai.controller";

const openaiRouter = new Hono();

openaiRouter.post("/" , createOpenAiResponse);

export default openaiRouter;