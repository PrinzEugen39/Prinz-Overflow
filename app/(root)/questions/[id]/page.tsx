import { getQuestionById } from "@/lib/actions/question.action";
import { ParamsProps } from "@/types";
import React from "react";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTags from "@/components/shared/RenderTags";
import AnswerForm from "@/components/forms/AnswerForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

interface IAuthor {
  _id: ObjectId;
  clerkId: string;
  name: string;
  picture: string;
}

interface ITag {
  _id: ObjectId;
  name: string;
}

interface IQuestion {
  _id: ObjectId;
  title: string;
  content: string;
  tags: ITag[];
  views: number;
  upvotes: any[];
  downvotes: any[];
  author: IAuthor;
  answers: any[];
  createdAt: Date;
  __v: number;
}

const QuestionDetails = async ({ params }: ParamsProps) => {
  const question: IQuestion = await getQuestionById(params.id);
  const { userId: clerkId } = auth();

  let currentUser;

  if (clerkId) {
    currentUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={question.author.picture}
              className="rounded-full size-8 object-cover"
              width={100}
              height={100}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(currentUser._id)}
              upvotes={question.upvotes.length}
              downvotes={question.downvotes.length}
              hasUpVoted={question.upvotes.includes(currentUser._id)}
              hasDownVoted={question.downvotes.includes(currentUser._id)}
              hasSaved={currentUser?.saved.includes(question._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          value={` asked ${getTimestamp(question.createdAt)}`}
          alt="clock icon"
          title=""
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(question.answers.length)}
          alt="message"
          title="Answers"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(question.views)}
          alt="upvotes"
          title="Views"
          textStyles="text-dark400_light800 small-medium"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="flex gap-5 mt-5">
        {question.tags.map((tag) => (
          <RenderTags
            key={tag._id.toString()}
            id={tag._id}
            tagName={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={JSON.stringify(question._id)}
        authorId={currentUser._id}
        totalAnswers={question.answers.length}
      />

      <AnswerForm
        authorId={JSON.stringify(currentUser._id)}
        question={question.content}
        questionId={JSON.stringify(question._id)}
      />
    </>
  );
};

export default QuestionDetails;
