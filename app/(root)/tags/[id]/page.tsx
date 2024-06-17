import QuestionsCard, { TQuestion } from "@/components/cards/QuestionsCard";
import CustomPagination from "@/components/shared/CustomPagination";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const { questions, tagTitle, isNext, totalPages } = await getQuestionsByTagId(
    {
      id: params.id,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.search,
    }
  );

  // console.log(result);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col">
        {questions?.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {questions.map((question: TQuestion) => (
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
              ))}
            </div>
            <div className="mt-10 text-dark100_light900">
              <CustomPagination
                currentPage={searchParams.page ? +searchParams.page : 1}
                totalPages={totalPages}
                isNext={isNext}
              />
            </div>
          </>
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
