import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(2).max(64),
  body: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
