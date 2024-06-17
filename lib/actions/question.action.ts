"use server";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteParams,
  EditQuestionParams,
  GetQuestionParams,
  QuestionVoteParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 2 } = params;

    // Calculate the number of questions to skip based on the page number and the page size
    const skip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "recommended":
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalData = await Question.countDocuments(query);
    // console.log(totalData);

    // misal totalData ada 8, apakah 8 > (ada di page = 2 * jumlah skip = 4) + jumlah data  = 4
    const isNext = totalData > skip + questions.length;
    // console.log(isNext);

    const totalPages = Math.ceil(totalData / pageSize);
    // console.log(totalPages);

    return { questions, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching questions");
  }
}

export async function getQuestionById(params: string) {
  try {
    connectToDatabase();

    const question = await Question.findById(params)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching questions");
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to DB
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create a question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get the existing ones
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // Update the question with the tags
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment the user's reputation by +5 for asking a question

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while creating questions");
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { id, path, content, title } = params;

    const question = await Question.findById(id).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while deleting questions");
  }
}

export async function deleteQuestion(params: DeleteParams) {
  try {
    connectToDatabase();

    const { id, path } = params;

    await Question.deleteOne({ _id: id });
    await Answer.deleteMany({ question: id });
    await Interaction.deleteMany({ question: id });
    await Tag.updateMany({ questions: id }, { $pull: { questions: id } });

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while deleting questions");
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasAlreadyDownvoted, hasAlreadyUpvoted, path } =
      params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
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

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    // console.log(params);

    const { questionId, userId, hasAlreadyDownvoted, hasAlreadyUpvoted, path } =
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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
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

export async function getHotQuestions() {
  try {
    connectToDatabase();
    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return hotQuestions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
