"use client";
import QuestionsCard, { TQuestion } from "@/components/cards/QuestionsCard";
import CustomPagination from "@/components/shared/CustomPagination";
import Loader2 from "@/components/shared/Loader2";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const QuestionList = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";

  const { data: result, isLoading } = useQuery({
    queryKey: ["home", +page, search, filter],
    queryFn: async () => {
      const data = await getQuestions({
        searchQuery: search || "",
        filter: filter || "",
        page: page ? +page : 1,
      });

      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex w-full flex-col gap-6 flex-1 justify-center items-center">
        <Loader2 />
      </div>
    );

  return (
    <div className="mt-10 flex w-full flex-col gap-6 flex-1 justify-between">
      {result?.questions?.length > 0 ? (
        <>
          <div className="flex flex-col gap-6">
            {result?.questions?.map((question: TQuestion) => (
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
          <div className="text-dark100_light900">
            <CustomPagination
              currentPage={+page}
              isNext={result?.isNext}
              totalPages={result?.totalPages || 0}
            />
          </div>
        </>
      ) : (
        <NoResult
          title="There's no question to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. Our query could be the next big thing others learn from. Get
      involved ⭐"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      )}
    </div>
  );
};

export default QuestionList;
