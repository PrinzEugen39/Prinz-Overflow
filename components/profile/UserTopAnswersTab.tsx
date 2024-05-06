import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswersCard from "../cards/AnswersCard";

interface IUserTopAnswersTab extends SearchParamsProps {
  // searchParams: string;
  userId: string;
  clerkId?: string | null;
}

const UserTopAnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: IUserTopAnswersTab) => {
  const result = await getUserAnswers({
    id: userId,
    page: 1,
  });

  // console.log("TOP ANSWERS:", result);
  return (
    <div className="flex flex-col gap-3">
      {result?.answers.map((item) => (
        <AnswersCard
          key={item._id}
          _id={item._id}
          question={item.question}
          content={item.content}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
          clerkId={clerkId}
        />
      ))}
    </div>
  );
};

export default UserTopAnswersTab;
