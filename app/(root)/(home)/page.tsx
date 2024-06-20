import { getQuestions } from "@/lib/actions/question.action";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import QuestionList from "./QuestionList";
import { HomePageFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["home", 1, "", ""],
    queryFn: () => getQuestions({}),
  });
  // Fetch Recommended Questions

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col min-h-full">
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">All Questions</h1>

          <Link
            href={"/ask-question"}
            className="flex justify-end max-sm:w-full"
          >
            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 active:scale-[0.98] transition ease-in-out">
              Ask a question
            </Button>
          </Link>
        </div>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions"
            otherClasses="flex-1"
          />
          <Filter
            filters={HomePageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            constainerClasses="flex"
          />
        </div>

        {/* This component only shows on above md breakpoint */}
        {/* <ExpandedHomeFilters /> */}
        <QuestionList />
      </div>
    </HydrationBoundary>
  );
}
