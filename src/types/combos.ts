import { z } from "zod";

export const CreateComboSchema = z.object({
  name: z.string().min(1),
  notes: z.string().optional().nullable(),
  gameId: z.string().uuid(),
  steps: z.array(z.string().min(1)).min(1),
});

export const UpdateComboSchema = CreateComboSchema.extend({
  id: z.string().uuid(),
});

export type CreateComboInput = z.infer<typeof CreateComboSchema> & {
  userId: string;
};

export type UpdateComboInput = z.infer<typeof UpdateComboSchema> & {
  userId: string;
};
