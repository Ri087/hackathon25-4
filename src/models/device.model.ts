import { z } from "zod";

export const DeviceSchema = z.object({
  id: z.string().min(1, "L'id est requis"),
  label: z.string().min(1, "Le label est requis"),
  type: z.string().min(1, "Le type est requis"),
  status: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export type Device = z.infer<typeof DeviceSchema>;
