import { Context } from "hono";
import { DeviceService } from "../services/device.service";
import { DeviceSchema } from "../models/device.model";

const deviceService = new DeviceService();

export const createDefaultDevice = async (c: Context) => {
  try {
    const defaultDevice = {
      name: "Device Par Défaut",
      type: "sensor",
      status: "on",
      createdAt: new Date(),
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
};

export const createDevice = async (c: Context) => {
  const body = await c.req.json();
  return c.json(await deviceService.createDevice(body));
};

export const updateDevice = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  return c.json(await deviceService.updateDevice(id, body));
};

export const deleteDevice = async (c: Context) => {
  const id = c.req.param("id");
  return c.json(await deviceService.deleteDevice(id));
};