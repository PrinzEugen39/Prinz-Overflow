"use server";

import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getAllTags({
  page = 1,
  pageSize = 20,
  filter,
  searchQuery,
}: GetAllParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({})
      .sort({ createdAt: -1 })
      .populate("questions");

    return tags;
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

    const { id, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: id };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        // skip: pageSize * (page - 1),
        // limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name username picture" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    // console.log(user.saved);
    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
