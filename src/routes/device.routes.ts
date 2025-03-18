import { Hono } from "hono";
import {
  createDefaultDevice,
  createDevice,
  updateDeviceByObjectId,
  deleteDevice,
  getAllDevices,
  getDeviceById,
  getDeviceByObjectId
} from "../controllers/device.controller";

const deviceRouter = new Hono();

deviceRouter.post("/default", createDefaultDevice);
deviceRouter.post("/create", createDevice);
deviceRouter.put("/:id", updateDeviceByObjectId);
deviceRouter.delete("/:id", deleteDevice);
deviceRouter.get("/", getAllDevices);
deviceRouter.get("/:id", getDeviceByObjectId);

export default deviceRouter;