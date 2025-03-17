import { Hono } from "hono";
import {
  createDefaultDevice,
  createDevice,
  updateDevice,
  deleteDevice
} from "../controllers/device.controller";

const deviceRouter = new Hono();

deviceRouter.post("/default", createDefaultDevice);
deviceRouter.post("/create", createDevice);
deviceRouter.put("/:id", updateDevice);
deviceRouter.delete("/:id", deleteDevice);

// deviceRouter.get("/", getAllDevices);
// deviceRouter.get("/:id", getDeviceById);

export default deviceRouter;