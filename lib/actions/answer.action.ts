"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAllParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function getAnswers(params: GetAllParams) {
  try {
    connectToDatabase();

    const { id } = params;

    if (id) {
      const answers = await Answer.find({ question: JSON.parse(id) })
        .populate("author", "_id clerkId name picture")
        .sort({ createdAt: -1 });

      return answers;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error getting answers");
  }
}

export async function createAnswer({
  author,
  content,
  path,
  question,
}: CreateAnswerParams) {
  try {
    connectToDatabase();

    const newAnswer = await Answer.create({
      author,
      content,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Error creating answer");
  }
}
