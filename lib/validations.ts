import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(2).max(64),
  body: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export const profileSchema = z.object({
  name: z.string().min(5).max(25),
  username: z.string().min(5).max(25),
  portofolioWebsite: z.string().url().optional(),
  location: z.string().min(5).max(50).optional(),
  bio: z.string().min(5).max(150).optional(),
});
