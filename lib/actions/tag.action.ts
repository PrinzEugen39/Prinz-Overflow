"use server";

import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getAllTags({
  page = 1,
  pageSize = 16,
  filter,
  searchQuery,
}: GetAllParams) {
  try {
    connectToDatabase();

    const skip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = searchQuery
      ? { name: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const tags = await Tag.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalData = await Tag.countDocuments(query);
    // console.log(totalData);

    // misal totalData ada 8, apakah 8 > (ada di page = 2 * jumlah skip = 4) + jumlah data  = 4
    const isNext = totalData > skip + tags.length;
    // console.log(isNext);

    const totalPages = Math.ceil(totalData / pageSize);

    return { tags, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetTopInteractedTags({
  userId,
  limit = 3,
}: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags...
    // Interaction...

    return [
      { id: 1, tagName: "tag1" },
      { id: 2, tagName: "tag2" },
      { id: 3, tagName: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetAllParams) {
  try {
    connectToDatabase();

    const { id, searchQuery, page = 1, pageSize = 4 } = params;

    const skip = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: id };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name username picture" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    const totalQuestions = await Tag.findOne(tagFilter).populate({
      path: "questions",
      match: searchQuery,
    });

    const totalData = totalQuestions.questions.length;

    // console.log(totalData);

    const isNext = totalData > skip + tag.questions.length;
    // console.log(isNext);

    const totalPages = Math.ceil(totalData / pageSize);
    // console.log(totalPages);

    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    connectToDatabase();
    const tags = await Tag.aggregate([
      { $project: { name: 1, totalQuestion: { $size: "$questions" } } },
      { $sort: { totalQuestion: -1 } },
      { $limit: 5 },
    ]);

    return tags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
