import {Context} from "hono";
import {OpenaiService} from "../services/openai.service";
import {MqttService} from "../services/mqtt.service";
import {DeviceService} from "../services/device.service";
import {Device} from "../models/device.model";

const openaiService = new OpenaiService();
const mqttService = new MqttService();
const deviceService = new DeviceService();
type OpenAiResponse = {
    action : string,
    deviceLabel : string
}

export const createOpenAiResponse = async (c: Context) => {
    try {
        const content = await c.req.json()
        const response =  await openaiService.createChat(content.content) as OpenAiResponse;
        const device = await deviceService.getDeviceByLabel(response.deviceLabel);
        // @ts-ignore
        mqttService.publish("HomeConnect/" + device.id, response.action);
        return c.json({"message": "is ok"});
    } catch (error: any) {
        console.error(error);
        return c.json({ "error": error }, 400);
    }
};