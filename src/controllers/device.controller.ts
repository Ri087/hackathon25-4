import { Context } from "hono";
import { DeviceService } from "../services/device.service";
import { DeviceSchema } from "../models/device.model";
import mqttService from "../services/mqtt.service";

const deviceService = new DeviceService();

export const createDefaultDevice = async (c: Context) => {
  try {
    const defaultDevice = {
      id: "default",
      label: "Device Par Défaut",
      type: "sensor"
    };

    const parsedDevice = DeviceSchema.parse(defaultDevice);
    const createdDevice = await deviceService.createDevice(parsedDevice);

    return c.json({
      message: "Device par défaut créé avec succès",
      device: createdDevice,
    });

  } catch (error: any) {
    return c.json({ error: error.errors }, 400);
  }
};

export const getAllDevices = async (c: Context) => {
  return c.json(await deviceService.getAllDevices());
};

export const getDeviceById = async (c: Context) => {
  const id = c.req.param("id");
  return c.json(await deviceService.getDeviceById(id));
}

export const getDeviceByObjectId = async (c: Context) => {
  const id = c.req.param("id");
  return c.json(await deviceService.getDeviceByObjectId(id));
};

export const createDevice = async (c: Context) => {
  const body = await c.req.json();
  return c.json(await deviceService.createDevice(body));
};

export const updateDeviceByObjectId = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  if (body.label) {
    const message = body.status ? "ON" : "OFF";
    mqttService.publish(`HomeConnect/${body.id}`, message);
  }

  return c.json(await deviceService.updateDeviceByObjectId(id, body));
};

export const updateDeviceByCustomId = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  return c.json(await deviceService.updateDeviceById(id, body));
};

export const deleteDevice = async (c: Context) => {
  const id = c.req.param("id");
  return c.json(await deviceService.deleteDevice(id));
};

export const getDeviceByLabel = async (c: Context) => {
  const label = c.req.param("label");
  return c.json(await deviceService.getDeviceByLabel(label));
}