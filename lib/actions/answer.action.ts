"use server";

import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteParams,
  GetAllParams,
} from "./shared.types";

export async function getAnswers(params: GetAllParams) {
  try {
    connectToDatabase();

    const { id, filter } = params;

    let sortOptions = {};

    switch (filter) {
      case "highestupvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestupvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    if (id) {
      const answers = await Answer.find({ question: JSON.parse(id) })
        .populate("author", "_id clerkId name picture")
        .sort(sortOptions);

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

export async function deleteAnswer(params: DeleteParams) {
  try {
    connectToDatabase();

    const { id, path } = params;

    const answer = await Answer.findById(id);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await answer.deleteOne({ _id: id });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: id } }
    );
    await Interaction.deleteMany({ answer: id });

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while deleting questions");
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
