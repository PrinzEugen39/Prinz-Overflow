import CustomPagination from "@/components/shared/CustomPagination";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

export default async function Tags({ searchParams }: SearchParamsProps) {
  const { tags, isNext, totalPages } = await getAllTags({
    searchQuery: searchParams.search,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex flex-col min-h-full">
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-col flex-1 justify-between">
        {tags.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4">
              {tags?.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/tags/${tag._id}`}
                  className="shadow-light100_darknone active:scale-[.98] transition ease-in-out"
                >
                  <article className="background-light900_dark200 light-border border px-8 py-10 flex w-full flex-col rounded-2xl sm:w-[200px]">
                    <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                      <p className="paragraph-semibold text-dark300_light900">
                        {tag.name}
                      </p>
                    </div>

                    <p className="small-medium text-dark400_light500 mt-3.5">
                      <span className="body-semibold primary-text-gradient mr-2.5">
                        {tag.questions.length}+
                      </span>{" "}
                      Questions
                    </p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-dark100_light900">
              <CustomPagination
                currentPage={searchParams?.page ? +searchParams.page : 1}
                isNext={isNext}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : (
          <NoResult
            title="No tags Found"
            description="it looks like there are no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </div>
  );
}
