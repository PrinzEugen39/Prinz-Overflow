"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface IVotes {
  itemId: string;
  userId: string;
  type: "question" | "answer";
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

type VoteType = "upvote" | "downvote";

const Votes = ({
  itemId,
  userId,
  type,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: IVotes) => {
  const path = usePathname();
  const router = useRouter();

  async function handleVote(voteType: VoteType) {
    if (!userId) {
      alert("Please login to vote");
      return router.push("/signin");
    }
    if (voteType === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyDownvoted: hasDownVoted,
          hasAlreadyUpvoted: hasUpVoted,
          path,
        });
        // console.log("upvote question");
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyDownvoted: hasDownVoted,
          hasAlreadyUpvoted: hasUpVoted,
          path,
        });
        // console.log("upvote answer");
      }
      return;
    }
    if (voteType === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyDownvoted: hasDownVoted,
          hasAlreadyUpvoted: hasUpVoted,
          path,
        });
        // console.log("downvote question");
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyDownvoted: hasDownVoted,
          hasAlreadyUpvoted: hasUpVoted,
          path,
        });
        // console.log("downvote answer");
      }
    }
  }

  async function handleSave() {
    if (type === "question") {
      await toggleSaveQuestion({
        path,
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasSaved: hasSaved!,
      });
    }
  }

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;
