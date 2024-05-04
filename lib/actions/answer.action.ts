"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAllParams,
} from "./shared.types";
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

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasAlreadyDownvoted, hasAlreadyUpvoted, path } =
      params;

    console.log(params);

    let updateQuery = {};

    if (hasAlreadyUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasAlreadyDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }
    // Increment author's reputation by +10 for receiving an upvote

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while voting question");
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    // console.log(params);

    const { answerId, userId, hasAlreadyDownvoted, hasAlreadyUpvoted, path } =
      params;

    let updateQuery = {};

    if (hasAlreadyDownvoted) {
      updateQuery = { $pull: { downvote: userId } };
    } else if (hasAlreadyUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation by +10 for receiving an upvote

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while voting question");
  }
}
