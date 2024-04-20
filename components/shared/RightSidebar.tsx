import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";
import { hotQuestions, popularTags } from "@/constants/mocks";



export default function RightSidebar() {
  return (
    <div className="background-light900_dark200 light-border sticky top-0 right-0 flex flex-col h-screen overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      </div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => (
          <Link
            href={`/questions/${question.id}`}
            key={question.id}
            className="flex cursor-pointer items-center justify-between gap-5 "
          >
            <p className="body-medium text-dark500_light700">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="arrow-right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTags
              key={tag.id}
              tagName={tag.name}
              totalQuestion={tag.totalQuestion}
              id={tag.id}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
}
