import { z } from "zod";

export const CreateGameSchema = z.object({
  name: z.string().min(1),
  published: z.boolean().optional(),
});

export const UpdateGameSchema = CreateGameSchema.extend({
  id: z.string().uuid(),
});

export type CreateGameInput = z.infer<typeof CreateGameSchema>;

export type UpdateGameInput = z.infer<typeof UpdateGameSchema>;
