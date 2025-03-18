import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const ResearchActionExtraction = z.object({
    action: z.string(),
    deviceLabel: z.string(),
});

export class OpenaiService {

    public client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    async  createChat(content:string) {
        const completion = await this.client.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an agent who receives a text in which he understands whether to turn the light on or off in French. Two possible answers 'ON' or 'OFF' and the name of the element concerned (e.g. living room, bedroom, etc.)." },
                { role: "user", content: content },
            ],
            response_format: zodResponseFormat(ResearchActionExtraction, "research_action_extraction"),
        });
        return completion.choices[0].message.parsed;

    }
}