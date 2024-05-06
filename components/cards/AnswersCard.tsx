import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "../shared/ParseHTML";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
  content: string;
}

const AnswersCard = ({
  clerkId,
  _id,
  question,
  author,
  content,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] px-11 py-9">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${question._id}`}>
            <h3 className="base-medium text-dark200_light900 line-clamp-2 flex-1">
              <ParseHTML data={content} />
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            // <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
            <Button>EDIT & DELETE</Button>
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • answered ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default AnswersCard;
