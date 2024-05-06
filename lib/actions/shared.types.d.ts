import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetAllParams {
  id?: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface DeleteParams {
  id: string;
  path?: string;
}

/// QUESTION ////
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

export interface EditQuestionParams {
  id: string;
  title: string;
  content: string;
  path: string;
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

export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
  hasSaved: boolean;
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

/// // VOTE ACTIONS /////

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasAlreadyUpvoted: boolean;
  hasAlreadyDownvoted: boolean;
  path: string;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasAlreadyUpvoted: boolean;
  hasAlreadyDownvoted: boolean;
  path: string;
}

/// // INTERACTION ACTIONS /////
export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}
