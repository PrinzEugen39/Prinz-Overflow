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

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile${question.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={32}
              height={32}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>

          <div className="flex justify-end">VOTING</div>
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

      <div>
        {question.tags.map((tag) => (
          <RenderTags
            key={tag._id.toString()}
            id={tag._id}
            tagName={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AnswerForm />
    </>
  );
};

export default QuestionDetails;
