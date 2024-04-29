import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetAllParams {
  id?: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetQuestionParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path?: string;
}

/// // USER ACTIONS /////

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path?: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

// TAG ACTIONS //
export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

// ANSWER ACTIONS //
export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}