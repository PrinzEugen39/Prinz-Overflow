import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(2).max(64),
  body: z.string().min(128),
  tags: z.array(z.string().min(1).max(15)).max(3),
});
