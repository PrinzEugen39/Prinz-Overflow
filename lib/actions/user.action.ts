"use server";
import { FilterQuery } from "mongoose";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getAllSavedQuestion({
  id,
  page = 1,
  pageSize = 4,
  filter,
  searchQuery,
}: GetAllParams) {
  try {
    connectToDatabase();

    const skip = (page - 1) * pageSize;

    // console.log(searchQuery);

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const user = await User.findOne({ clerkId: id }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name username picture" },
      ],
    });

    if (!user) throw new Error("User not found");

    const totalSaved = await User.findOne({ clerkId: id }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
      },
    });

    const totalData = totalSaved.saved.length;

    // console.log(totalData);

    // misal totalData ada 8, apakah 8 > (ada di page = 2 * jumlah skip = 4) + jumlah data  = 4
    const isNext = totalData > skip + user.saved.length;
    // console.log(isNext);

    const totalPages = Math.ceil(totalData / pageSize);

    // console.log(user.saved);

    return { savedQuestions: user.saved, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers({ page = 1, pageSize = 9, filter, searchQuery }: GetAllParams) {
  try {
    connectToDatabase();
    // console.log(searchQuery);
    const skip = (page - 1) * pageSize;    

    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        sortOptions = { joinedAt: 1 };
        break;
    }

    const users = await User.find(query).skip(skip).limit(pageSize).sort(sortOptions);

    const totalData = await User.countDocuments(query);

    // misal totalData ada 8, apakah 8 > (ada di page = 2 * jumlah skip = 4) + jumlah data  = 4
    const isNext = totalData > skip + users.length;

    const totalPages = Math.ceil(totalData / pageSize);

    return { users, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    console.log("New user created: ", newUser);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, path, updateData } = userData;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    if (path) revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = userData;
    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    // Delete user's questions and answers, etc
    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path, hasSaved } = params;

    let updateQuery = {};

    if (hasSaved) {
      updateQuery = {
        $pull: { saved: questionId },
      };
    } else {
      updateQuery = {
        $addToSet: { saved: questionId },
      };
    }

    const user = await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (path) {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while saving question");
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    const totalQuestion = await Question.countDocuments({ author: user._id });
    const totalAnswer = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestion, totalAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetAllParams) {
  try {
    connectToDatabase();

    const { id } = params;

    const totalAnswers = await Answer.countDocuments({ author: id });

    const userQuestion = await Question.find({ author: id })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate("tags", "_id name")
      .populate("author", "_id name clerkId picture");

    return { totalAnswers, question: userQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetAllParams) {
  try {
    connectToDatabase();

    const { id } = params;

    const totalAnswers = await Answer.countDocuments({ author: id });

    const userAnswer = await Answer.find({ author: id })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id name clerkId picture");

    return { totalAnswers, answers: userAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserProfile(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    if (path) revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
