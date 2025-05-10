import { z } from "zod";

export const CreateGameSchema = z.object({
  name: z.string().min(1),
  published: z.boolean().optional(),
});

export type CreateGameInput = z.infer<typeof CreateGameSchema>;
