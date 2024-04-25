"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";

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
