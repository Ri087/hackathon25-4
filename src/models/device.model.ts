import { z } from "zod";

export const DeviceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  type: z.string().min(1, "Le type est requis"),
  status: z.enum(["on", "off"]).default("off"),
  createdAt: z.date().default(() => new Date()),
});

export type Device = z.infer<typeof DeviceSchema>;
