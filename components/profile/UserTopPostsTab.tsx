import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionsCard from "../cards/QuestionsCard";

interface IUserTopPostsTab extends SearchParamsProps {
  // searchParams: string;
  userId: string;
  clerkId?: string | null;
}

const UserTopPostsTab = async ({
  searchParams,
  userId,
  clerkId,
}: IUserTopPostsTab) => {
  const result = await getUserQuestions({
    id: userId,
    page: 1,
  });
  // console.log("TOP POSTS:", result);

  return (
    <>
      {result?.question.map((item) => (
        <QuestionsCard
          key={item._id}
          _id={item._id}
          title={item.title}
          content={item.content}
          tags={item.tags}
          views={item.views}
          upvotes={item.upvotes}
          author={item.author}
          answers={item.answers}
          createdAt={item.createdAt}
          clerkId={clerkId}
        />
      ))}
    </>
  );
};

export default UserTopPostsTab;
