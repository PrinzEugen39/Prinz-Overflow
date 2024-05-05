import QuestionsCard, { TQuestion } from "@/components/cards/QuestionsCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";

const TagDetails = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const result = await getQuestionsByTagId({
    id: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions.length > 0 ? (
          result.questions.map((question: TQuestion) => (
            <QuestionsCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              createdAt={question.createdAt}
              answers={question.answers}
            />
          ))
        ) : (
          <NoResult
            title="There's no question with this tag to show"
            description="You can add more tags by asking a question"
            link="/"
            linkTitle="Check out other questions or ask one"
          />
        )}
      </div>
    </>
  );
};

export default TagDetails;
