"use server";

import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
// import { revalidatePath } from "next/cache";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // Update view count of question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("Already viewed question");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

    // revalidatePath("/")
  } catch (error) {
    console.log(error);
    throw new Error("Error viewing question");
  }
}
