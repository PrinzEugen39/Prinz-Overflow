import QuestionsCard, { TQuestion } from "@/components/cards/QuestionsCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/filters";
// import { questions } from "@/constants/mocks";
import { getAllSavedQuestion } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();

  const result = await getAllSavedQuestion({
    id: clerkId!,
    searchQuery: searchParams.search,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.length > 0 ? (
          result.map((question: TQuestion) => (
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
            title="There's no saved questions to show"
            description="You can save questions by clicking on the star icon on a question."
            link="/"
            linkTitle="Check out other questions"
          />
        )}
      </div>
    </>
  );
}
